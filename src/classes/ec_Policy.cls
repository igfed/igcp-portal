global virtual with sharing class ec_Policy extends ec_Subscribeable {
    global ec_Policy(){
    }

    global ec_Policy(cms.CreateContentController cc) {
        super(cc);
    }

    global ec_Policy(cms.GenerateContent gc) {
        super(gc);
    }

    public String publishedStartDateAsYMD () {
        return content.cms__Published_Start_Date__c.format('yyyy-MM-dd');
    }

    public String policyDetailLinkString {
        get {
            return getPolicyDetailTarget() + '?id=' + versionOriginId;
        }
    }

    public String policyDetail {
        get {
            return getSafeStringFromProperty('policyDetail', 'External,,,,,,' + siteUrl + 's/policy-detail');
        }
    }

    public cms.Link policyDetailLink {
        get {
            return new cms.Link(policyDetail);
        }
        set;
    }

    public String getPolicyDetailTarget() {
        String pageTarget = policyDetailLink.targetPage;
        if (policyDetailLink.targetPage == null) {
            pageTarget = '';
        }

        return pageTarget;
    }

    public String detailContentLayout {
        get {
            return getSafeStringFromProperty('detailContentLayout', 'PolicyDetail');
        }
    }

    // need to query for content type id because the content template selector accepts ids instead of names
    public String contentTypeId {
        get {

            ContentAPIRequest apiRequest = new ContentAPIRequest();
            apiRequest.objectId = versionOriginId;
            apiRequest.requestFlags.put('lock', false);
            Map<String, String> parameters = new Map<String, String>();
            parameters.put('service', 'ContentAPI');
            parameters.put('action', 'getContent');
            parameters.put('contentRequest', json.serialize(apiRequest));
            parameters.put('sname', sn); // This is the name of our OrchestraCMS site
            parameters.put('application', 'runtime');
            parameters.put('apiVersion', '4.0');

            String response = cms.ServiceEndPoint.doActionApex(parameters);
            JSONMessage.APIResponse apiResponse = (JSONMessage.APIResponse)json.deserialize(response, JSONMessage.APIResponse.class);

            ContentBundle cb = getBundleFromResponse(apiResponse);
            ContentTypeBundle ctb = cb.contentType;
            Id contentTypeId = ctb.contentTypeId;

            return contentTypeId;
        }
    }

    private static ContentBundle getBundleFromResponse(JSONMessage.APIResponse response) {
        if (!response.isSuccess) {
            throw new APIException('Error: ' + json.deserialize(response.responseObject, JSONMessage.ErrorResponse.class));
        }
        if (!response.type.equals('ContentBundle')) {
            throw new APIException('Unexpected type from response: ' + response.type);
        }
        return (ContentBundle) json.deserialize(response.responseObject, ContentBundle.class);
    }

    public String policyType {
        get {
            return getSafeStringFromProperty('policyType', 'Policy');
        } set;
    }

    public String backButton {
        get {
            return getSafeStringFromProperty('backButton', 'Back');
        } set;
    }

    /**
     * The function is used to support old legacy url's where they were just stored and the file id.
     * New urls are either stored with the filedownload url or with an http: url so just use them otherwise
     * we format the url with the standard SalesForce FileDownload servlet url.
     * @function {public static String} getValidImageUrl
     * @param {String} sImgUrl The image url
     * @return A valid image url.
     */
    public String getValidImageUrl(String sImgUrl) {
        if (sImgUrl != null) {
            String url = '';
            if (sImgUrl.startsWith('http') || sImgUrl.startsWith('/servlet/servlet.FileDownload')) {
                url = sImgUrl;
            } else {
                url = '/servlet/servlet.FileDownload?file=' + sImgUrl;
            }
            if (Site.getPathPrefix() != null && url.startsWith('/servlet')) {
                url = Site.getPathPrefix() + url;
            }
            return url;
        }
        return null;
    }


    public String logo {
        get {
            return getValidImageUrl(this.getProperty('logo'));
        }
    }

    public String title {
        get {
            return getSafeStringFromProperty('title');
        } set;
    }

    public String escapedTitle {
        get {
            String hl = this.title;
            return (hl != null) ? hl.escapeHtml4() : '';
        }
    }

    public String policySummary {
        get {
            return getSafeStringFromProperty('policySummary');
        } set;
    }

    public String dateEffective {
        get {
            return getSafeStringFromProperty('dateEffective');
        } set;
    }

    public String dateLastReview {
        get {
            return getSafeStringFromProperty('dateLastReview');
        } set;
    }

    public String dateScheduledReview {
        get {
            return getSafeStringFromProperty('dateScheduledReview');
        } set;
    }


    public String supersedes {
        get {
            return getSafeStringFromProperty('supersedes');
        } set;
    }

    public String approvedBy {
        get {
            return getSafeStringFromProperty('approvedBy');
        } set;
    }


    public String section1Title {
        get {
            return getSafeStringFromProperty('section1Title', 'Purpose');
        } set;
    }

    public String section1Body {
        get {
            return getSafeStringFromProperty('section1Body');
        } set;
    }

    public String section2Title {
        get {
            return getSafeStringFromProperty('section2Title', 'Scope');
        } set;
    }

    public String section2Body {
        get {
            return getSafeStringFromProperty('section2Body');
        } set;
    }

    public String section3Title {
        get {
            return getSafeStringFromProperty('section3Title', 'Policy Statements');
        } set;
    }

    public String section3Body {
        get {
            return getSafeStringFromProperty('section3Body');
        } set;
    }

    public String section4Title {
        get {
            return getSafeStringFromProperty('section4Title', 'Procedure');
        } set;
    }

    public String section4Body {
        get {
            return getSafeStringFromProperty('section4Body');
        } set;
    }


    public String policyArea {
        get {
            return getSafeStringFromProperty('policyArea', 'External,,,,,,' + siteUrl + 's/policy-area');
        }
    }

    public cms.Link policyAreaLink {
        get {
            return new cms.Link(policyArea);
        }
        set;
    }

    public String getPolicyAreaTarget() {
        return policyAreaLink.targetPage == null ? '' : policyAreaLink.targetPage;
    }


    public String getTagsMarkup() {
        String html = '<div class="contentTags slds-grid slds-wrap slds-m-vertical--xx-small">';

        List<String> allPaths = getAllTagsForContent();
        Map<String, String> lastTagToPath = new Map<String, String>();

        for (String path : allPaths) {
            String lastTag = path.substring(path.lastIndexOf('/') + 1).trim();
            lastTagToPath.put(lastTag, path);
        }
        List<String> lastPaths = new List<String>(lastTagToPath.keySet());
        lastPaths.sort();

        for (String tag: lastPaths) {
            html += '<span class="slds-badge slds-m-around--xxx-small tagPathBadge" data-tagpath="' + lastTagToPath.get(tag) + '" data-tagarea="' + getPolicyAreaTarget() + '">' + tag + '</span>';
        }

        html += '</div>';   // .contentTags

        return html;
    }   // getTagsMarkup




    public List<String> getAllTagsForContent() {
        return getPropertyList('renderTagPath');
    }



    global virtual override String getHTML() {
        return '<!- must always be overriden! -->•';
    }
}