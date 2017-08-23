global virtual with sharing class ec_PolicySummary extends ec_Policy {
    global ec_PolicySummary() {
    }

    global ec_PolicySummary(cms.CreateContentController cc) {
        super(cc);
    }

    global ec_PolicySummary(cms.GenerateContent gc) {
        super(gc);
    }

    global virtual override String getHTML() {
        String html = '<div class="policySummary slds-m-bottom--small data-container' +
                        '" id="' + cliId +
                        '" data-versionorigin="' + versionOriginId +
                        '" data-content="' + content.Id +
                        '" data-publisheddate="' + originalPublishedStartDateAsString +
                        '" data-pubstartdate="' + publishedStartDateAsString +
                        '" data-detailtemplate="' + detailContentLayout + '">';

            html += '<div class="slds-media slds-no-space slds-grow slds-box">' +
                        '<div class="slds-media__figure">';
                            html += lightningIconMarkup(iconName, iconType);
                html += '</div>';

                html += '<div class="slds-media__body">' +
                            '<p class="slds-text-color--weak slds-text-title--caps">' + policyType.escapeHtml4() + '</p>' +
                            '<h3 class="slds-text-heading--medium"><a href="' + policyDetailLinkString + '" class="ocms-title-taxonomy-detail-link">' + title.escapeHtml4() + '</a></h3>' +
                            '<p class="slds-m-top--small">' + policySummary.escapeHtml4() + '</p>';

                            html += getTagsMarkup();

        // TODO? Should we go to greater lengths if dateEffective is empty? Typically, we expect it always to be filled in, but…?
        String dateInfoString = String.format(Label.ec_Policy_Summary_Date_Message,
                new List<String>{publishedStartDateAsYMD(), String.IsNotBlank(dateEffective) ? dateEffective : '—'});     // that’s an em-dash, friends

                    html += '<p class="slds-m-top--x-small slds-text-color--weak">' + dateInfoString + '</p>';

                html += '</div>'; // .slds-media-body

            html += '</div>';   // .slds-media

        html += '</div>';   // .policySummary

        return html;
    }
}
// ec_PolicySummary.cls