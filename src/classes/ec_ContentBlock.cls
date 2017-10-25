global virtual with sharing class ec_ContentBlock extends cms.ContentTemplateController {
    global ec_ContentBlock() {
        super();
    }

    // constructor for content editor
    global ec_ContentBlock(cms.CreateContentController cc) {
        super(cc);
    }

    global ec_ContentBlock(cms.GenerateContent gc){
        super(gc);
    }

    /**
     * @description content generator
     * @return {String} html markup
     */
    global virtual override String getHTML() {
        String html = '';

        if (blockType == 'list') {
            html += '<div class="contentBlock slds-box">';
            if (String.isNotBlank(calloutHeading)) {
                html += '<h4 class="contentBlockHeading slds-text-title--caps">' + calloutHeading + '</h4>';
            }
            html +=     '<div class="contentBlockInner">' +
                            contentListMarkup +
                        '</div>' +
                    '</div>';
        } else if (blockType == 'slider') {
            String sliderTimeInMs = '0';
            if (sliderTime == 'disabled') sliderTimeInMs = '0';
            else if (sliderTime == 'slow') sliderTimeInMs = '10000';
            else if (sliderTime == 'fast') sliderTimeInMs = '5000';

            html += '<div class="contentBlock">';
            if (String.isNotBlank(calloutHeading)) {
                html += '<h4 class="contentBlockHeading">' + calloutHeading + '</h4>';
            }

            // slds-page-header class added solely to get the same background colour used within a sliderItem for its text
            html +=     '<div class="contentBlockInner sliderContainer slds-page-header" data-slidertime="' + sliderTimeInMs + '">' +
                            '<div class="sliderScrollContainer slds-box">'+
                                contentListMarkup +
                            '</div>'+
                            '<button class="sliderScrollButton sliderScrollButtonLeft">' +
                                '<svg aria-hidden="true" class="slds-icon slds-icon-utility">' +
                                    '<use xlink:href="' + ec_LayoutHelper.getResourceURL('ec_slds') + '/assets/icons/utility-sprite/svg/symbols.svg#chevronleft"></use>' +
                                '</svg>' +
                            '</button>' +
                            '<button class="sliderScrollButton sliderScrollButtonRight">' +
                                '<svg aria-hidden="true" class="slds-icon slds-icon-utility">' +
                                    '<use xlink:href="' + ec_LayoutHelper.getResourceURL('ec_slds') + '/assets/icons/utility-sprite/svg/symbols.svg#chevronright"></use>' +
                                '</svg>' +
                            '</button>'+
                        '</div>' +
                    '</div>';
        } else if (blockType == 'gallery') {
           html += '<div class="contentBlock">';
            if (String.isNotBlank(calloutHeading)) {
                html += '<h4 class="contentBlockHeading">' + calloutHeading + '</h4>';
            }
            html +=     '<div class="contentBlockInner">' +
                            galleryListMarkup +
                        '</div>' +
                   '</div>';

        }

        return html;
    }

    private String contentListMarkup {
        get {
            List<String> origIdList = new List<String>();
            List<String> layoutList = new List<String>();
            List<String> renderList = new List<String>();
            Map<String, Map<String, String>> originRenderings = new Map<String, Map<String, String>>();

            if (String.isNotBlank(contentIds) && String.isNotBlank(contentLayouts)) {
                origIdList = contentIds.split(',');
                layoutList = contentLayouts.split(',');
            } else return '';

            RenderingAPIRequest renderingRequest = new RenderingAPIRequest();
            renderingRequest.parameters.put('renderType', 'originId');
            renderingRequest.listParameters.put('originIds', origIdList);
            renderingRequest.listParameters.put('contentLayouts', layoutList);
            renderingRequest.requestFlags.put('targeted', !ignoreTargeting);

            Map<String, String> params = new Map<String, String>();
            params.put('renderingRequest', JSON.serialize(renderingRequest));
            params.put('action', 'getRenderedContent');
            params.put('service', 'OrchestraRenderingAPI');
            params.put('apiVersion', ec_APIHelper.ORCHESTRACMS_API_VERSION);
            params.put('runtime', ec_APIHelper.ORCHESTRACMS_API_RUNTIME);
            params.put('page_mode', 'production');

            String response = cms.ServiceEndpoint.doActionApex(params);

            JSONMessage.APIResponse apiResponse = (JSONMessage.APIResponse)
                    JSON.deserialize(response, JSONMessage.APIResponse.class);

            String result = '';

            if (apiResponse.isSuccess) {
                RenderResultBundle resultBundle = (RenderResultBundle)
                        JSON.deserialize(apiResponse.responseObject, RenderResultBundle.class);
                for (RenderResultBundle.RenderedContent renderedContent : resultBundle.renderings) {
                    originRenderings.put(renderedContent.originId, renderedContent.renderMap);
                }
            }

            // I use the original id list so that we can have duplicate content appearing (api calls don't return dupes)
            Integer i = 0; // index to match origIdList and layoutList
            for (String id : origIdList) {
                String layout = layoutList[i];
                String rendering = '';
                if (originRenderings.get(id) != null) {
                    rendering = originRenderings.get(id).get(layout);
                }

                renderList.add(rendering);
                i++;
            }

            return String.join(renderList, '');
        }
    }

    private String galleryListMarkup {
        get {
            List<String> urlList = new List<String>();
            List<String> capList = new List<String>();

            List<String> imgList = new List<String>();
            List<String> thumbList = new List<String>();

            try {
                if (String.isNotBlank(galleryImages) && String.isNotBlank(galleryCaptions)) {
                    urlList = (List<String>) JSON.deserialize(galleryImages, List<String>.class);
                    capList = (List<String>) JSON.deserialize(galleryCaptions, List<String>.class);
                }
            } catch(Exception e) {
                return '';
            }

            Integer i = 0;
            for (String url : urlList) {
                String caption = capList.get(i);

                String id = 'gallery' + page_content_layout_instance.Id + '-img' + i;
                String active = (i == 0) ? 'active' : '';
                String image =  '<li id="' + id + '" class="gallery-img tab-content ' + active + '">' +
                                    '<img src="' + url + '" alt="">' +
                                    '<span class="gallery-img-caption">' + caption + '</span>' +
                                '</li>\n';

                String button = '<button data-tab-id="' + id + '" class="gallery-thumb tab-head-item ' + active + '" style="background-image: url(' + url + ');"></button>\n';

                imgList.add(image);
                thumbList.add(button);

                i++;
            }

            String html = '';
            html += '<div class="gallery-container">' +
                        '<ul class="gallery-img-container">' +
                            String.join(imgList, '') +
                        '</ul>' +
                        '<nav class="gallery-thumb-container scroll-container tab-head">' +
                            String.join(thumbList, '') +
                        '</nav>' +
                        '<nav class="scroll-container-nav scrolled-left">' +
                            '<button class="btn-scroll btn-scroll-left">' + 'Scroll Left' + '</button>' +
                            '<button class="btn-scroll btn-scroll-right">' + 'Scroll Right' + '</button>' +
                        '</nav>' +
                    '</div>';

            return html;
        }
    }

    /**
     *  Getters / Setters for Orchestra content generator
     */

    public String calloutHeading {
        get {
            String prop = getProperty('calloutHeading');
            return (String.isNotBlank(prop)) ? prop : '';
        }
        set;
    }

    public String blockType {
        get {
            return getProperty('blockType');
        }
        set;
    }

    public String contentIds {
        get {
            return getProperty('contentIds');
        }
        set;
    }

    public String contentLayouts {
        get {
            return getProperty('contentLayouts');
        }
        set;
    }

    public String galleryImages {
        get {
            return getProperty('galleryImages');
        }
        set;
    }

    public String galleryCaptions {
        get {
            return getProperty('galleryCaptions');
        }
        set;
    }

    public String sliderTime {
        get {
            return getProperty('sliderTime');
        }
        set;
    }

    public Boolean ignoreTargeting {
        get {
            return (getProperty('ignoreTargeting') == 'true' ? true : false);
        }
    }

}