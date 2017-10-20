public with sharing class TargetingAPIRequest extends APIRequest {
    public List<TargetBundle> bundles;
    public Id contentId;

    public TargetingAPIRequest() {
        super();
    }

    public TargetingAPIRequest(List<TargetBundle> bundles) {
        super();
        this.bundles = bundles;
    }

    public List<TargetBundle> getTargetBundles() {
        return bundles;
    }

    public Id getContentId() {
        return contentId;
    }
}