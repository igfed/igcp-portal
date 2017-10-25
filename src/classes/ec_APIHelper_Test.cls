@isTest
public with sharing class ec_APIHelper_Test {
    static testMethod void test_siteBundle() {
        SiteBundleResposne sbr = new SiteBundleResposne('SiteAPI');
        sbr.bundle.siteName = 'Employee_Community';
        sbr.bundle.siteSecureUrl = 'https://www.theonion.com';

        sbr.addMockResponse();

        SiteBundle sb = ec_APIHelper.getSiteBundle('SiteName');

        System.assertEquals('Employee_Community', sb.siteName, 'Expecting Employee_Community got: ' + sb.siteName);
        System.assertEquals('https://www.theonion.com', sb.siteSecureUrl, 'Expecting https://www.theonion.com got: ' + sb.siteSecureUrl);

        sbr.bundle.siteName = 'SiteName';
        sbr.bundle.siteSecureUrl = 'https://www.theonion.com';
        sbr.bundle.siteId = getFakeId(cms__Sites__c.SObjectType);
        sbr.bundle.siteLabel = 'SiteLabel';
        sbr.bundle.sitePrefix = 'https://';

        sbr.addMockResponse();

        ec_APIHelper.getSiteData('SiteName');
    }

    static testMethod void test_APIHelper() {
        SiteBundleResposne sbr = new SiteBundleResposne('SiteAPI');
        sbr.bundle.siteName = 'Employee_Community';
        sbr.bundle.siteSecureUrl = 'https://www.theonion.com';

        sbr.addMockResponse();

        RenderResultBundleResposne rrbr = new RenderResultBundleResposne('OrchestraRenderingAPI');
        rrbr.setContentType('SampleContentType');
        rrbr.addContentRenderings('Sample Renderings');

        rrbr.addMockResponse();
        String getRenderFromContentName = ec_APIHelper.getRenderFromContentName('Dummy Name', new List<String>{'DummyLayout'}, false, 'Dummy Site', 'Dummy Language', false);

        sbr.addMockResponse();
        rrbr.addMockResponse();
        String getContentsByType = ec_APIHelper.getContentsByTypeFirstRendering('Dummy Site', new List<String>{'DummyType'}, new List<String>{'DummyLayout'}, 'DummyOrder', false, 'Dummy Language', 10);

        sbr.addMockResponse();
        rrbr.addMockResponse();
        String getRenderFromOriginId = ec_APIHelper.getRenderFromOriginId('DummyOriginId', new List<String> {'DummyLayout'}, 'Dummy Site', 'Dummy Language');

        sbr.addMockResponse();
        rrbr.addMockResponse();
        String getRenderFromOriginIds = ec_APIHelper.getRenderFromOriginIds(new List<String>{'DummyOriginId'}, new List<String>{'DummyLayout'}, true, 'Dummy Site', 'Dummy Language', 'Dummy Order', 100);

    }

    static testMethod void test_ContentBundle() {
        ContentTypeBundleResponse cbr = new ContentTypeBundleResponse('ContentAPI');
        cbr.addMockResponse();

        ec_APIHelper.getContentTypeByName('Testing', 'Testing', 'Dummy Language');
    }

    public virtual class MockResponse {
        private String responseType;
        private Boolean success = true;

        public MockResponse(String type) {
            responseType = type;
        }

        public void setSuccess(Boolean success) {
            this.success = success;
        }

        public void addMockResponse() {
            JSONMessage.APIResponse response = new JSONMessage.APIResponse();
            response.type = getResponseType();
            response.responseObject = getResponseObject();
            response.message = 'message';
            response.isSuccess = success;

            System.debug(JSON.serialize(response));

            cms.ServiceEndpoint.addMockResponse(responseType, JSON.serialize(response));
        }

        private virtual String getResponseObject() {
            return '';
        }

        private virtual String getResponseType() {
            return '';
        }
    }

    public class SiteBundleResposne extends ec_APIHelper_Test.MockResponse {
        public SiteBundle bundle = new SiteBundle();

        public SiteBundleResposne(String type) {
            super(type);
        }

        private override String getResponseType() {
            return 'SiteBundle';
        }

        private override String getResponseObject() {
            return JSON.serialize(bundle);
        }
    }

    public class TaxonomyBundleResponse extends ec_APIHelper_Test.MockResponse {
        public List<TaxonomyBundle> bundles;
        public TaxonomyBundle bundle;

        public TaxonomyBundleResponse(String type) {
            super(type);
        }

        public void setBundle(String taxonomyName) {
            bundle = new TaxonomyBundle();
            bundle.languageMapOfTagNames = new Map<String, String>{'en_US' => taxonomyName};
        }

        public void addToBundles(String taxonomyName) {
            if (bundles == null) {
                bundles = new List<TaxonomyBundle>();
            }

            TaxonomyBundle tb = new TaxonomyBundle();
            tb.languageMapOfTagNames = new Map<String, String>{'en_US' => taxonomyName};
            bundles.add(tb);
        }

        private override String getResponseType() {
            return 'TaxonomyBundle';
        }

        private override String getResponseObject() {
            String response = '';

            if (bundle != null) {
                response = JSON.serialize(bundle);
            } else if (!bundles.isEmpty()) {
                response = JSON.serialize(bundles);
            }

            return response;
        }
    }

    public class ContentBundleResponse extends ec_APIHelper_Test.MockResponse {
        public ContentBundle bundle = new ContentBundle();

        public ContentBundleResponse(String type) {
            super(type);
            bundle.contentType = new ContentTypeBundle();
        }

        private override String getResponseType() {
            return 'ContentBundle';
        }

        private override String getResponseObject() {
            return JSON.serialize(bundle);
        }
    }

    public class ContentTypeBundleResponse extends ec_APIHelper_Test.MockResponse {
        public List<ContentTypeBundle> bundle = new List<ContentTypeBundle>();

        public ContentTypeBundleResponse(String type) {
            super(type);
            bundle = new List<ContentTypeBundle>();
            bundle.add(new ContentTypeBundle());
        }

        private override String getResponseType() {
            return 'ContentBundle';
        }

        private override String getResponseObject() {
            return JSON.serialize(bundle);
        }
    }

    public class FilteringAPIResponse extends ec_APIHelper_Test.MockResponse {
        public FilteringBundle bundle = new FilteringBundle();

        public FilteringAPIResponse(String type) {
            super(type);
            bundle.contentBundles = new Map<Id,ContentBundle>();
        }

        public void createContentBundle() {
            ContentBundle cb = new ContentBundle();
            bundle.contentBundles.put(getFakeId(cms__Content__c.SObjectType), cb);
        }

        private override String getResponseType() {
            return 'FilteringBundle';
        }

        private override String getResponseObject() {
            return JSON.serialize(bundle);
        }
    }

    public class RenderResultBundleResposne extends ec_APIHelper_Test.MockResponse {
        public RenderResultBundle bundle = new RenderResultBundle();
        private String contentType = '';
        private List<String> tagPaths;

        public RenderResultBundleResposne(String type) {
            super(type);
            bundle = createRenderResultResponse();
        }

        private override String getResponseType() {
            return 'RenderResultBundle';
        }

        // Allow the author of the test to set a content type to be used for all the rendering setting.
        public void setContentType(String contentType) {
            this.contentType = contentType;
        }

        // Allow the author of the test to set a content type to be used for all the rendering setting.
        public void setTagPaths(List<String> tagPaths) {
            this.tagPaths = tagPaths;
        }

        private override String getResponseObject() {
            if (bundle.renderings.isEmpty()) {
                addContentRenderings('test');
            }

            return JSON.serialize(bundle);
        }

        private RenderResultBundle createRenderResultResponse() {
            RenderResultBundle rrb = new RenderResultBundle();
            rrb.message = 'Test Rendered Result';
            rrb.renderings = new List<RenderResultBundle.RenderedContent>();

            return rrb;
        }


        public void addContentRenderings(Map<String,String> renderingMap) {
            String ct = (String.isEmpty(contentType) ? 'TestContentLayout' : contentType);

            RenderResultBundle.RenderedContent rc = new RenderResultBundle.RenderedContent();
            rc.contentId = getFakeId(cms__Content__c.SObjectType);
            rc.renderMap = renderingMap;
            rc.tagPaths = tagPaths;

            bundle.renderings.add(rc);
        }

        public void addContentRenderings(List<String> renderings) {
            String ct = (String.isEmpty(contentType) ? 'TestContentLayout' : contentType);

            RenderResultBundle.RenderedContent rc = new RenderResultBundle.RenderedContent();
            rc.contentId = getFakeId(cms__Content__c.SObjectType);
            rc.renderMap = new Map<String, String>();
            rc.tagPaths = tagPaths;

            for (String rendering : renderings) {
                rc.renderMap.put(ct, rendering);
            }

            bundle.renderings.add(rc);
        }

        public void addContentRenderings(String rendering) {
            String ct = (String.isEmpty(contentType) ? 'TestContentLayout' : contentType);

            RenderResultBundle.RenderedContent rc = new RenderResultBundle.RenderedContent();
            rc.contentId = getFakeId(cms__Content__c.SObjectType);
            rc.renderMap = new Map<String, String>{ct => rendering};
            rc.tagPaths = tagPaths;

            bundle.renderings.add(rc);
        }
    }

    public class SocialBundleResponse extends ec_APIHelper_Test.MockResponse {
        public Map<String, SocialBundle> bundle = new Map<String, SocialBundle>();

        public SocialBundleResponse(String type) {
            super(type);
        }

        public void createSocialBundle() {
            SocialBundle sb = new SocialBundle();
            sb.originId = getFakeId(cms__Content__c.SObjectType);
            sb.socialID = getFakeId(cms__SocialData__c.SObjectType);
            sb.likes = 0;
            sb.views = 0;
            sb.socialActivity = new SocialActivity();

            bundle.put(sb.originId, sb);
        }

        private override String getResponseType() {
            return 'SocialBundle';
        }

        private override String getResponseObject() {
            return JSON.serialize(bundle);
        }
    }

    private static Integer counter = 0;

    public static String getFakeId(Schema.SObjectType sot) {
        return getFakeId(sot, counter++);
    }

    public static String getFakeId(Schema.SObjectType sot, Integer nCount) {
        String result = String.valueOf(nCount);
        return sot.getDescribe().getKeyPrefix() + '0'.repeat(12-result.length()) + result;
    }
}