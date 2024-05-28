public with sharing class PropertiesHomeController {
    public PropertiesHomeController() {}

    @AuraEnabled(cacheable=true)
    public static List<Property__c> getPopularPropertiesRecords() {
        try {
            // return [SELECT Id, Name, Sqft__c, Beds__c, Bathrooms__c, Description__c, city__c, state__c FROM Property__c ORDER BY Popularity DESC NULLS LAST LIMIT 5];
            return [SELECT Id, Name, Is_Vacant__c, Sqft__c, Beds__c, Bathrooms__c, Description__c, City__c, State__c FROM Property__c WHERE Is_Vacant__c = true LIMIT 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}

  // @AuraEnabled(cacheable=true)
    // public static List<PropertyWrapper> getPopularPropertiesRecords() {
    //     try {
    //         List<Property__c> properties = [SELECT Id, Name, Is_Vacant__c, Sqft__c, Beds__c, Bathrooms__c, Description__c, City__c, State__c,
    //                                          (SELECT ContentDocument.Title, ContentDocument.LatestPublishedVersionId FROM ContentDocumentLinks)
    //                                          FROM Property__c 
    //                                          WHERE Is_Vacant__c = true LIMIT 5];
                                             
    //         List<PropertyWrapper> propertyWrappers = new List<PropertyWrapper>();
    //         for (Property__c property : properties) {
    //             String imageUrl = '';
    //             if (property.ContentDocumentLinks != null && !property.ContentDocumentLinks.isEmpty()) {
    //                 imageUrl = '/sfc/servlet.shepherd/version/download/' + property.ContentDocumentLinks[0].ContentDocument.LatestPublishedVersionId;
    //             }
    //             propertyWrappers.add(new PropertyWrapper(property, imageUrl));
    //         }
    //         return propertyWrappers;
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }

    // public class PropertyWrapper {
    //     @AuraEnabled
    //     public Property__c property { get; set; }
    //     @AuraEnabled
    //     public String imageUrl { get; set; }

    //     public PropertyWrapper(Property__c property, String imageUrl) {
    //         this.property = property;
    //         this.imageUrl = imageUrl;
    //     }
    // }