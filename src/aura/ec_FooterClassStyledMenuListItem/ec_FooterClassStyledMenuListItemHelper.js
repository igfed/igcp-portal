({
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
            'previous',
            'previousStorage'
        ];

        var previousStorage = {};
        // clear our known params out of sessionStorage
        sessionStorageList.forEach(function(item) {
            if (item !== 'previousStorage') {
                previousStorage[item] = sessionStorage.getItem(item);
            }
            sessionStorage.removeItem(item);
        });

        // store the current page url so we can form our own history; gets around the issue in builder where navigating
        // between pages does not generate browser history, and article detail back buttons do not work.
        sessionStorage.setItem('previous', window.location.href);
        sessionStorage.setItem('previousStorage', JSON.stringify(previousStorage));

        // check url for potential parameters; add them to sessionStorage and remove them from the url.
        if (storeUrlParams && url.indexOf('?') !== -1) {
            var urlParams = url.split('?')[1].split('&');
            urlParams.forEach(function(item) {
                var k = item.split('=')[0];
                var v = item.split('=')[1];
                if (v) {
                    sessionStorage.setItem(k, v);
                }
            });

            url = url.split('?')[0];
        }
        // add optional parameters into sessionStorage
        if (params) {
            for (var key in params) {
                if (params[key]) {
                    sessionStorage.setItem(key, params[key]);
                }
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