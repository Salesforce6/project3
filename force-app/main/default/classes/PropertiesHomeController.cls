public with sharing class PropertiesHomeController {
    public PropertiesHomeController() {}

    @AuraEnabled(cacheable=true)
    public static List<Properties> getPopularPropertiesRecords() {
        try {
            // return [SELECT Id, Name, Sqft__c, Beds__c, Bathrooms__c, Description__c, city__c, state__c FROM Property__c ORDER BY Popularity DESC NULLS LAST LIMIT 5];
            return [SELECT Id, Name, Sqft__c, Beds__c, Bathrooms__c, Description__c, city__c, state__c FROM Property__c LIMIT 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}