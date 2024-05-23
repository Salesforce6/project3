public with sharing class PropertiesHomeController {
    public PropertiesHomeController() {}

    @AuraEnabled(cacheable=true)
    public static List<Property__c> getPopularPropertiesRecords() {
        try {
            // return [SELECT Id, Name, Sqft__c, Beds__c, Bathrooms__c, Description__c, city__c, state__c FROM Property__c ORDER BY Popularity DESC NULLS LAST LIMIT 5];
            return [SELECT Id, Name, Is_Vacant__c, Sqft__c, Beds__c, Bathrooms__c, Description__c, city__c, state__c FROM Property__c WHERE Is_Vacant__C = true LIMIT 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}