({
    checkMyPathAgainstPath: function(component, selectedTagPath) {
        var myTagPath = component.get('v.tagPath'),
            classNames;

        // if the selected tagPath starts with this component's tag path, but doesn't fully match, expand child menu
        var subStr = selectedTagPath.substr(0, myTagPath.length);

        if (subStr === myTagPath && selectedTagPath != myTagPath){
            component.set('v.ariaExpanded', true);
        }

        classNames = component.get('v.classNames');
        if (selectedTagPath === myTagPath) {
            classNames += ' slds-is-active';        // TODO: fix: we're seeing this classname doubled
        } else {
            classNames = classNames.replace(' slds-is-active', '');
        }
        component.set('v.classNames', classNames);
    }
})