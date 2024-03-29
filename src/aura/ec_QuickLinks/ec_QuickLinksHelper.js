({
    doInit: function(component, event, helper) {
        var taxonomyPath = component.get('v.taxonomyPath'),
            contentType = 'Quick Link',
            contentLayout = 'LinkItem',
            langCode = $A.get('$Locale.language');

        if (langCode === 'en') {
            langCode = 'en_US';
        }

        if (!$A.util.isEmpty(taxonomyPath)) {
            helper.callServer(component, 'c.renderForLtng', function(response) {
                var responseObj = JSON.parse(response),
                    markup = responseObj.markup,
                    siteData = responseObj.siteData,
                    communityUrl = siteData.siteUrl,
                    sitePrefix = siteData.prefix;

                markup = helper.fixSitePrefix(markup, communityUrl, sitePrefix, sitePrefix, component.get('v.SLDSPath'));

                var el = document.createElement('div');
                el.innerHTML = markup;

                // sort sections alphabetically
                var sections = Array.prototype.slice.call(el.getElementsByClassName('taxonomyMenuSection'));
                sections.sort(function(a, b) {
                    var aVal = a.getElementsByTagName('h2')[0].innerHTML.toLowerCase(),
                        bVal = b.getElementsByTagName('h2')[0].innerHTML.toLowerCase();

                    if (aVal > bVal) return 1;
                    if (aVal < bVal) return -1;
                    return 0;
                });
                sections.forEach(function(section) {
                    section.parentNode.appendChild(section);
                });

                // sort link items alphabetically within their sections
                var uls = Array.prototype.slice.call(el.getElementsByTagName('ul'));
                uls.forEach(function(ul) {
                    var children = Array.prototype.slice.call(ul.children);
                    children.sort(helper.sortAnchors);

                    children.forEach(function(li) {
                        ul.appendChild(li);
                    });
                });

                // provide special lightning-friendly navigation for links within this taxonomy-based menu structure
                var anchors = el.getElementsByTagName('a');
                for (var i = 0; i < anchors.length; i++) {
                    anchors[i].addEventListener('click', function(evt) {
                        evt.preventDefault();

                        var thisHref = evt.currentTarget.getAttribute('href');
                        helper.navigateToURL(thisHref, {}, true);

                        // The following is required to close the Quick Links menu when a link is clicked.
                        var tabHead = document.getElementById('tab-head');
                        $A.util.toggleClass(tabHead, 'active');
                        component.set('v.quickLinksEnabled', false);
                    });
                }

                var container = component.find('quickLinks_c').getElement();
                var quickLinkToggle = container.getElementsByClassName('quickLinkToggle')[0];
                container.appendChild(el.children[0]);
                container.appendChild(el.children[0]);

                var buttons = document.getElementsByClassName('tab-head-item'),
                    tabs = document.getElementsByClassName('tab-content-item');

                $A.util.addClass(buttons[0], 'active');
                $A.util.addClass(tabs[0], 'active');

                quickLinkToggle.addEventListener('click', function(evt) {
                    evt.stopPropagation();
                    var tabHead = document.getElementById('tab-head');
                    $A.util.toggleClass(tabHead, 'active');
                    var quickLinksEnabled = component.get('v.quickLinksEnabled');
                    component.set('v.quickLinksEnabled', !quickLinksEnabled);
                });

                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].addEventListener('click', helper.clickTab);
                }

                document.getElementsByClassName('tab-head')[0].insertBefore(quickLinkToggle, buttons[0]);
                $A.util.removeClass(quickLinkToggle, 'hidden');
            }, {
                taxonomyPath: taxonomyPath,
                contentType: contentType,
                contentLayout: contentLayout,
                langCode: langCode,
                loadSubscriptions: component.get('v.loadSubscriptions')
            });
        } else {
            // done messed up
            console.error('Empty tag path');
        }
    },

    callServer : function(component,method,callback,params,cacheable) {
        var action = component.get(method);
        if (params) {
            action.setParams(params);
        }
        if (cacheable) {
            action.setStorable();
        }
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") { 
                // pass returned value to callback function
                callback.call(this,response.getReturnValue());   
            } else if (state === "ERROR") {
                // generic error handler
                var errors = response.getError();
                if (errors) {
                    $A.log("Errors", errors);
                    if (errors[0] && errors[0].message) {
                        throw new Error("Error" + errors[0].message);
                    }
                } else {
                    throw new Error("Unknown Error");
                }
            }
        });
    
        $A.enqueueAction(action);
    },
    clickTab : function(evt) {
        evt.stopPropagation();
        var tabId = evt.target.getAttribute('data-tabname');
        var tab = document.getElementById(tabId);
        var buttons = document.getElementsByClassName('tab-head-item');
        var tabs = document.getElementsByClassName('tab-content-item');

        for (var i = 0; i < buttons.length; i++) {
            $A.util.removeClass(buttons[i], 'active');
            $A.util.removeClass(tabs[i], 'active');
        }
        $A.util.addClass(evt.target, 'active');
        $A.util.addClass(tab, 'active');
    },



    // DUPLICATED FROM common.js
    // workaround for bug where duplicate script includes from theme and theme's child components result in nondescript exceptions
    fixSitePrefix: function(rendering, communityUrl, prefix, hostPrefix, SLDSPath) {
        // TODO DUPLICATED in the following components! Make sure to propagate all changes!
        //    - ec_QuickLinks
        //    - ec_MyBusinessUnitLink
        //    - ec_MyBusinessLocationLink
        //    - ec_Notifications
        // extract "resource prefix" from SLDSPath
        // will fix svg icons in Builder since they will no longer be cross-origin.
        var resourcePrefix = [];
        if (SLDSPath) {
            var fragments = SLDSPath.split('/');
            for (var i = 0; i < fragments.length; i++) {
                if (fragments[i] == 'resource') {
                    break;
                }
                resourcePrefix.push(fragments[i]);
            }
            resourcePrefix = resourcePrefix.join('/');
        } else {
            // fall back to the community url as default - SLDSPath wasn't provided (and svgs won't work in builder!)
            resourcePrefix = communityUrl;
        }

        var regex;

        // prefix = ec; hostprefix = exc
        // strip out duplicate prefixes; eg /(ec|exc)/s/(ec|exc)/s/ => /ec/s/
        regex = new RegExp('/(' + prefix + '|' + hostPrefix + ')/s/(' + prefix + '|' + hostPrefix + ')/s/', 'g');
        rendering = rendering.replace(regex, '/' + hostPrefix + '/s/');

        // change hostprefix to site prefix (but only if it isn't a fully qualified url; eg, OrchestraCMS has inserted the prefix into a resource or servlet url)
        if (prefix != hostPrefix) {

            regex = new RegExp('/' + prefix + '/s', 'g');

            if (!hostPrefix) {
                rendering = rendering.replace(regex, '/s');
            } else {
                rendering = rendering.replace(regex, '/' + hostPrefix + '/s');
            }

        }

        // replace servlet media paths with fully qualified url
        // cover potential cases of /ec/s/servlet..., /ec/servlet..., /servlet...
        if (rendering.indexOf('/' + prefix + '/s/servlet/servlet.FileDownload') !== -1 ||
            rendering.indexOf('/' + hostPrefix + '/s/servlet/servlet.FileDownload') !== -1) {
            regex = new RegExp('("|\\()/(' + prefix + '|' + hostPrefix + ')/s/servlet/servlet.FileDownload', 'g');
            rendering = rendering.replace(regex, '$1' + communityUrl + '/servlet/servlet.FileDownload');
        }
        if (rendering.indexOf('/' + prefix + '/servlet/servlet.FileDownload') !== -1 ||
            rendering.indexOf('/' + hostPrefix + '/servlet/servlet.FileDownload') !== -1) {
            regex = new RegExp('("|\\()/(' + prefix + '|' + hostPrefix + ')/servlet/servlet.FileDownload', 'g');
            rendering = rendering.replace(regex, '$1' + communityUrl + '/servlet/servlet.FileDownload');
        }
        if (rendering.indexOf('/servlet/servlet.FileDownload') !== -1) {
            regex = new RegExp('("|\\()/servlet/servlet.FileDownload', 'g');
            rendering = rendering.replace(regex, '$1' + communityUrl + '/servlet/servlet.FileDownload');
        }
        if (rendering.indexOf('"/s/servlet/servlet.FileDownload') !== -1) {
            regex = new RegExp('"/s/servlet/servlet.FileDownload', 'g');
            rendering = rendering.replace(regex, '"' + communityUrl + '/servlet/servlet.FileDownload');
        }

        // replace static resource paths with fully qualified url
        // cover potential cases of /ec/s/resource..., /ec/resource..., /resource...
        // if (rendering.indexOf('"/' + prefix + '/s/resource/') !== -1) {
        //     regex = new RegExp('"/' + prefix + '/s/resource/', 'g');
        //     rendering = rendering.replace(regex, '"' + communityUrl + '/resource/');
        // }
        // if (rendering.indexOf('"/' + prefix + '/resource/') !== -1) {
        //     regex = new RegExp('"/' + prefix + '/resource/', 'g');
        //     rendering = rendering.replace(regex, '"' + communityUrl + '/resource/');
        // }
        // if (rendering.indexOf('"/resource/') !== -1) {
        //     regex = new RegExp('"/resource/', 'g');
        //     rendering = rendering.replace(regex, '"' + communityUrl + '/resource/');
        // }

        if (rendering.indexOf('/' + prefix + '/s/resource/') !== -1 ||
            rendering.indexOf('/' + hostPrefix + '/s/resource/') !== -1) {
            regex = new RegExp('("|\\()/(' + prefix + '|' + hostPrefix + ')/s/resource/([0-9]+)/(.+?)/', 'g');
            rendering = rendering.replace(regex, '$1' + resourcePrefix + '/resource/$3/$4/');
        }
        if (rendering.indexOf('/' + prefix + '/resource/') !== -1 ||
            rendering.indexOf('/' + hostPrefix + '/resource/') !== -1) {
            regex = new RegExp('("|\\()/(' + prefix + '|' + hostPrefix + ')/resource/([0-9]+)/(.+?)/', 'g');
            rendering = rendering.replace(regex, '$1' + resourcePrefix + '/resource/$3/$4/');
        }
        if (rendering.indexOf('/resource/') !== -1) {
            regex = new RegExp('("|\\()/resource/([0-9]+)/(.+?)/', 'g');
            //rendering = rendering.replace(regex, '$1' + resourcePrefix + '/resource/$3/$4/');
            rendering = rendering.replace(regex, '$1' + resourcePrefix + '/resource/$3/');
        }
        if (rendering.indexOf('/s/resource/') !== -1) {
            regex = new RegExp('("|\\()/s/resource/([0-9]+)/(.+?)/', 'g');
            rendering = rendering.replace(regex, '$1' + resourcePrefix + '/resource/$3/');
        }


        // an oddity with OrchestraCMS + lightning's navigateToURL
        // a page selector will save the fully qualified url, but the rendering you get back will
        // be absolute (eg. /ec/s/news-detail)
        // when this is passed to navigateToURL, it will assume you want to go to /ec/s/ec/s/news-detail
        // therefore, remove the site prefix from hrefs
        regex = new RegExp('href="/(' + prefix + '|' + hostPrefix + ')/s', 'g');
        rendering = rendering.replace(regex, 'href="');

        // but what about urls and url-like things in data attributes?
        // OrchestraCMS cache rewriting will add the siteprefix to url-like things, so we need to undo that
        // bound to cause issues somewhere down the line.
        regex = new RegExp('(data-[a-zA-Z0-9]+?=")\/' + hostPrefix + '\/s', 'g');
        rendering = rendering.replace(regex, '$1');

        // cross-community links MUST function on the host community. May result in 'invalid page' messages
        // but the alternative is popping open tabs taking the user to communities they may not be logged into
        // or have access to.
        if (prefix != hostPrefix) {
            regex = new RegExp(' href="' + communityUrl + '/s', 'g');
            rendering = rendering.replace(regex, ' href="');
        }

        //  something odd from the demo org
        // builder's getSiteData.siteUrl returns a livepreview url instead of the community url
        // look for livepreview and remove it.
        // also, since all our links are absolute, builder complains about cross-origin whenever you
        // attempt to click anything...
        if (window.location.href.indexOf('livepreview.') !== -1) {
            if (rendering.indexOf('livepreview.') !== -1) {
                regex = new RegExp('livepreview', 'g');
                rendering = rendering.replace(regex, '');
            }

            regex = new RegExp(' href="' + communityUrl + '/s', 'g');
            rendering = rendering.replace(regex, ' href="' + window.location.origin + '/' + hostPrefix + '/s');
            regex = new RegExp(' data-destination="' + communityUrl + '/s', 'g');
            rendering = rendering.replace(regex, ' data-destination="' + window.location.origin + '/' + hostPrefix + '/s');
        }

        return rendering;
    },
    sortAnchors: function(a, b) {
        var aVal = a.getElementsByTagName('a')[0].text.toLowerCase(),
            bVal = b.getElementsByTagName('a')[0].text.toLowerCase();

        if (aVal > bVal) return 1;
        if (aVal < bVal) return -1;
        return 0;
    },
    // DUPLICATED FROM common.js
    // workaround for bug where duplicate script includes from theme and theme's child components result in nondescript exceptions
    navigateToURL: function(url, params, storeUrlParams) {
        // TODO DUPLICATED in the following components! Make sure to propagate all changes!
        //    - ec_QuickLinks
        //    - ec_MyBusinessUnitLink
        //    - ec_MyBusinessLocationLink
        //    - ec_NotificationsHelper
        //    - ec_ClassStyledMenuItem
        //    - ec_ClassStyledMenuListItem
        //    - ec_ClassStyledMenuSubItemHelper
        //    - ec_FooterClassStyledMenuItem
        //    - ec_FooterClassStyledMenuListItem
        //    - ec_FooterClassStyledMenuSubItem

        var sessionStorageList = [
            'id',
            'tagpath',
            'layout',
            'sname',
            'previous'
        ];

        // clear our known params out of sessionStorage
        sessionStorageList.forEach(function(item) {
            sessionStorage.removeItem(item);
        });

        // store the current page url so we can form our own history; gets around the issue in builder where navigating
        // between pages does not generate browser history, and article detail back buttons do not work.
        sessionStorage['previous'] = window.location.href;

        // check url for potential parameters; add them to sessionStorage and remove them from the url.
        if (storeUrlParams && url.indexOf('?') !== -1) {
            var urlParams = url.split('?')[1].split('&');
            urlParams.forEach(function(item) {
                var k = item.split('=')[0];
                var v = item.split('=')[1];
                sessionStorage.setItem(k, v);
            });

            url = url.split('?')[0];
        }
        // add optional parameters into sessionStorage
        if (params) {
            for (var key in params) {
                sessionStorage.setItem(key, params[key]);
            }
        }


        var urlEvent = $A.get('e.force:navigateToURL');
        urlEvent.setParams({
            url: url,
            isredirect: false
        });
        urlEvent.fire();
    }
})