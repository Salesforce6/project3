
public with sharing class GuestUserController {
    @AuraEnabled(cacheable=true)
    public static Contact getContactForUser() {
        // Get the current user's ID
        String currentUserId = UserInfo.getUserId();
        
        // Query the User record to get the Contact ID
        User currentUser = [
            SELECT ContactId 
            FROM User 
            WHERE Id = :currentUserId
            LIMIT 1
        ];
        
        // If the user has a contact associated, fetch the contact details
        if (currentUser.ContactId != null) {
            Contact contact = [
				SELECT Id, FirstName, LastName, Email, Balance__c
                FROM Contact 
                WHERE Id = :currentUser.ContactId
                LIMIT 1
            ];
            return contact;
        }
        
        // Return null if no contact is associated with the user
        return null;
    }
}