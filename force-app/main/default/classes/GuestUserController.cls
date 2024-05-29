public with sharing class GuestUserController {
    @AuraEnabled(cacheable=true)
    public static User getGuestUserInfo() {
        try {
            // Query the User object to get the guest user details
            String UserId = UserInfo.getUserId();
            User guestUser = [
                SELECT Id, Username, Email, LastLoginDate, Contact.Balance__c
                FROM User 
                WHERE Id = :UserId
                LIMIT 1
            ];
            return guestUser;
        } catch (Exception e) {
            throw new AuraHandledException('Error retrieving guest user information: ' + e.getMessage());
        }
    }
}