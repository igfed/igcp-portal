global virtual with sharing class ec_ArticleDetail_SLDSFigure extends ec_Article {
    global ec_ArticleDetail_SLDSFigure() {
    }

    global ec_ArticleDetail_SLDSFigure(cms.CreateContentController cc) {
        super(cc);
    }

    global ec_ArticleDetail_SLDSFigure(cms.GenerateContent gc) {
        super(gc);
    }

    global virtual override String getHTML() {
        String html = '';
        html += '<div class="news-item article-detail article-detail-basic" ' +
                    'data-versionorigin="' + versionOriginId + '" data-content="' + content.Id + '" id="' + cliId + '" ' +
                    'data-publisheddate="' + originalPublishedStartDateAsString + '" data-pubstartdate="' + publishedStartDateAsString + '">';

        html +=     '<div class="slds-page-header" role="banner">' +
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
                                        '<p class="slds-text-title--caps slds-line-height--reset">' + articleType.escapeHtml4() + '</p>' +
                                        '<h1 class="slds-page-header__title slds-m-right--small slds-align-middle">' + Headline.escapeHtml4() + '</h1>' +
                                        // readable time since last published. filled in with javascript.
                                        '<span class="formattedPublishDate slds-text-body--small"></span>' +
                                        getTagsMarkup() +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="slds-col slds-no-flex slds-grid slds-align-top">' +
                                '<a href="javascript:history.back();" class="backButton slds-button slds-button--icon-border" aria-live="assertive">' +
                                    '<svg aria-hidden="true" class="slds-button__icon">' +
                                        '<use xlink:href="' + ec_LayoutHelper.getResourceURL('ec_slds') + '/assets/icons/utility-sprite/svg/symbols.svg#back"></use>' +
                                    '</svg>' +
                                    '<span>' + Label.ec_Detail_View_Back_Button_Text + '</span>' +
                                '</a>' +
                                '<button class="likeButton slds-button slds-button--icon-border" aria-live="assertive" title="Like" data-versionorigin="' + versionOriginId + '">' +
                                    '<svg aria-hidden="true" class="slds-button__icon">' +
                                        '<use xlink:href="' + ec_LayoutHelper.getResourceURL('ec_slds') + '/assets/icons/utility-sprite/svg/symbols.svg#like"></use>' +
                                    '</svg>' +
                                    '<span class="slds-assistive-text">' + Label.ec_TaxonomyLoader_Like + '</span>' +
                                    '<span class="likeCount">0</span>' +
                                '</button>' +
                            '</div>' +
                            '<div class="subscribeButton"></div>'+
                        '</div>' +
                    '</div>';

        if (String.isNotBlank(LargeImageId)) {
            html += '<figure class="slds-image slds-image--card">' +
                        '<div class="slds-image__crop slds-image__crop--16-by-9">' +
                            getImageHTML(ImageSize.LARGE, '') +
                        '</div>' +
                        '<figcaption class="slds-image__title slds-image__title--card">' +
                            '<span class="slds-image__text slds-truncate">' + TitleImageText + '</span>' +
                        '</figcaption>' +
                    '</figure>';
        }

        html +=     '<div class="article-text">' +
                        htmlContent +
                    '</div>';

        html += '</div>';

        return html;
    }   // getHTML
}