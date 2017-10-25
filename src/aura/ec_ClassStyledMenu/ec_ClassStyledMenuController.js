({
	doInit: function(cmp, event, helper) {
        var langCode = $A.get('$Locale.language');
        if (langCode == 'en') {
            langCode = 'en_US';
        }

        helper.callServer(cmp, 'c.getClassStyledMenu', function(response){
            var rendering = JSON.parse(response).rendering;
            var prefix = JSON.parse(response).prefix;
			var pageHeaderJSON = JSON.parse(response).pageHeaderRendering;
            var pageHeaderRendering = JSON.parse(pageHeaderJSON).rendering;
            var siteUrl = JSON.parse(response).siteUrl;
            var elPageHeader = document.createElement('div');
			elPageHeader.innerHTML = pageHeaderRendering;

            cmp.set('v.sitePrefix', prefix);
            
            var el = document.createElement('div');
			el.innerHTML = rendering;

            var rootLevelItems = el.getElementsByClassName('root-level-item');

            for (var i = 0, rootLevelItem; rootLevelItem = rootLevelItems[i]; i++) {
                var anchor = rootLevelItem.getElementsByTagName('a')[0];
                var rootLevelItemLabel = anchor.innerText;
                var rootLevelItemURL = helper.fixLinksInBuilder(anchor.href, siteUrl, prefix); //anchor.href;
                var children = rootLevelItem.getElementsByClassName('level-1-item');
                if (children.length > 0) {
                    var kids = [];
                    for (var j=0; j< children.length; j++) {
                        var childItemAnchor = children[j].getElementsByTagName('a')[0];
                        var childItemLabel = children[j].innerText;
                		var childItemURL = helper.fixLinksInBuilder(childItemAnchor.href, siteUrl, prefix); //childItemAnchor.href;
                        kids.push({label: childItemLabel, url: childItemURL});
                    }
                    
                    $A.createComponent(
                        'c:ec_ClassStyledMenuListItem',
                        {
                            'aura:id': 'menuListItem',
                            label: rootLevelItemLabel,
                            url: rootLevelItemURL,
                            children: JSON.stringify(kids),
                            sitePrefix: prefix
                        },
                        function(newButton, status, errorMessage){
                            //Add the new button to the body array
                            if (status === 'SUCCESS') {
                                var body = cmp.get('v.body');
                                body.push(newButton);
                                cmp.set('v.body', body);
                            }
                            else if (status === 'INCOMPLETE') {
                                console.log('No response from server or client is offline.')
                                // Show offline error
                            }
                            else if (status === 'ERROR') {
                                console.log('Error: ' + errorMessage);
                                // Show error message
                            }
                        }
                	); // end createComponent
                } else {
                    $A.createComponent(
                        'c:ec_ClassStyledMenuItem',
                        {
                            'aura:id': 'menuItem',
                            label: rootLevelItemLabel,
                            url: rootLevelItemURL,
                            extraClasses: ''
                        },
                        function(newButton, status, errorMessage){
                            //Add the new button to the body array
                            if (status === 'SUCCESS') {
                                var body = cmp.get('v.body');
                                body.push(newButton);
                                cmp.set('v.body', body);
                            }
                            else if (status === 'INCOMPLETE') {
                                console.log('No response from server or client is offline.')
                                // Show offline error
                            }
                            else if (status === 'ERROR') {
                                console.log('Error: ' + errorMessage);
                                // Show error message
                            }
                        }
                	); // end createComponent
                } // end else
            } // end for
        }, {
            langCode: langCode
        }); // end callServer
	}, // end doInit

    showMenuClick: function (cmp, event, helper) {
	    var menuContainer = cmp.find('menuContainer');
	    $A.util.toggleClass(menuContainer, 'mobileMenuOpen');
    }
})