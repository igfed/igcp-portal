public class ec_QuickLinksController {

    @AuraEnabled
    public static String renderForLtng(String taxonomyPath, String contentType, String contentLayout, String langCode) {
        return ec_QuickLinksController.renderForLtng(taxonomyPath, contentType, contentLayout, langCode, false);
    }

    @AuraEnabled
    public static String renderForLtng(String taxonomyPath, String contentType, String contentLayout, String langCode, Boolean loadSubscriptions) {
        Map<String, String> siteData = ec_APIHelper.getSiteData();

        Integer depth = 7;
        List<String> tagPaths = new List<String>{taxonomyPath};

        List<List<String>> layoutList = new List<List<String>>{
        };
        for (Integer i = 0; i < depth; i++) {
            layoutList.add(new List<String>{
                    contentLayout
            });
        }

        RenderingAPIRequest renderingRequest = new RenderingAPIRequest();
        renderingRequest.parameters.put('renderType', 'taxonomy');
        renderingRequest.parameters.put('order', 'alpha');
        renderingRequest.listParameters.put('contentTypes', new List<String>{ contentType });
        renderingRequest.listParameters.put('tagPaths', tagPaths);
        renderingRequest.requestFlags.put('targeted', true);
        renderingRequest.layoutsForTaxonomy = layoutList;

        RenderResultBundle resultBundle = ec_APIHelper.getContentByTaxonomy(siteData.get('name'), langCode, renderingRequest);

        Map<String, List<String>> tagRenderingMap = new Map<String, List<String>>();

        if (resultBundle != null) {
            for (RenderResultBundle.RenderedContent renderedContent : resultBundle.renderings) {
                List<String> newRenderings = new List<String>();
                for (String rendering : renderedContent.renderMap.values()) {
                    newRenderings.add(rendering);
                }

                for (String tagPath : renderedContent.tagPaths) {
                    List<String> existingRenderings = tagRenderingMap.get(tagPath);
                    if (existingRenderings == null) existingRenderings = new List<String>();
                    existingRenderings.addAll(newRenderings);
                    tagRenderingMap.put(tagPath, existingRenderings);
                }

            }
        }

        Map<String, List<String>> tabHeadingMap = new Map<String, List<String>>();
        for (String tagPath : tagRenderingMap.keySet()) {
            String parentPath = tagPath.substringBeforeLast('/');
            List<String> headings = tabHeadingMap.get(parentPath);
            if (headings == null) {
                headings = new List<String>();
            }

            String heading = '';
            heading += '<div class="taxonomyMenuSection">';
            heading += '<h2 class="slds-text-heading--medium">' + tagPath.substringAfterLast('/') + '</h2>';
            heading += '<ul>';

            for (String rendering : tagRenderingMap.get(tagPath)) {
                heading += '<li>' + rendering + '</li>';
            }

            heading += '</ul>';
            heading += '</div>';
            headings.add(heading);
            tabHeadingMap.put(parentPath, headings);
        }

        String tabs = '<nav class="ltngTaxonomyMenu tab-head" id="tab-head">';
        String contents = '<section class="ltngTaxonomyMenu tab-contents">';

        String tabName = Label.ec_QuickLinks_Tab_Heading;

        tabs += '<a href="javascript:void(0);" class="tab-head-item" aura:id="tab-head-item" data-tabname="' + tabName.replaceAll(' ', '-') + '">' + tabName + '</a>';

        contents += '<div id="' + tabName.replaceAll(' ', '-') + '" aura:id="' + tabName.replaceAll(' ', '-') + '" class="tab-content-item">';
        List<List<String>> ss = tabHeadingMap.values();
        for (List<String> contentList : ss) {
            for (String content: contentList) {
                contents += content;
            }
        }
        contents += '</div>';

        tabs += '</nav>';
        contents += '</section>';

        Map<String, Object> responseMap = new Map<String, Object>();
        responseMap.put('markup', tabs + contents);
        responseMap.put('siteData', siteData);

        return JSON.serialize(responseMap);
    }

    /* Lightning does not seem to create dependancies on custom labels when referenced in client side code
       referencing them here to ensure they follow along during deploy and/or packaging
     */
    private void requiredCustomLabels() {
        String required = '';
        required = Label.ec_Search_By_Value;
    }

}