({
    getContentsByTaxonomySuccessHandler: function(component, event, helper, response) {

        // TODO - find a more global place to include this type of exception
        function InsufficientLinkData(sMessage) {
            this.name = "InsufficientLinkData";
            this.message = sMessage;
            this.stack = (new Error()).stack;
        }
        InsufficientLinkData.prototype = Object.create(Error.prototype);
        InsufficientLinkData.prototype.constructor = InsufficientLinkData;

        response = JSON.parse(response);
        console.info('•• TaxonomyLoader:successHandler', response);

        var siteData = response.siteData,
            hostSiteData = response.hostSiteData,
            renderings = response.renderings,
            communityUrl = hostSiteData.siteUrl,
            sitePrefix = siteData.prefix,
            siteId = siteData.siteId,
            hostSitePrefix = hostSiteData.prefix,
            lastReadNewsTime = response.lastRead,
            loadMore = response.loadMore,
            currentTimestamp = new Date().getTime();

        component.set('v.siteId', siteId);

        if (response.doOnboarding) {
            helper.showOnboarding(component, event, helper);
        } else {
            component.set('v.numResults', renderings.length);

            for (var i = 0; i < renderings.length; i++) {
                renderings[i] = $o.fixSitePrefix(renderings[i], communityUrl, sitePrefix, hostSitePrefix, component.get('v.SLDSPath'));

                // Identify and extract iframes (usually embedded videos)
                renderings[i] = $o.extractIframes(renderings[i]);
            }

            var container = component.find('taxLoaderContentItems').getElement(),
                nColumns = parseInt(component.get('v.columnCount').slice(0, 1));    // nColumns becomes an integer 1…6

            // each renderings[] is the markup for the content item
            var wrapper = document.createElement('body'),   // add all renderings as child elements to intermediary wrapper (not in the DOM yet)
                fragments = document.createDocumentFragment(),   // starts out empty, will accumulate each rendering item one at a time
                item;

            wrapper.innerHTML = renderings.join('');        // all renderings are now in DOM nodes, but they're not in the document

            // Properly re-inject iframes so they render
            $o.createIframes(wrapper);

            var hideContentTags = !component.get('v.displayCategoryTags');
            // modify the classList and move each rendering to the bottom of fragments
            while (item = wrapper.firstChild) { /* NOTE: assignment statement, not an equality test */
                // for a layout columnCount > 1…
                //      - we need to tell div.taxLoaderContentItems enclosing container that it is now an slds wrapping grid (done outside this while loop)
                //      - we need to modify each rendering to let it know it is a column element
                if (nColumns > 1) {
                    /* IE 11 does not support multiple parameters for classList.add() and classList.remove() */
                    item.classList.add('slds-size--1-of-1');
                    item.classList.add('slds-large-size--1-of-' + nColumns);
                    item.classList.add('slds-p-around--x-small');
                }

                // remove all tags (if specified from the component)
                // or remove tags that do not match the specified taxonomy
                if (hideContentTags) {
                    var contentTags = item.getElementsByClassName('contentTags');
                    if (contentTags.length) {
                        contentTags[0].parentNode.removeChild(contentTags[0]); // IE doesn't support .remove()
                    }
                } else {
                    var tagBadges = Array.prototype.slice.call(item.getElementsByClassName('tagPathBadge')),
                        configuredPath = component.get('v.tagPaths');
                    tagBadges.forEach(function(badge) {
                        var tagPath = badge.dataset.tagpath;
                        if (tagPath.indexOf(configuredPath) !== 0) { // tag path does not start with configured path
                            badge.parentNode.removeChild(badge); // IE doesn't support .remove()
                        }
                    });
                }

                fragments.appendChild(item);
            }

            // wrapper element should now be empty
            if (nColumns > 1) {
                /* IE 11 does not support multiple parameters for classList.add() and classList.remove() */
                container.classList.add(['two', 'three', 'four', 'five', 'six'][nColumns - 2] + 'Column');
                container.classList.add('slds-grid');
                container.classList.add('slds-wrap');
                container.classList.add('slds-grid--vertical-stretch');
                container.classList.add('slds-grid--pull-padded');
            }
            console.log('About to empty loader and add ' + fragments.childNodes.length + ' to loader’s container');
            $o.empty(container).appendChild(fragments);

           var badges = container.getElementsByClassName('slds-badge');


            for (var i = 0; i < badges.length; i++) {
                badges[i].addEventListener('click', function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    var tagpathAttr = evt.currentTarget.dataset.tagpath;
                    if (component.get('v.tagOnNewPage')) {
                        var tagArea = evt.currentTarget.dataset.tagarea;
                        $o.navigateToURL(tagArea, {
                            'tagpath': tagpathAttr,
                            'sname': component.get('v.siteName')
                        }, true);
                    } else {
                        component.set('v.internalTagPathChange', true);
                        component.set("v.tagPaths", tagpathAttr);
                    }
                });
            }

            var likeButtons = container.getElementsByClassName('likeButton');
            for (var i = 0; i < likeButtons.length; i++) {
                likeButtons[i].addEventListener('click', function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    var originId = evt.currentTarget.dataset.versionorigin;
                    component.set('v.likedContent', originId);
                });
            }

            var items = container.children,     // getElementsByClassName('news-item-summary'),     data-container? better class name?
                rightNow = new Date();

            console.log('loading ' + items.length + ' items…');

            for (var i = 0; i < items.length; i++) {
                var originalPublishedDate = parseInt(items[i].dataset.publisheddate),
                    versionPublishedDate = parseInt(items[i].dataset.pubstartdate),
                    displayedDate = (originalPublishedDate > rightNow.getTime()) ? versionPublishedDate : originalPublishedDate;

                // if we recognize this news item as new, we append an additional div within the anchor element
                //      div.slds-media__figure...
                //      div.slds-media__body
                //      div.slds-badge.new-item-badge
                // and we add the class 'new-item' to the summary item itself
                if (displayedDate > lastReadNewsTime && component.get('v.displayNewStatus')) {
                    items[i].classList.add('new-item');
                    var newBadge = document.createElement('div');
                    /* IE 11 does not support multiple parameters for classList.add() and classList.remove() */
                    newBadge.classList.add('slds-badge');
                    newBadge.classList.add('new-item-badge');
                    newBadge.textContent = $A.get("$Label.c.ec_TaxonomyLoader_New");
                    items[i].appendChild(newBadge);
                }

                var readableTimeEl = items[i].getElementsByClassName('timeSincePublished');
                if (readableTimeEl.length) {
                    readableTimeEl[0].textContent = helper.getTimeSincePublished(displayedDate, currentTimestamp);
                }
            }

            var anchors = container.getElementsByTagName('a');
            for (var i = 0; i < anchors.length; i++) {
                // if the global option to use an item's detail page is set, and the item has a detail page, use it
                // otherwise load the content view component inline
                anchors[i].addEventListener('click', function (evt) {
                    evt.preventDefault();
                    var thisHref = evt.currentTarget.getAttribute('href'),
                        dataContainer = $o.closestMatchingParent(evt.currentTarget, '.data-container');

                    try {
                        if (dataContainer) {
                            var metadata = dataContainer.dataset;

                            if (!component.get('v.detailOnNewPage') || !thisHref) {
                                var detailLayout = metadata.detailtemplate,
                                    contentId = metadata.versionorigin;

                                if (detailLayout && contentId) {
                                    component.set('v.detailLayout', detailLayout);
                                    component.set('v.originId', contentId);     // order matters: things happen when this changes!
                                } else {
                                    throw new InsufficientLinkData('Missing content id or detail layout');
                                }
                            } else {
                                var params = {};
                                if (evt.currentTarget.classList.contains('ocms-title-taxonomy-detail-link')) {
                                    if (metadata.versionorigin && metadata.detailtemplate) {
                                        params['id'] = metadata.versionorigin;
                                        params['layout'] = metadata.detailtemplate;
                                        params['sname'] = component.get('v.siteName');      // often empty, and that’s okay
                                        //... potentially more data?
                                    } else {
                                        throw new InsufficientLinkData('Missing metadata for taxonomy detail link');
                                    }
                                }
                                $o.navigateToURL(thisHref, params, true);
                            }
                        } else {
                            $o.navigateToURL(thisHref, {});
                        }
                    } catch(ex) {
                        if (ex instanceof InsufficientLinkData) {
                            console.error('Insufficient link metadata provided. ' + ex.message);

                            if (thisHref) {
                                console.warn('Attempting navigation to ' + thisHref);
                                $o.navigateToURL(thisHref, {});
                            } else {
                                console.error('No href provided.');
                            }
                        } else {
                            console.error(ex);
                            throw ex;
                        }
                    }
                });
            }

            var loadMoreButton = component.find('loadMoreButton');
            if (loadMore && component.get('v.showLoadMore')) {
                $A.util.removeClass(loadMoreButton, 'hidden');
            } else {
                $A.util.addClass(loadMoreButton, 'hidden');
            }

            helper.getLikeCounts(component, helper);

            var spinner = component.find('loadingSpinner');
            $A.util.addClass(spinner, 'hidden');
        }
    },  // getContentsByTaxonomySuccessHandler


    setupComponent: function(component, event, helper, showLoadingIndicator, setNewsRead) {
        var setLastRead = false;
        if (setNewsRead) {
            setLastRead = component.get('v.displayNewStatus');
        }

        if (showLoadingIndicator) {
            var spinner = component.find('loadingSpinner');
            $A.util.removeClass(spinner, 'hidden');
        }

        $o.callServer(component, "c.getContentsByTaxonomy", helper.getContentsByTaxonomySuccessHandler.bind(this, component, event, helper), {
            siteName: component.get("v.siteName"),
            tagPaths: component.get("v.tagPaths"),
            contentTypes: component.get("v.contentType"),
            contentLayouts: component.get("v.layoutsForTaxonomy"),
            order: component.get("v.apiOrder"),
            isTargeted: !component.get("v.ignoreTargets"),
            limitCount: component.get("v.limitCount"),
            depth: component.get('v.depth'),
            isMyNews: setLastRead,
            langLocale: $A.get("$Locale.langLocale"),
            loadSubscriptions: component.get("v.loadSubscriptions")
        });

        var pollTime = component.get('v.pollTime');
        if (pollTime > 0) {
            var timer = component.get('v.pollTimer');
            clearTimeout(timer);
            timer = setTimeout($A.getCallback(function () {
                if (component.isValid()) {
                    console.log("• poll for new taxonomy items.");
                    helper.setupComponent(component, event, helper, false, false);
                }
            }),
            pollTime * 60000);       // minutes to milliseconds

            component.set('v.pollTimer', timer);
        }
    },  // setupComponent


    showDetail: function(component, event, helper) {
        $A.createComponent(
            "c:ec_TaxonomyContentViewer",
            {
                "originId": component.get('v.originId'),
                "contentLayout": component.get('v.detailLayout'),
                "loadedByTaxLoader": true,
                "siteName": component.get('v.siteName')
            },
            function (newCmp, status, errorMessage) {
                if (status === "SUCCESS") {
                    component.set("v.detailRendering", newCmp);
                } else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.");
                } else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },  // showDetail


    showOnboarding: function(component, event, helper) {
        $A.createComponent(
            'c:ec_SubscriptionEditor',
            {
                'siteName': component.get('v.siteName'),
                'tagPaths': component.get('v.tagPaths'),
                'editMode': true,
                'cancelButtonIsSkip': true,
                'loadedAsOnboarding': true
            },
            function (newCmp, status, errorMessage) {
                if (status === "SUCCESS") {
                    component.set("v.onboarding", newCmp);

                    var container = component.find('onboarding'),
                        spinner = component.find('loadingSpinner');
                    $A.util.removeClass(container, 'hidden');
                    $A.util.addClass(spinner, 'hidden');
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.");
                    // Show offline error
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                    // Show error message
                }
            }
        );
    },


    getLikeCounts: function(component, helper) {
        var likeCounts = component.get('v.likeCounts');
        var likedContentList = component.get('v.likedContentList');
        var unknownCounts = [];
        var container = component.find('taxLoaderContentItems').getElement();
        var langCode = $A.get('$Locale.language');
        if (langCode == 'en') {
            langCode = 'en_US';
        }

        var articles = container.getElementsByClassName('news-item-summary');
        for (var i = 0; i < articles.length; i++) {
            var originId = articles[i].dataset.versionorigin;

            if (likeCounts[originId] == null) {
                // we don't know about this content yet, add it to a list and hold for later
                unknownCounts.push(originId);
            } else {
                // we know about this content. update it's count
                var button = articles[i].getElementsByClassName('likeButton');
                var counter = articles[i].getElementsByClassName('likeCount');
                if (button.length) {
                    if (counter.length) {
                        counter[0].innerHTML = likeCounts[originId] + '';
                    }
                    /*
                     *  IE 11 doens't support .includes on arrays;
                     * */
                    var included;
                    if (Array.prototype.includes){
                        included = likedContentList.includes(originId);
                    } else {
                        included = $o.arrayIncludes(likedContentList, originId);
                    }
                    /* end polyfill for IE .includes. */
                    // if (likedContentList.includes(originId)) {
                    if (included) {
                        button[0].classList.add('slds-is-selected');
                        button[0].title = $A.get('$Label.c.ec_TaxonomyLoader_Unlike');
                        button[0].querySelector('.slds-assistive-text').innerText = $A.get('$Label.c.ec_TaxonomyLoader_Unlike');
                    } else {
                        button[0].title = $A.get('$Label.c.ec_TaxonomyLoader_Like');
                        button[0].querySelector('.slds-assistive-text').innerText = $A.get('$Label.c.ec_TaxonomyLoader_Like');
                    }
                }
            }
        }

        if (unknownCounts.length) {
            $o.callServer(component, "c.getBulkLikeCounts", function(json) {
                console.log(json);
                var response = JSON.parse(json),
                    likeCounts = component.get('v.likeCounts'),
                    likedContentList = component.get('v.likedContentList'),
                    container = component.find('taxLoaderContentItems').getElement();

                for (var item in response.socialData) {
                    likeCounts[item] = response.socialData[item].likes;

                    var button = container.querySelectorAll('.likeButton[data-versionorigin="' + item + '"]');
                    if (button.length) {
                        var el = button[0].getElementsByClassName('likeCount')[0];
                        el.innerHTML = likeCounts[item] + '';

                        var activity = response.socialData[item].socialActivity,
                            likedByMe = false;
                        if (activity) {
                            likedByMe = activity.likedByMe;
                        }

                        if (likedByMe) {
                            button[0].classList.add('slds-is-selected');
                            button[0].title = $A.get('$Label.c.ec_TaxonomyLoader_Unlike');
                            button[0].querySelector('.slds-assistive-text').innerText = $A.get('$Label.c.ec_TaxonomyLoader_Unlike');
                            likedContentList.push(item);
                        } else {
                            button[0].title = $A.get('$Label.c.ec_TaxonomyLoader_Like');
                            button[0].querySelector('.slds-assistive-text').innerText = $A.get('$Label.c.ec_TaxonomyLoader_Like');
                        }
                    }
                }

                component.set('v.likeCounts', likeCounts);
                component.set('v.likedContentList', likedContentList);
            }, {
                originIds: unknownCounts,
                siteName: component.get('v.siteName'),
                langCode: langCode
            });
        }
    }, // getLikeCounts


    updateLikeCount: function(component, originId, message) {
        var container = component.find('contentContainer').getElement();
        var likedContentList = component.get('v.likedContentList');
        var button = container.querySelectorAll('.likeButton[data-versionorigin="' + originId + '"]');
        var text = container.querySelectorAll('.likeButton[data-versionorigin="' + originId + '"] .slds-assistive-text');
        var counts = component.get('v.likeCounts');
        var countEl = container.querySelectorAll('.likeButton[data-versionorigin="' + originId + '"] .likeCount');
        var countVal = counts[originId];

        if (message === 'Liked') {
            countVal++;
            for (var i = 0; i < button.length; i++) {
                button[i].classList.add('slds-is-selected');
                button[i].title = $A.get('$Label.c.ec_TaxonomyLoader_Unlike');
                text[i].innerText = $A.get('$Label.c.ec_TaxonomyLoader_Unlike');
                countEl[i].innerHTML = countVal + '';
            }
            likedContentList.push(originId);
        } else {
            if (countVal > 1) {
                countVal--;
            } else {
                countVal = 0;
            }
            for (var i = 0; i < button.length; i++) {
                button[i].classList.remove('slds-is-selected');
                button[i].title = $A.get('$Label.c.ec_TaxonomyLoader_Like');
                text[i].innerText = $A.get('$Label.c.ec_TaxonomyLoader_Like');
                countEl[i].innerHTML = countVal + '';
            }
            var index = likedContentList.indexOf(originId);
            if (index !== -1) {
                likedContentList.splice(index, 1);
            }
        }
        component.set('v.likedContentList', likedContentList);
        counts[originId] = countVal;
        component.set('v.likeCounts', counts);
    },


    getTimeSincePublished: function(itemTimestamp, currentTimestamp) {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = currentTimestamp - itemTimestamp;

        var output = '';
        var t;
        if (elapsed < msPerMinute) {
            t = Math.round(elapsed/1000);
            if (t==1) {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Second_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Second_Ago").supplant([t]);
            } else {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Seconds_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Seconds_Ago").supplant([t]);
            }
        } else if (elapsed < msPerHour) {
            t = Math.round(elapsed/msPerMinute);
            if (t==1) {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Minute_ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Minute_ago").supplant([t]);
            } else {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Minutes_ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Minutes_ago").supplant([t]);
            }
        } else if (elapsed < msPerDay ) {
            t = Math.round(elapsed/msPerHour );
            if (t==1) {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Hour_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Hour_Ago").supplant([t]);
            } else {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Hours_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Hours_Ago").supplant([t]);
            }
        } else if (elapsed < msPerMonth) {
            t = Math.round(elapsed/msPerDay);
            if (t==1) {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Day_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Day_Ago").supplant([t]);
            } else {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Days_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Days_Ago").supplant([t]);
            }
        } else if (elapsed < msPerYear) {
            t = Math.round(elapsed/msPerMonth);
            if (t==1) {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Month_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Month_Ago").supplant([t]);
            } else {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Months_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Months_Ago").supplant([t]);
            }
        } else {
            t = Math.round(elapsed/msPerYear);
            if (t==1) {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Year_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Year_Ago").supplant([t]);
            } else {
                output = $o.supplant($A.get("$Label.c.ec_TaxonomyLoader_Years_Ago"), [t]);
                //output = $A.get("$Label.c.ec_TaxonomyLoader_Years_Ago").supplant([t]);
            }
        }

        return output;
    } // getTimeSincePublished
})