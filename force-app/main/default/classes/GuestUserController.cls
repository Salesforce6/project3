
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
				SELECT Id, FirstName, LastName, Email, Phone, Balance__c, MailingAddress
                FROM Contact 
                WHERE Id = :currentUser.ContactId
                LIMIT 1
            ];


            return contact;
        }
        
        // Return null if no contact is associated with the user
        return null;
    }
    
    @AuraEnabled
    public static void updateContact(Contact contact) {
        update contact;
    }
}