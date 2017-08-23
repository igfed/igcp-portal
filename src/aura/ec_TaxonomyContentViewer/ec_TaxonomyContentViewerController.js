({
    doInit: function(component, event, helper) {
        // see helper.scriptLoad() below
    },

    scriptLoad: function(component, event, helper) {
        var spinner = component.find('loadingSpinner');
        $A.util.removeClass(spinner, 'hidden');

        var originId = component.get('v.originId');
        if (!originId) {
            var layout = $o.urlParameter('layout');
            if (layout && !component.get('v.alwaysUseLocalLayout')) {
                component.set('v.contentLayout', layout);
            }
            var siteName = $o.urlParameter('sname');
            if (siteName) {
                component.set('v.siteName', siteName);
            }
            
            originId = $o.urlParameter('id');
            component.set('v.originId', originId);
        }
        var langCode = $A.get('$Locale.language');
        if (langCode == 'en') {
            langCode = 'en_US';
        }

        if (originId) {
            // the only scope variable inherited by this function is originId (I think)
            // function getContentSuccessHandler (response) {
            var getContentSuccessHandler = function (response) {
                var response = JSON.parse(response),
                    siteData = response.siteData,
                    hostSiteData = response.hostSiteData,
                    rendering = response.renderings,
                    communityUrl = hostSiteData.siteUrl,
                    sitePrefix = siteData.prefix,
                    siteId = siteData.siteId,
                    hostSitePrefix = hostSiteData.prefix,
                    container = component.find('contentContainer').getElement(),
                    view = component.find('contentViewer').getElement();

                component.set('v.siteId', siteId);

                // fix media urls so that they work in both Builder and community
                rendering = $o.fixSitePrefix(rendering, communityUrl, sitePrefix, hostSitePrefix, component.get('v.SLDSPath'));
                rendering = $o.extractIframes(rendering);

                var el = document.createElement('div');
                el.classList.add('contentViewerWrapper');
                el.innerHTML = rendering;

                view.appendChild(el);

                // move the subscription editor component into the correct container returned in the content template
                var buttonToRepositionFrom = container.getElementsByClassName('subscriptionButton')[0];
                var buttonToRepositionTo = container.getElementsByClassName('subscribeButton')[0];
                if (buttonToRepositionFrom && buttonToRepositionTo) {
                    buttonToRepositionTo.appendChild(buttonToRepositionFrom);
                }

                $o.createIframes(view);

                // the following code assumes one outer container that includes data attributes with data information
                var domRendering = view.firstChild.firstChild;

                if (domRendering) {
                    var metadata = domRendering.dataset;
                    /*
                         data-id                <== cliId
                         data-versionorigin     <== versionOriginId
                         data-content           <== content.Id
                         data-publisheddate     <== originalPublishedStartDateAsString  (milliseconds value as string)
                         data-pubstartdate      <== publishedStartDateAsString          (milliseconds value as string)
                    */
                    metadata.currentTimeStamp = new Date().getTime();
                    // generally, displayedDate will be the originalPublishedDate,
                    // but if the original published date is in the future, we use the current version date
                    metadata.displayedDate = (metadata.publisheddate > metadata.currentTimestamp) ? metadata.pubstartdate : metadata.publisheddate;

                    // "readable time" container; e.g. 22 Days ago
                    helper.setTimeSincePublished(component, event, helper, domRendering.getElementsByClassName('timeSincePublished'), metadata);

                    // used by news-item detail layouts, e.g. “(Published Feb-07)”, using a custom label
                    helper.setFormattedPublishDate(component, event, helper, domRendering.getElementsByClassName('formattedPublishDate'), metadata);

                    helper.installClickForBackButton(component, event, helper, domRendering.getElementsByClassName('backButton'));
                    helper.installClickForLikeButton(component, event, helper, domRendering.getElementsByClassName('likeButton'));

                    helper.applyLikeCounts(component, helper);
                }
                $A.util.addClass(spinner, 'hidden');
            };    // getContentSuccessHandler

            $o.callServer(component, "c.getContent", getContentSuccessHandler, {
                originId: originId,
                contentLayouts: component.get("v.contentLayout"),
                isTargeted: !component.get("v.ignoreTargets"),
                siteName: component.get('v.siteName'),
                langCode: langCode
            });
        } else {
            $A.util.addClass(spinner, 'hidden');
        }
    },


    toggleDetail: function(component, event, helper) {
        var originId = component.get('v.originId');
        var appEvent = $A.get('e.c:ec_TaxonomyToggleDetailEvt');
        appEvent.setParams({"originId": originId});
        appEvent.fire();
    },


    likeContent: function(component, event, helper) {
        var id = component.get('v.likedContent'),
            likedContentList = component.get('v.likedContentList'),
            langCode = $A.get('$Locale.language'),
            action = 'setLikeContent';
        if (langCode === 'en') {
            langCode = 'en_US';
        }

        if (id) {
            if (likedContentList.indexOf(id) !== -1) {
                action = 'setUnlikeContent'
            }
            helper.callServer(component, 'c.' + action, function (json) {
                console.log(json);
                var response = JSON.parse(json);
                if (response.success) {
                    var originId = response.id,
                        button = document.querySelectorAll('.likeButton[data-versionorigin="' + originId + '"]')[0],
                        text = button.querySelector('.slds-assistive-text'),
                        counts = component.get('v.likeCounts'),
                        countEl = button.getElementsByClassName('likeCount')[0],
                        countVal = counts[originId];

                    if (response.message === 'Liked') {
                        button.classList.add('slds-is-selected');
                        text.innerText = $A.get('$Label.c.ec_TaxonomyLoader_Unlike');
                        countVal++;
                        likedContentList.push(originId);
                    } else {
                        button.classList.remove('slds-is-selected');
                        text.innerText = $A.get('$Label.c.ec_TaxonomyLoader_Like');
                        if (countVal > 1) {
                            countVal--;
                        } else {
                            countVal = 0;
                        }
                        var index = likedContentList.indexOf(originId);
                        if (index !== -1) {
                            likedContentList.splice(index, 1);
                        }
                    }
                    countEl.innerHTML = countVal + '';
                    counts[originId] = countVal;
                    component.set('v.likedContentList', likedContentList);
                    component.set('v.likeCounts', counts);

                    var likeUnlikeEvt = $A.get('e.c:ec_LikeUnlikeContentEvt');
                    likeUnlikeEvt.setParams({
                        'id': originId,
                        'message':  response.message
                    }).fire();
                } else {

                }
            }, {
                originId: id,
                siteName: component.get('v.siteName'),
                langCode: langCode
            });
            component.set('v.likedContent', null);
        }
    }
})