({
    scriptLoad: function(component, event, helper) {

    },

    toggleQuickLinks : function(component, event, helper) {
        // debugger;

        var notQuickLinksSelector = '.mainContentArea, .pageHeaderSearch, .pageHeader, .navigation, .newFooter, .notQuickLinks, [data-region-name="profileMenu"]',
            elements,
            quickLinksOpen = component.get('v.quickLinksOpen');

        component.set('v.quickLinksOpen', !quickLinksOpen);

        if (component.get('v.quickLinksOpen')) {
            document.getElementById('pageHeaderToolbar').classList.add('quickLinksEnabled');
            document.querySelector('.quickLinksContainer').classList.add('active');

            elements = document.querySelectorAll(notQuickLinksSelector);
            elements.forEach(function(el) {
                el.classList.add('hide');
            });
        } else {
            document.getElementById('pageHeaderToolbar').classList.remove('quickLinksEnabled');
            document.querySelector('.quickLinksContainer').classList.remove('active');

            elements = document.querySelectorAll(notQuickLinksSelector);
            elements.forEach(function(el) {
                el.classList.remove('hide');
            });
        }
    }
})