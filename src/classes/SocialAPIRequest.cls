/**
 * Created by danuta on 2017-04-11.
 */

public with sharing class SocialAPIRequest extends APIRequest{

    // List of Actions
    public static String LIKEIT= 'like';
    public static String UNLIKEIT = 'unlike';
    public static String VIEWIT = 'view';
    public static String GET_SOCIALDATA = 'getSocialData';
    public static String GET_MY_SOCIALDATA = 'getMySocialData';
    public static String GET_VIEWED_BY_ME  = 'getViewedByMe';
    public static String GET_LIKED_BY_ME   = 'getLikedByMe';

    // request listParameters
    public static String ORIGIN_IDS = 'originIds';

    // request parameters
    public static String TYPE = 'type';
    public static String LIMIT_COUNT ='limit';

    public static Integer MAX_LIMIT = 5000;

    public enum ITEM_TYPE {
        Media,
        Content,
        Page
    }

}