global virtual with sharing class ec_FeaturedArticleSummary_SLDSMedia extends ec_Article{
    global ec_FeaturedArticleSummary_SLDSMedia() {
    }

    global ec_FeaturedArticleSummary_SLDSMedia(cms.CreateContentController cc) {
        super(cc);
    }

    global ec_FeaturedArticleSummary_SLDSMedia(cms.GenerateContent gc) {
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

        String html = '';

        String articleDetailLink = getArticleDetailTarget() + '?id=' + versionOriginId;

        html += '<div class="featured-news-item slds-box">';
        html +=     '<a href="' + articleDetailLink + '" class="slds-text-link--reset">';

        html +=         '<div class="slds-page-header" role="banner">' +
                            '<div class="slds-grid">' +
                                '<div class="slds-col slds-has-flexi-truncate">' +
                                    '<div class="slds-media slds-no-space slds-grow">' +
                                        '<div class="slds-media__figure">';
            if (String.isNotBlank(iconName)) {
                html +=                     '<svg aria-hidden="true" class="slds-icon slds-icon-' + iconType + '-' + iconName.replace('_', '-') + '">' +
                                                '<use xlink:href="' + ec_LayoutHelper.getResourceURL('ec_slds') + '/assets/icons/' + iconType + '-sprite/svg/symbols.svg#' + iconName + '"></use>' +
                                            '</svg>';
            }
            html +=                     '</div>' +
                                    '<div class="slds-media__body">' +
                                        '<p class="slds-text-title--caps slds-line-height--reset">' + articleType + '</p>' +
                                            '<h1 class="slds-page-header__title slds-m-right--small slds-align-middle" title="' + Headline.escapeHtml4() + '">' + Headline.escapeHtml4() + '</h1>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';

            html +=         '</div>' +  // .slds-grid
                        '</div>';   // .slds-page-header

            if (String.isNotBlank(LargeImageId)) {
                html += '<figure class="slds-image slds-image--card">' +
                            '<div class="SummaryContent">' +
                                '<p>' +
                                    SummaryContent.escapeHtml4() +
                                '</p>' +
                            '</div>' +
                            '<div class="slds-image__crop slds-image__crop--16-by-9">' +
                                getImageHTML(ImageSize.LARGE, '') +
                            '</div>' +
                        '</figure>';
                }

        html +=     '</a>' +
                '</div>';   // .featured-news-item

        return html;
    }   // getHTML
}