/**
    ec_ArticleSummary_BigText - an alternative article summary layout
        Differences
            - wrapping anchor uses 'main' class name news-item-summmary-bigText
            - .slds-media__figure takes up less horizontal width, leaving more for .slds-media__body
            - SummaryContent is omitted, but used as title text
            - time since published, content tags, and like button appear in their own container

        div.news-item-summary.news-item-summmary-bigText...
            a.ocms-title-taxonomy-detail-link.oui-target-link
                div.slds-media__figure
                    div.slds-image
                        ...
                div.slds-media__body
                    h3
                div.slds-tile
                    div.timeSincePublished
                    div.contentTags
                    button.likeButton

    2016-Dec-07 Bill Lucas
                Original, cloned from ec_ArticleSummary_SLDSMedia

 */

global virtual with sharing class ec_ArticleSummary_BigText extends ec_Article {
    global ec_ArticleSummary_BigText() {
    }

    global ec_ArticleSummary_BigText(cms.CreateContentController cc) {
        super(cc);
    }

    global ec_ArticleSummary_BigText(cms.GenerateContent gc) {
        super(gc);
    }

    global virtual override String getHTML() {

        String html = '';

        html += openNewsItemSummaryWrapper('news-item-summary-bigText slds-m-bottom--small') +
                    openNewsItemSummaryLink('title="' + SummaryContent.escapeHtml4() + '"') +
                        '<div class="slds-media__figure slds-size--1-of-1 slds-small-size--1-of-2 slds-medium-size--1-of-4 slds-large-size--1-of-2">' +
                            '<div class="slds-image">' +
                                '<div class="slds-image__crop slds-image__crop--16-by-9">' +
                                    getImageHTML(ImageSize.SMALL, '') +
                                '</div>' +
                            '</div>' +
                        '</div>' +  // .slds-media__figure

                        '<div class="slds-media__body">' +
                            '<h3 class="slds-text-heading--large">' + Headline.escapeHtml4() + '</h3>' +
                        '</div>' +   // .slds-media__body

                        '<div class="slds-tile slds-size--1-of-1">' +
                            getTagsMarkup() +
                            '<div class="articleButtonBar">'+
                                '<div class="subscribeButton"></div>'+
                                '<div class="timeSincePublished slds-text-body--small"></div>' +        // readable time since last published; filled in by JavaScript
                                getLikeButtonMarkup() +
                            '</div>' + // .articleButtonBar
                        '</div>' +  // .slds-tile (meta info container)
                    closeNewsItemSummaryLink() +
                closeNewsItemSummaryWrapper();

        return html;
    }
}
// ec_ArticleSummary_BigText.cls