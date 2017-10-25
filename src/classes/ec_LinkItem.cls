global with sharing class ec_LinkItem extends cms.ContentTemplateController {
    public ec_LinkItem() {}
    
    global ec_LinkItem(cms.GenerateContent gc) {
        super(gc);
    }
    
    global ec_LinkItem(cms.CreateContentController cc) {
        super(cc);
    }
    
    global override String getHTML() {
        String html;

        html = '<a title="' + linkText + '"' +
                ' data-versionorigin="' + versionOriginId + '"' +
                ' data-publisheddate="' + originalPublishedStartDateAsString + '"' +
                ' class="slds-tile slds-media link-item-link" href="' + linkDest + '">' +
                    '<div class="slds-media__figure">';
                        if (String.isNotBlank(iconName) && String.isBlank(iconOverride)) {
                            html += '<svg aria-hidden="true" class="slds-icon slds-icon-' + iconType + '-' + iconName.replace('_', '-') + '">' +
                                        '<use xlink:href="' + ec_LayoutHelper.getResourceURL('ec_slds') + '/assets/icons/' + iconType + '-sprite/svg/symbols.svg#' + iconName + '"></use>' +
                                    '</svg>';
                        } else if (String.isNotBlank(iconOverride)) {
                            html += '<img class="slds-icon" src="' + iconOverride + '" alt="' + iconAltText + '" title="' + iconTitleText + '" />';
                        }
                    html += '</div>' +
                    '<div class="slds-media__body">' +
                        '<h3 class="slds-text-heading--medium">' +
                            linkText +
                        '</h3>'+
                    '</div>'+
                '</a>';
        
        return html;
    }


    private String versionOriginId {
        get {
            return content.cms__Version_Origin__c != null ? content.cms__Version_Origin__c : content.Id;
        }
    }

    private String originalPublishedStartDateAsString {
        get {
            return String.valueOf(getOriginalPublishedStartDate().getTime());
        }
    }


    @TestVisible
    private String getSafeStringFromProperty(String propName) {
        String prop = getProperty(propName);

        return prop == null ? '' : prop;
    }
    
    @TestVisible
    private String getSafeStringFromProperty(String propName, String defaultValue) {
        String prop = getProperty(propName);

        return prop == null ? defaultValue : prop;
    }
    
    public String linkText {
        get {
            return getSafeStringFromProperty('linkText');
        }
    }
    
    public String linkDest {
        get {
            return getSafeStringFromProperty('linkDest');
        }
    }
    
    public String iconOverride {
        get {
            return getProperty('iconOverride');
        }
        set;
    }

    public String iconType {
        get {
            return getSafeStringFromProperty('iconType');
        }
    }

    public String iconName {
        get {
            return getSafeStringFromProperty('iconName');
        }
    }

    public String iconAltText {
        get {
            return getSafeStringFromProperty('iconAltText');
        }
    }

    public String iconTitleText {
        get {
            return getSafeStringFromProperty('iconTitleText');
        }
    }
}