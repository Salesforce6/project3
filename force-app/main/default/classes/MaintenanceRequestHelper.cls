public with sharing class MaintenanceRequestHelper {
    public MaintenanceRequestHelper() {

    }

    @AuraEnabled(cacheable=true)
    public static String getUserInfo() {
        String loggedUserId = UserInfo.getUserId();
        User userInfo = [SELECT contactId FROM User WHERE Id = :loggedUserId];

        Contact c = [SELECT Id FROM Contact WHERE Id = :userInfo.ContactId LIMIT 1];

        return c.Id;
    }
}