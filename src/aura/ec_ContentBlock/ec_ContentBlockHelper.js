({
    doInit : function(component) {
        var helper = this;
        var contentName = component.get('v.contentName');
        var contentLayout = component.get('v.contentLayout');
        var siteName = component.get('v.siteName');

        var langCode = $A.get('$Locale.language');
        if (langCode == 'en') {
            langCode = 'en_US';
        }
        
        if (!$A.util.isEmpty(contentName)) {
            var spinner = component.find('loadingSpinner');
            $A.util.removeClass(spinner, 'hidden');

            console.info('langCode ' + langCode);
            $o.callServer(component, 'c.renderForLtng', function(response) {
                var responseObj = JSON.parse(response);
                var markup = responseObj.markup;
                var siteData = responseObj.siteData;
                var hostSite = responseObj.hostSiteData;
                var communityUrl = hostSite.siteUrl;
                var sitePrefix = siteData.prefix;
                var hostSitePrefix = hostSite.prefix;

                markup = $o.fixSitePrefix(markup, communityUrl, sitePrefix, hostSitePrefix, component.get('v.SLDSPath'));

                var el = component.find('contentMarkup').getElement();
                el.innerHTML = markup;

                // check if loaded renderings need additional js support
                if (el.getElementsByClassName('sliderContainer').length > 0) {
                    helper.handleSlider(component);
                }
                
                var anchors = el.getElementsByTagName('a');
                for (var i = 0; i < anchors.length; i++) {
                    anchors[i].addEventListener('click', function(evt) {
                        evt.preventDefault();
                        
                        var thisHref = evt.currentTarget.getAttribute('href');
                        if (thisHref) {
                            $o.navigateToURL(thisHref, {sname: component.get('v.siteName')}, true);
                        }
                    });
                }

                var clickable = el.getElementsByClassName('clickable-container');
                for (var i = 0; i < clickable.length; i++) {
                    clickable[i].addEventListener('click', function(evt) {
                        evt.preventDefault();

                        var thisHref = evt.currentTarget.dataset.destination;
                        if (thisHref) {
                            $o.navigateToURL(thisHref, {sname: component.get('v.siteName')}, true);
                        }
                    })
                }

                $A.util.addClass(spinner, 'hidden');
                $A.util.addClass(component.find('contentContainer').getElement(), 'loaded');
            },
            {
                contentName: contentName,
                contentLayout: contentLayout,
                isTargeted: !component.get('v.ignoreTargets'),
                siteName: siteName,
                langCode: langCode
            });
        } else {
            console.error('contentName unexpectedly empty');
        }
    },

    handleSlider: function(component) {
        function fSetDimensions (item) {
            // set css height of currently visible elements
            // scrollContainer.style.height = itemHeights[item] + 'px';
            leftButton.style.height = items[0].querySelector('.sliderItemImage').scrollHeight + 'px';
            rightButton.style.height = items[0].querySelector('.sliderItemImage').scrollHeight + 'px';
        }

        function fScrollLeft () {
            fSetDimensions(visibleItem);
            var scrollSpd = 200; // not sure what this represents. it seems slow for 200ms. declared locally because we modify it when we loop to the end
            if (visibleItem > 0) {
                visibleItem--;
            } else {
                visibleItem = items.length - 1;
                scrollSpd = 200 * (items.length / 3);
            }
            helper.scrollLeftTo(scrollContainer, items[visibleItem].offsetLeft, scrollSpd);

            if (autoScrollDelay > 0) {
                // clear auto advance timer when scrolling manually
                clearTimeout(autoScrollTimer);
                autoScrollTimer = setTimeout(fScrollRight, autoScrollDelay);
            }
        }

        function fScrollRight () {
            var scrollSpd = 200; // not sure what this represents. it seems slow for 200ms. declared locally because we modify it when we loop to the start
            fSetDimensions(visibleItem);
            if (visibleItem < items.length - 1) {
                visibleItem++;
            } else {
                visibleItem = 0;
                scrollSpd = 200 * (items.length / 3);
            }
            helper.scrollLeftTo(scrollContainer, items[visibleItem].offsetLeft, scrollSpd);

            if (autoScrollDelay > 0) {
                // clear auto advance timer when scrolling manually
                clearTimeout(autoScrollTimer);
                autoScrollTimer = setTimeout(fScrollRight, autoScrollDelay);
            }
        }

        var helper = this,
            markupContainer = component.find('contentMarkup').getElement(),
            sliderContainer = markupContainer.getElementsByClassName('sliderContainer')[0],
            scrollContainer = markupContainer.getElementsByClassName('sliderScrollContainer')[0],
            leftButton = sliderContainer.getElementsByClassName('sliderScrollButtonLeft')[0],
            rightButton = sliderContainer.getElementsByClassName('sliderScrollButtonRight')[0],
            items = sliderContainer.getElementsByClassName('sliderItem'),
            visibleItem = 0,
            autoScrollDelay = parseInt(sliderContainer.dataset.slidertime),
            autoScrollTimer,
            resizeHandler = $o.debounce(function() {
            fSetDimensions(visibleItem);
            scrollContainer.scrollLeft = items[visibleItem].offsetLeft;
        }, 100);

        fSetDimensions(visibleItem); // set heights on first slide
        window.addEventListener('resize', resizeHandler);

        leftButton.addEventListener('click', fScrollLeft);
        rightButton.addEventListener('click', fScrollRight);

        if (autoScrollDelay > 0) {
            // start auto advance timer
            autoScrollTimer = setTimeout(fScrollRight, autoScrollDelay);
        }
    },

    scrollLeftTo: function(element, to, duration) {
        // http://stackoverflow.com/a/8918062
        if (duration <= 0) {
            return;
        }


        var helper = this,
            difference = to - element.scrollLeft,
            perTick = difference / duration * 10;

        setTimeout(function() {
            element.scrollLeft = element.scrollLeft + perTick;
            if (element.scrollLeft === to) return;
            helper.scrollLeftTo(element, to, duration - 10);
        }, 10);
    }
})