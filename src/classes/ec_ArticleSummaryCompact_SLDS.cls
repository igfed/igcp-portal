global virtual with sharing class ec_ArticleSummaryCompact_SLDS extends ec_Article {
    global ec_ArticleSummaryCompact_SLDS() {
    }

    global ec_ArticleSummaryCompact_SLDS(cms.CreateContentController cc) {
        super(cc);
    }

    global ec_ArticleSummaryCompact_SLDS(cms.GenerateContent gc) {
        super(gc);
    }

    global virtual override String getHTML() {
        String html = '';
        html += openNewsItemSummaryWrapper('slds-tile') +
            '<div class="article-summary-compact slds-tile__detail slds-text-body--small">';
        if (String.isNotBlank(iconName)) {
            String iconClass = 'slds-icon-' + iconType + '-' + iconName.replace('_', '-');
            html += '<svg aria-hidden="true" class="slds-icon ' + iconClass + '">' +
                        '<use xlink:href="' + ec_LayoutHelper.getResourceURL('ec_slds') + '/assets/icons/' + iconType + '-sprite/svg/symbols.svg#' + iconName + '"></use>' +
                    '</svg>';
        }
        html += '<h3><a href="' + articleDetailLinkString + '" class="article-title-compact ocms-title-taxonomy-detail-link">' + Headline.escapeHtml4() + '</a></h3>'+
                '<p>' + SummaryContent.escapeHtml4() + '</p>'+
                '<ul class="slds-list--horizontal slds-has-dividers--right slds-tile__meta">'+
                    '<li class="slds-item"><div class="timeSincePublished"></div></li>'+
                '</ul>'+
            '</div>'+
        '</div>';
        
        return html;   
    }
}