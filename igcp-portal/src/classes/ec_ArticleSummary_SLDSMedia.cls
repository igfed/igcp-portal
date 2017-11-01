global virtual with sharing class ec_ArticleSummary_SLDSMedia extends ec_Article {
    global ec_ArticleSummary_SLDSMedia() {
    }

    global ec_ArticleSummary_SLDSMedia(cms.CreateContentController cc) {
        super(cc);
    }

    global ec_ArticleSummary_SLDSMedia(cms.GenerateContent gc) {
        super(gc);
    }

    global virtual override String getHTML() {
        String cliId = '';
        if (this.content_layout_instance != null) {
            cliId = content_layout_instance.Id;
        }

        String versionOriginId = content.Id;
        if (content.cms__Version_Origin__c != null) {
            versionOriginId = content.cms__Version_Origin__c;
        }
        Datetime origdt = getOriginalPublishedStartDate();
        String pubStartDateString = String.valueOf(content.cms__Published_Start_Date__c.getTime());
        String origPubStartDateString = String.valueOf(origdt.getTime());

        String articleDetailLink = getArticleDetailTarget();
        if (String.isNotBlank(articleDetailLink)) {
            articleDetailLink += '?id=' + versionOriginId;
        }

        String html = '';
        html += openNewsItemSummaryWrapper('news-item-summary-basic slds-m-bottom--small') +

                    '<a href="' + articleDetailLink + '" class="ocms-title-taxonomy-detail-link oui-target-link ' +
                        'slds-box slds-media slds-grow slds-text-link--reset slds-grid slds-wrap slds-grid--vertical-stretch"' +
                    '>' +

                        '<div class="slds-media__figure slds-size--1-of-1 slds-small-size--1-of-2 slds-medium-size--1-of-3 slds-large-size--1-of-2">' +
                            '<div class="slds-image">' +
                                '<div class="slds-image__crop slds-image__crop--16-by-9">' +
                                    getImageHTML(ImageSize.SMALL, '') +
                                '</div>' +
                            '</div>' +
                        '</div>' +  // .slds-media__figure

                        '<div class="slds-media__body">' +
                            '<h3 class="slds-text-heading--medium">' + Headline.escapeHtml4() + '</h3>' +
                            '<p>' + SummaryContent.escapeHtml4() + '</p>';

        html +=             getTagsMarkup();

        html +=             '<div class="articleButtonBar">'+
                                // readable time since last published. filled in with javascript.
                                '<span class="timeSincePublished slds-p-vertical--xx-small slds-text-body--small"></span>' +
                                // like button
                                getLikeButtonMarkup() +
                            '</div>'; //.articleBuilder




        html +=         '</div>' +  // .slds-media__body
                    '</a>' +
                closeNewsItemSummaryWrapper();

        return html;
    }
}