public with sharing class PropertyHelper {
    public PropertyHelper() {}

    @AuraEnabled(cacheable=true)
    public static List<Property__c> getAllPropertiesWithVacancies(){
        try {
            return [SELECT Name, Is_Vacant__c FROM Property__c WHERE Is_Vacant__c = true];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}