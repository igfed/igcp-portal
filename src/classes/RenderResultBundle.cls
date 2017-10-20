/**
 * Created by mattoskamp on 2016-10-19.
 * This class is used to deserialize the results from the Rendering API V4
 */

public with sharing class RenderResultBundle {
    public String message;
    public Boolean contentRemaining = false;
    public List<RenderedContent> renderings;
    public List<RenderedPage> pageRenderings;

    public class RenderedContent {
        public Id originId;
        public Id contentId;
        public String message;
        public ContentBundle contentBundle;
        public Map<String, String> renderMap; // Layout Name => Rendering
        public List<String> tagPaths;
    }

    public class RenderedPage {
        public String rendering;
        public String url;
        public String name;
    }
}