public with sharing class TaxonomyAPIRequest extends APIRequest {

    public TaxonomyBundle bundle;
    public Id contentId;
    public Map<String, List<String>> categoriesToAdd;
    public List<TaxonomyBundle> childrenToAdd;

    public TaxonomyAPIRequest() {
        super();
    }

    public override Id getId() {
        if (bundle != null) {
            return this.bundle.tagDefinitionID;
        }
        if (parameters.containsKey('tagDefinitionID')) {
            return parameters.get('tagDefinitionID');
        }
        return this.objectId;
    }

    public Id getTaxonomyId() {
        if (bundle != null) {
            return this.bundle.taxonomyID;
        }
        if (parameters.containsKey('taxonomyID')) {
            return parameters.get('taxonomyID');
        }
        return null;
    }

    public Integer getDepth() {
        if (bundle != null) {
            return this.bundle.depth;
        }
        if (parameters.containsKey('depth')) {
            return Integer.valueOf(parameters.get('depth'));
        }
        return null;
    }

    public String getContentID() {
        if (contentId != null) {
            return this.contentId;
        }
        if (parameters.containsKey('contentID')) {
            return parameters.get('contentID');
        }
        return null;
    }

    public Map<String, String> getLanguageMapOfNames(Map<String, String> availableLanguages) {
        if (bundle != null) {
            return bundle.languageMapOfTagNames;
        }

        Map<String, String> languageCodeToName = new Map<String, String>();

        for (String code : availableLanguages.keySet()) {
            if (parameters.containsKey(code)) {
                languageCodeToName.put(code, parameters.get(code));
            }
        }
        return languageCodeToName;
    }


}