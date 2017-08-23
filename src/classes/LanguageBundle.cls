/**
 * Created by mattoskamp on 2016-08-02.
 * LanguageBundle class for API use.
 */

public with sharing class LanguageBundle {
    public String name;
    public String code;
    public Boolean isActive;
    public Boolean allowsFallback;
    public Decimal priority;
    public String description;
}