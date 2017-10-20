({
    scriptLoad: function(component, event, helper) {
        var langCode = $A.get("$Locale.language");
        if (langCode == 'en')langCode = 'en_US';

        helper.callServer(component, "c.getHeaderLinks", function(response) {
            var responseObj = JSON.parse(response);
            var renderings = responseObj.rendering;
            if (!renderings.length) return;
            var siteData = responseObj.siteData;
            var hostSiteData = responseObj.hostSiteData;
            var hostSitePrefix = hostSiteData.prefix;
            var communityUrl = siteData.siteUrl;
            var sitePrefix = siteData.prefix;

            for (var i = 0; i < renderings.length; i++) {
                renderings[i] = helper.fixSitePrefix(renderings[i], communityUrl, sitePrefix, hostSitePrefix, component.get('v.SLDSPath'));
            }

            var el = component.find('pageHeaderLinks').getElement();
            el.innerHTML = renderings.join('');

            var anchors = el.getElementsByTagName('a');
            for (var i = 0; i < anchors.length; i++) {
                anchors[i].addEventListener('click', function(evt) {
                    evt.preventDefault();

                    var thisHref = evt.currentTarget.getAttribute('href');
                    helper.navigateToURL(thisHref, {}, true);
                });
            }
        }, {'langCode': langCode });
    }
})