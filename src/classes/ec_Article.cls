global virtual with sharing class ec_Article extends ec_Subscribeable {
    global ec_Article(){
    }

    global ec_Article(cms.CreateContentController cc) {
        super(cc);
    }

    global ec_Article(cms.GenerateContent gc) {
        super(gc);
    }

    public String articleDetailLinkString {
        get {
            return getArticleDetailTarget() + '?id=' + versionOriginId;
        }
    }


    // SOQL query limit per transaction is 100 - if we allow 80 of these to be used for "HTML_Content"
    // that leaves us with 10+ additional properties
    public Integer maxChunks {
        get { return 80; }
    }

    public String articleDetail {
        get {
            return getSafeStringFromProperty('articleDetail', 'External,,,,,,' + siteUrl + 's/news-detail');
        }
    }

    public String newsArea {
        get {
            return getSafeStringFromProperty('newsArea', 'External,,,,,,' + siteUrl + 's/news-area');
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
            parameters.put('runtime', ec_APIHelper.ORCHESTRACMS_API_RUNTIME);
            parameters.put('apiVersion', ec_APIHelper.ORCHESTRACMS_API_VERSION);

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
	
    public virtual String getDetailContentLayout() {
        return getSafeStringFromProperty('detailContentLayout', 'ArticleDetail_SLDSFigure');
    }
    
    public cms.Link articleDetailLink {
        get {
            return new cms.Link(articleDetail);
        }
        set;
    }

    public String getArticleDetailTarget() {
        String pageTarget = articleDetailLink.targetPage;
        if (articleDetailLink.targetPage == null) {
            pageTarget = '';
        }
        return pageTarget;
    }

    public cms.Link newsAreaLink {
        get {
            return new cms.Link(newsArea);
        }
        set;
    }

    public String getNewsAreaTarget() {
        String pageTarget = newsAreaLink.targetPage;
        if (newsAreaLink.targetPage == null) {
            pageTarget = '';
        }
        return pageTarget;
    }

    public String articleType {
        get {
            return getSafeStringFromProperty('articleType', 'Article');
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

    public String ImageId {
        get {
            return getValidImageUrl(this.getProperty('ImageId'));
        }
    }

    public String LargeImageId {
        get {
            return getValidImageUrl(this.getProperty('LargeImageId'));
        }
    }

    public String AltImageText {
        get {
            return getSafeStringFromProperty('AltImageText');
        } set;
    }

    public String TitleImageText {
        get {
            return getSafeStringFromProperty('TitleImageText');
        } set;
    }


    public String Headline {
        get {
            return getSafeStringFromProperty('Headline', this.content.cms__Name__c);
        } set;
    }

    public String HtmlEscapedHeadline {
        get {
            String hl = this.Headline;
            return (hl != null) ? hl.escapeHtml4() : '';
        }
    }

    public String SummaryContent {
        get {
            if(SummaryContent == null) {
                SummaryContent = getProperty('SummaryContent');

                if(SummaryContent == null) {
                    SummaryContent = '';
                }
            }

            return SummaryContent;
        } set;
    }

    public String htmlContent {
        get {
            if(htmlContent == null) {
                String contentChunk;

                contentChunk = this.getProperty('HTMLContent');
                htmlContent = contentChunk;

                // if the article's HTMLContent is greater than 32k, then it is split across
                // multiple HTMLContent attributes. If there are multiple 'chunks' the first
                // numbered HTMLContent part is named 'HTMLContent_2'
                for (Integer chunk = 2; chunk <= maxChunks && contentChunk != null; chunk++) {
                    contentChunk = this.getProperty('HTMLContent_' + chunk.format());

                    if (contentChunk != null) {
                        htmlContent += contentChunk;
                    }
                }
            }

            return (htmlContent != null) ? htmlContent : '';
        } set;
    }

    public Boolean getPublished() {
        return (this.content != null) ? this.content.cms__Published__c : false;
    }

    global virtual override String getHTML() {
        return '<!- must always be overriden! -->•';
    }

    public enum ImageSize { LARGE, SMALL }
    public String getImageHTML(ImageSize size, String className) {
        String  html,
                imageURL;

        if (size == ImageSize.LARGE) {
            imageURL = LargeImageId;
        } else if (size == ImageSize.SMALL) {
            imageURL = ImageId;
        }

        if (imageURL == null) {
            html = '<div class="' + className + '"></div>';
        } else {
            html = '<img class="' + className + '" src="' + imageURL + '" alt="' + AltImageText + '" />';
        }

        return html;
    }

    public String openNewsItemSummaryWrapper(String specializedClassName) {
        // slds-p-top-none eliminates the slds-p-around--x-small 0.5rem on the top
        return '<div class="news-item-summary data-container slds-p-top--none ' + specializedClassName + '" ' +
                'data-versionorigin="' + versionOriginId +
                '" data-content="' + content.Id +
                '" id="' + cliId +
                '" data-publisheddate="' + originalPublishedStartDateAsString +
                '" data-pubstartdate="' + publishedStartDateAsString +
                '" data-detailtemplate="' + getDetailContentLayout() +
                '">';
    }

    public String closeNewsItemSummaryWrapper() {
        return '</div>';
    }


    public String openNewsItemSummaryLink() {
        return openNewsItemSummaryLink('');
    }

    /**
        @param  extraAttributes optional fully specified string of attribute(s) to be inserted within <a>
     */
    public String openNewsItemSummaryLink(String extraAttributes) {
        return '<a href="' + articleDetailLinkString +
                '" class="ocms-title-taxonomy-detail-link oui-target-link ' +
                    'slds-box slds-media slds-grow slds-text-link--reset slds-grid slds-wrap slds-grid--vertical-stretch" ' +
                + (extraAttributes != null ? extraAttributes : '') +
        '>';
    }


    public String closeNewsItemSummaryLink() {
        return '</a>';
    }


    public String getLikeButtonMarkup() {
        return  '<button class="likeButton slds-button slds-button--icon-border" aria-live="assertive" title="' + Label.ec_TaxonomyLoader_Like + '" data-versionorigin="' + versionOriginId + '">' +
                    '<svg aria-hidden="true" class="slds-button__icon">' +
                        '<use xlink:href="' + ec_LayoutHelper.getResourceURL('ec_slds') + '/assets/icons/utility-sprite/svg/symbols.svg#like"></use>' +
                    '</svg>' +
                    '<span class="slds-assistive-text">' + Label.ec_TaxonomyLoader_Like + '</span>' +
                    '<span class="likeCount">0</span>' +
                '</button>';
    }   // getLikeButtonMarkup


    public List<String> getAllTagsForContent() {
        return getPropertyList('renderTagPath');
    }


    public String getTagsMarkup() {
        String html = '<div class="contentTags">';

        List<String> allPaths = getAllTagsForContent();
        Map<String, String> lastTagToPath = new Map<String, String>();

        for (String path : allPaths) {
            String lastTag = path.substring(path.lastIndexOf('/') + 1).trim();
            lastTagToPath.put(lastTag, path);
        }
        List<String> lastPaths = new List<String>(lastTagToPath.keySet());
        lastPaths.sort();

        for (String tag: lastPaths) {
            html += '<span class="slds-badge slds-m-around--xxx-small tagPathBadge" data-tagpath="' + lastTagToPath.get(tag) + '" data-tagarea="' + getNewsAreaTarget() + '">' + tag + '</span>';
        }

        html += '</div>';   // .contentTags

        return html;
    }   // getTagsMarkup
}