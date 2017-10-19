({
    scriptLoad: function(component, event, helper) {
        helper.doInit(component, event, helper);
    },

    fireToggleQuickLinksEvt: function(component, event, helper) {
        var toggleMenuEvent = $A.get("e.c:ec_ToggleQuickLinksEvt");
        $A.util.toggleClass(component, 'quickLinksEnabled');
        toggleMenuEvent.fire();
    },

    reInit: function(component, event, helper) {
        var container = component.find('quickLinks_c').getElement(),
            quickLinkToggle = container.getElementsByClassName('quickLinkToggle')[0].cloneNode(true),
            children = Array.prototype.slice.call(container.children);

        children.forEach(function(el) {
            container.removeChild(el);
        });
        container.appendChild(quickLinkToggle);

        helper.doInit(component, event, helper);
    }
})