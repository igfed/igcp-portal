/**
    ec_ArticleSummary_TextOnHover - an alternative article summary layout
        Differences
            - summary text is only made visible on hover
            - image is 4x3

        div.news-item-summary.news-item-summmary-textOnHover...
            a.ocms-title-taxonomy-detail-link.oui-target-link
                div.slds-media__figure
                    div.slds-image
                        ...
                    p.SummaryContent
                div.slds-media__body
                    h3
                    div.contentTags
                div.slds-tile
                    div.timeSincePublished
                    button.likeButton

    2016-Dec-12 Bill Lucas
                Original, cloned from ec_ArticleSummary_BigText

 */

global virtual with sharing class ec_ArticleSummary_TextOnHover extends ec_Article {
    global ec_ArticleSummary_TextOnHover() {
    }

    global ec_ArticleSummary_TextOnHover(cms.CreateContentController cc) {
        super(cc);
    }

    global ec_ArticleSummary_TextOnHover(cms.GenerateContent gc) {
        super(gc);
    }

    global virtual override String getHTML() {

        String html = '';

        html += openNewsItemSummaryWrapper('news-item-summary-textOnHover slds-m-bottom--small') +
                openNewsItemSummaryLink() +

                '<div class="slds-media__body slds-m-bottom--x-small">' +
                    '<h3 class="slds-text-heading--medium">' + Headline.escapeHtml4() + '</h3>' +
                '</div>' +   // .slds-media__body

                '<div class="slds-media__figure slds-size--1-of-1">' +
                    '<div class="slds-image">' +
                        '<div class="slds-image__crop slds-image__crop--4-by-3">' +
                            getImageHTML(ImageSize.SMALL, '') +
                        '</div>' +
                    '</div>' +
                    '<div class="SummaryContent">' +
                        '<p>' +
                            SummaryContent.escapeHtml4() +
                        '</p>' +
                    '</div>' +
                '</div>' +  // .slds-media__figure

                '<div class="slds-grid slds-tile slds-size--1-of-1 slds-m-top--x-small slds-grid--vertical-align-center slds-grid--align-spread">' +
                    getTagsMarkup() +
                    '<div class="articleButtonBar">'+
                        '<div class="subscribeButton"></div>'+
                        '<div class="timeSincePublished slds-p-vertical--xx-small slds-text-body--small"></div>' +        // readable time since last published; filled in by JavaScript
                        getLikeButtonMarkup() +
                    '</div>' + // .articleButtonBar
                '</div>' +  // .slds-tile (meta info container)

                closeNewsItemSummaryLink() +
                closeNewsItemSummaryWrapper();

        return html;
    }
}
// ec_ArticleSummary_TextOnHover.cls