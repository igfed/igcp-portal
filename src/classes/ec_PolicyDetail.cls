global virtual with sharing class ec_PolicyDetail extends ec_Policy {
    global ec_PolicyDetail() {
    }

    global ec_PolicyDetail(cms.CreateContentController cc) {
        super(cc);
    }

    global ec_PolicyDetail(cms.GenerateContent gc) {
        super(gc);
    }


    String policyHeader() {
        String hdr = '<header>';

        if (String.isNotBlank(logo)) {
            hdr += '<div class="logo_c slds-m-bottom--xx-large"><img src="' + logo + '" alt="" /></div>';
        }

        hdr += '<div class="slds-media slds-m-bottom--x-large">';
            hdr += '<div class="slds-media__figure">' + lightningIconMarkup(iconName, iconType, 'large') + '</div>';

            hdr += '<div class="slds-media__body">';
                hdr += '<p class="slds-text-color--weak slds-text-title--caps">' + policyType.escapeHtml4() + '</p>';

                hdr += '<div class="slds-grid slds-grid--align-spread">';
                    hdr += '<h1 class="slds-text-heading--large">' + title + '</h1>';

                    hdr += '<a href="javascript:history.back();" class="backButton slds-button slds-button--icon-border slds-m-left--small slds-shrink-none" aria-live="assertive">' +
                        '<svg aria-hidden="true" class="slds-button__icon">' +
                            '<use xlink:href="' + ec_LayoutHelper.getResourceURL('ec_slds') + '/assets/icons/utility-sprite/svg/symbols.svg#back"></use>' +
                        '</svg>' +
                        '<span>' + backButton.escapeHtml4() + '</span>' +
                    '</a>';
                hdr += '<div class="subscribeButton"></div>';
                hdr += '</div>';

                hdr += getTagsMarkup();
            hdr += '</div>';    // .slds-media__body
        hdr += '</div>';    // .slds-media

        hdr += '</header>';

        return hdr;
    }   // policyHeader


    String policyMeta() {
        /**
            - for each of these bit of metadata (content attributes), if the data is blank, no label or data is shown

            published       effective           last reviewed               scheduled review date

            supersedes
            approved by
         */

        String meta = '<section class="policyMetadata slds-p-bottom--large">';      // must use padding due to collapsing margins

        if (String.isNotBlank(dateEffective + dateLastReview + dateScheduledReview)) {
            meta += '<div class="slds-grid slds-wrap slds-m-bottom--small">';

            meta += '<div class="slds-size--1-of-1 slds-m-bottom--x-small slds-large-size--1-of-4">' + (
                        content.cms__Published_Start_Date__c != null
                            ? '<h3 class="slds-text-color--weak slds-text-title">' + Label.ec_Policy_Detail_Published_Date_Label + '</h3>' + publishedStartDateAsYMD()
                            : ''
                        ) +
                    '</div>';

            meta += '<div class="slds-size--1-of-1 slds-m-bottom--x-small slds-large-size--1-of-4">' + (
                        String.isNotBlank(dateEffective)
                            ? '<h3 class="slds-text-color--weak slds-text-title">' + Label.ec_Policy_Detail_Effective_Date_Label + '</h3>' + dateEffective
                            : ''
                        ) +
                    '</div>';

            meta += '<div class="slds-size--1-of-1 slds-m-bottom--x-small slds-large-size--1-of-4">' + (
                        String.isNotBlank(dateLastReview)
                                ? '<h3 class="slds-text-color--weak slds-text-title">' + Label.ec_Policy_Detail_Last_Review_Date_Label + '</h3>' + dateLastReview
                                : ''
                         ) +
                    '</div>';

            meta += '<div class="slds-size--1-of-1 slds-m-bottom--x-small slds-large-size--1-of-4">' + (
                        String.isNotBlank(dateScheduledReview)
                                ? '<h3 class="slds-text-color--weak slds-text-title">' + Label.ec_Policy_Detail_Scheduled_Review_Date_Label + '</h3>' + dateScheduledReview
                                : ''
                         ) +
                    '</div>';

            meta += '</div>';   // .slds-grid
        }

        if (String.isNotBlank(supersedes)) {
            meta += '<p class="slds-m-vertical--xx-small">' +
                        '<span class="slds-text-color--weak slds-text-title--caps slds-p-right--small">' + Label.ec_Policy_Detail_Supersedes_Label + '</span>' +
                        supersedes +
                    '</p>';
        }

        if (String.isNotBlank(approvedBy)) {
            meta += '<p class="slds-m-vertical--xx-small">' +
                        '<span class="slds-text-color--weak slds-text-title--caps slds-p-right--small">' + Label.ec_Policy_Detail_Approved_By_Label + '</span>' +
                        approvedBy +
                    '</p>';
        }

        meta += '</section>';

        return meta;
    }   // policyMeta


    String policySection(String theTitle, String theBody) {
        String markup = '';

        // we allow body without title, but no title without body
        if (String.isNotBlank(theBody)) {
            markup += '<section class="slds-text-longform">';

            if (String.isNotBlank(theTitle)) {
                markup += '<h2 class="slds-text-title--caps slds-section__title slds-m-top--large">' + theTitle.escapeHtml4() + '</h2>';
            }

            markup += theBody + '</section>';
        }

        return markup;
    }   // policySection


    global virtual override String getHTML() {
        String html = '<div class="policyDetail slds-m-bottom--xx-large' +
                '" id="' + cliId +
                '" data-versionorigin="' + versionOriginId +
                '" data-content="' + content.Id +
                '" data-publisheddate="' + originalPublishedStartDateAsString +
                '" data-pubstartdate="' + publishedStartDateAsString +
                '">';

        // optional page logo
        // lightning logo, policyType, title
        html += policyHeader();

        // associated dates, supersedes, approved by
        html += policyMeta();

        html += policySection(section1Title, section1Body);
        html += policySection(section2Title, section2Body);
        html += policySection(section3Title, section3Body);
        html += policySection(section4Title, section4Body);

        html += '</div>';   // .policyDetail

        return html;
    }   // getHTML
}
// ec_PolicyDetail.cls