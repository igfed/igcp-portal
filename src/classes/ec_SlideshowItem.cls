global with sharing class ec_SlideshowItem extends cms.ContentTemplateController {
    public ec_SlideshowItem() {}

    global ec_SlideshowItem(cms.GenerateContent gc) {
        super(gc);
    }

    global ec_SlideshowItem(cms.CreateContentController cc) {
        super(cc);
    }

    global override String getHTML() {
        String html = '';

        String target = linkDest.targetPage;
        if (String.isBlank(target)) {
            target = 'javascript:void(0);';
        }

        html += '<a href="' + target + '" class="sliderItem">' +
                    '<div class="sliderItemImage slds-image">' +
                        '<div class="slds-image__crop slds-image__crop--16-by-9">' +
                            '<img src="' + image + '" alt="" />' +
                        '</div>' +
                    '</div>' +
                    '<div class="slds-page-header" role="banner">' +
                        '<div class="slds-grid">' +
                            '<div class="slds-col slds-has-flexi-truncate">' +
                                '<div class="slds-media slds-no-space slds-grow">' +
                                    '<div class="slds-media__figure">';
        if (String.isNotBlank(iconName)) {
            html +=                     '<svg aria-hidden="true" class="slds-icon slds-icon-' + iconType + '-' + iconName.replace('_', '-') + '">' +
                                            '<use xlink:href="' + ec_LayoutHelper.getResourceURL('ec_slds') + '/assets/icons/' + iconType + '-sprite/svg/symbols.svg#' + iconName + '"></use>' +
                                        '</svg>';
        }
        html +=                         '</div>' +
                                        '<div class="slds-media__body">' +
                                            '<h1 class="slds-page-header__title slds-m-bottom--x-small">' + headingText + '</h1>' +
                                            '<p>' + summaryText + '</p>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</a>';

        return html;
    }

    /**
     * @description convenience function for content.cms__Published__c
     * @return Boolean - true if content version is published (and therefore cannot be edited)
     */
    public Boolean getPublished() {
        return content != null ? content.cms__Published__c : false;
    }

    private String getSafeStringFromProperty(String propName) {
        String prop = getProperty(propName);

        return prop == null ? '' : prop;
    }

    private String getSafeStringFromProperty(String propName, String defaultValue) {
        String prop = getProperty(propName);

        return prop == null ? defaultValue : prop;
    }

    public String headingText {
        get {
            return getSafeStringFromProperty('headingText');
        }
    }

    public String summaryText {
        get {
            return getSafeStringFromProperty('summaryText', '');
        }
    }

    public String linkDestAsData {
        get {
            return getProperty('linkDestAsData');
        }
    }

    public cms.Link linkDest {
        get {
            return new cms.Link(linkDestAsData);
        }
    }

    public String image {
        get {
            return getProperty('image');
        }
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

    public String imageAltText {
        get {
            return getSafeStringFromProperty('imageAltText');
        }
    }

    public String imageTitleText {
        get {
            return getSafeStringFromProperty('imageTitleText');
        }
    }

}