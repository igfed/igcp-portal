global virtual with sharing class ec_Subscribeable extends cms.ContentTemplateController {

    global ec_Subscribeable(){
    }

    global ec_Subscribeable(cms.CreateContentController cc) {
        super(cc);
    }

    global ec_Subscribeable(cms.GenerateContent gc) {
        super(gc);
    }

    public String getLink() {

        String detail;
        if (isArticle()) {
            detail = getSafeStringFromProperty('articleDetail', 'External,,,,,,' + siteUrl + 's/news-detail');
        } else {
            detail = getSafeStringFromProperty('policyDetail', 'External,,,,,,' + siteUrl + 's/policy-detail');
        }

    	cms.Link detailLink = new cms.Link(detail);

        String pageTarget = detailLink.targetPage;
        if (detailLink.targetPage == null) {
            pageTarget = '';
        }

		return pageTarget + '?id=' + versionOriginId;
    }


//    global virtual String getLink() {
//       String link = getDetailLink('news');
//       if (String.isNotBlank(link)) {
//           return link;
//       } else {
//           return getDetailLink('policy');
//       }
//    }

    global virtual String getHeadline() {
        String title = getProperty('title');
        if (String.isNotBlank(title)) {
            return title;
        } else {
            return getProperty('Headline');
        }
    }

    global virtual String getIconName() {
       return getProperty('iconName');
    }

    global virtual String getIconType() {
        return getProperty('iconType');
    }

    global virtual String getType() {
        String type = getProperty('articleType');
        if (String.isNotBlank(type)) {
            return type;
        } else {
            return getProperty('policyType');
        }
    }

    private boolean isArticle() {
        String type = getProperty('articleType');
        if (String.isNotBlank(type)) {
            return true;
        }
        return false;
    }


    global virtual override String getHTML() {
        String html;

        html = '<a class="subscribeableItem" href="' + getLink() + '" title="' + getHeadline() + '"' +
                ' data-versionorigin="' + versionOriginId + '"' +
                ' data-publisheddate="' + originalPublishedStartDateAsString + '"' +
                ' data-icontype="' + getIconType() + '"' +
                ' data-iconname="' + getIconName().replace('_', '-') + '"' +
                ' data-type="' + getType() + '"' +
                ' data-date="' + content.cms__Published_Start_Date__c.format('yyyy-MM-dd') + '">' +
                '<div class="slds-lookup__item-action slds-media">';
        if (String.isNotBlank(getIconName())) {
            html += '<svg aria-hidden="true" class="slds-icon slds-icon-' + getIconType() + '-' + getIconName().replace('_', '-') + '">' +
                    '<use xlink:href="' + ec_LayoutHelper.getResourceURL('ec_slds') + '/assets/icons/' + getIconType() + '-sprite/svg/symbols.svg#' + getIconName() + '"></use>' +
                    '</svg>';
        }
        html += '<div class="slds-media__body">' +
                    '<div class="slds-lookup__result-text">' + getHeadline() + '</div>' +
                        '<span class="slds-lookup__result-meta slds-text-body--small">' + getType() + ' • '+ Label.ec_Notifications_Updated_Text +': ' + content.cms__Published_Start_Date__c.format('yyyy-MM-dd') + '</span>' +
                '</div>' +
              '</div>' +  
            '</a>';

        return html;
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

    public String cliId {
        get {
            return content_layout_instance != null ? content_layout_instance.Id : '';
        }
    }

    public String versionOriginId {
        get {
            return content.cms__Version_Origin__c != null ? content.cms__Version_Origin__c : content.Id;
        }
    }

    public String publishedStartDateAsString {
        get {
            return String.valueOf(content.cms__Published_Start_Date__c.getTime());
        }
    }

    public String originalPublishedStartDateAsString {
        get {
            return String.valueOf(getOriginalPublishedStartDate().getTime());
        }
    }

    // query for site secure url to use with detail and area default urls
    public String siteUrl {
        get {
            SiteBundle sb = ec_APIHelper.getSiteBundle(sn);
            String url = sb.siteSecureUrl;
            if (!url.endsWith('/')) {
                url += '/';
            }
            return url;
        }
    }

    public String lightningIconMarkup(String theIconName, String theIconType, String sizeSuffix) {
        String markup = '';
        String sizeClassName = '';

        // expecting one of xx-small, x-small, small, or large
        if (String.isNotBlank(sizeSuffix)) {
            sizeClassName = ' slds-icon--' + sizeSuffix.toLowerCase();
        }

        if (String.isNotBlank(theIconName) && String.isNotBlank(theIconType)) {
            markup = '<svg aria-hidden="true" class="slds-icon' + sizeClassName + ' slds-icon-' + theIconType + '-' + theIconName.replace('_', '-') + '">' +
                    '<use xlink:href="' + ec_LayoutHelper.getResourceURL('ec_slds') + '/assets/icons/' + theIconType + '-sprite/svg/symbols.svg#' + theIconName + '"></use>' +
                    '</svg>';
        }

        return markup;
    }   // lightningIconMarkup - with size parameter


    public String lightningIconMarkup(String theIconName, String theIconType) {
        return lightningIconMarkup(theIconName, theIconType, '');
    }   // lightningIconMarkup - default size

    global String getSafeStringFromProperty(String property, String defaultValue) {
        String value = getProperty(property);
        return String.isNotBlank(value) ? value : defaultValue;
    }

    global String getSafeStringFromProperty(String property) {
        return getSafeStringFromProperty(property, '');
    }

}