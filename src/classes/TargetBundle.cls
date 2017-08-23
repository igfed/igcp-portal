public virtual with sharing class TargetBundle {
    public String targetName;
    public Map<String, Set<String>> filters;
    public String description;
    public String targetType; // Predefined or Ad Hoc
    public String targetKey;
    public DateTime lastModifiedDate;
    public String lastModifiedByName;
}