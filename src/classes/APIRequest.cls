/********************************************************************************************
	 *  Generic class used to represent a request to the API.
	 *
	 ****/
public virtual class APIRequest {

    public static String NODATA = 'noData';
    public static String ALLDATA = 'allData';
    public static final String FOR_EDIT = 'forEdit';
    public static final String UNPUBLISHED = 'unpublished';
    public static final String LATEST = 'latest';
    public static final String PUBLISHED = 'published';
    public static String LOCK = 'lock';
    public ID objectId { get; set; }
    public String transactionId { get; set; }
    /****
     *  Request flags - indicators of data the api shoud refresh and return. If the request included a bundle and any flag other then
     *					noData is specified, that data will be re-queried from the data base and the updated in the supplied bundle.
     *					Any data in the bundle that was not requested will be returned to the caller as supplied:
     *
     *	versions 	-Retrieve Content data and the list of content versions. - Default FALSE
     *  layouts 	-Retrieve ContentLayoutInstance data. -  Default TRUE
     * 	attributes 	-Retrieve attributes.  Content layout attributes only retrieved if layouts are true
     *  allData		-Retrieve ALL data on the content incuding attributes, versions and content data.
     *	noData		-Return only a success/failure indicator  - Default unless specified by the API call
     */
    public Map<String, Boolean> requestFlags { get; set; }
    /***
     *Map containing request parameters that are single items. (EX: String VersionString)
     */
    public Map<String, String> parameters { get; set; }
    /***
     *Map containing request parameters that include lists of items. (EX: List<String> Languages)
     */
    public Map<string, List<String>> listParameters { get; set; }

    public APIRequest() {
        this.requestFlags = new Map<String, Boolean>();
        this.parameters = new Map<String, String>();
        this.listParameters = new Map<String, List<String>>();
    }

    public virtual ID getID() {
        return(this.objectId);
    }

    
}