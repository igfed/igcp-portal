global with sharing class ec_Hero extends cms.ContentTemplateController {
    public ec_Hero() {}

    global ec_Hero(cms.GenerateContent gc) {
        super(gc);
    }

    global ec_Hero(cms.CreateContentController cc) {
        super(cc);
    }

    global override String getHTML() {
        String html = '';

        String target = heroLink.targetPage;
        if (String.isBlank(target)) {
            target = 'javascript:void(0);';
        }

        String backgroundCss = 'background-image:url(' + backgroundImage + '); ';
        if (String.isBlank(backgroundImage) || heightString == 'noimage') {
            backgroundCss = '';
        }

        // if headingPosition is top, put poweredBy at bottom, and vice versa
        html += '<a href="' + target + '" class="heroItem">' +
                '<div class="hero poweredBy-absolute-' + (headingPosition == 'top' ? 'bottom' : 'top') +
                ' heading-' + headingPosition + ' height-' + heightString + ' ' + extraClasses + '" style="'
                + backgroundCss + '">';
        if (String.isNotBlank(heading) || String.isNotBlank(subheading)) {
            html += '<div class="slds-page-header" role="banner">' +
                        '<div class="slds-grid">' +
                            '<div class="slds-col slds-has-flexi-truncate">' +
                                '<div class="slds-media slds-no-space slds-grow">' +
                                    '<div class="slds-media__figure">';
            if (String.isNotBlank(iconName)) {
                html +=                 '<svg aria-hidden="true" class="slds-icon slds-icon-' + iconType + '-' + iconName.replace('_', '-') + '">' +
                                            '<use xlink:href="' + ec_LayoutHelper.getResourceURL('ec_slds') + '/assets/icons/' + iconType + '-sprite/svg/symbols.svg#' + iconName + '"></use>' +
                                        '</svg>';
            }
            html +=                 '</div>' +
                                    '<div class="slds-media__body">';
            if (String.isNotBlank(heading)) {
                html +=                 '<h1 class="slds-page-header__title slds-m-right--small slds-align-middle">' + heading.escapeHtml4() + '</h1>';
            }
            if (String.isNotBlank(subheading)) {
                html +=                 '<p class="slds-text-title slds-line-height--reset">' + subheading.escapeHtml4() + '</p>';
            }
            html +=                 '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
        }
        html += '</div></a>';

        return html;
    }


    private String getSafeStringFromProperty(String propName) {
        String prop = getProperty(propName);

        return prop == null ? '' : prop;
    }

    private String getSafeStringFromProperty(String propName, String defaultValue) {
        String prop = getProperty(propName);

        return prop == null ? defaultValue : prop;
    }

    public String backgroundImage {
        get {
            return getSafeStringFromProperty('backgroundImage');
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

    public String heading {
        get {
            return getSafeStringFromProperty('heading');
        }
    }

    public String subheading {
        get {
            return getSafeStringFromProperty('subheading');
        }
    }

    public String heroLinkAsData {
        get {
            return getProperty('heroLinkAsData');
        }
    }

    public cms.Link heroLink {
        get {
            return new cms.Link(heroLinkAsData);
        }
    }

    public String heightString {
        get {
            return getSafeStringFromProperty('heightString', 'short');
        }
    }

    public String headingPosition {
        get {
            return getSafeStringFromProperty('headingPosition', 'top');
        }
    }

    public String extraClasses {
        get {
            return getSafeStringFromProperty('extraClasses');
        }
    }

}