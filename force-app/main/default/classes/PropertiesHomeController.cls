public with sharing class PropertiesHomeController {
    public PropertiesHomeController() {}

    @AuraEnabled(cacheable=true)
    public static List<PropertyWrapper> getPopularPropertiesRecords() {
        try {
            
            List<Property__c> properties = [SELECT Id, Name, Is_Vacant__c, Sqft__c, Beds__c, Bathrooms__c, Description__c, City__c, State__c 
                                            FROM Property__c WHERE Is_Vacant__c = true LIMIT 5];

            // Create wrapper to include image with property
            List<PropertyWrapper> propertyWrappers = new List<PropertyWrapper>();

            for(Property__c property : properties) {
                PropertyWrapper pw = new PropertyWrapper();
                pw.property = property;
            
                // Grab the image for this property and add to property wrapper
                List<ContentVersion> images = getImages(property.Id);
                if(!images.isEmpty()) {
                    pw.imageUrl = images[0].VersionDataUrl;
                }
    
                propertyWrappers.add(pw);
            }
            return propertyWrappers;

        } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
        }
    }

    // grab list of images that has been saved in the File object related to Property__c
    @AuraEnabled(cacheable=true)
    public static List<ContentVersion> getImages(String propertyId){
        try {
            List<ContentDocumentLink> cdlList = [SELECT Id, ContentDocument.LatestPublishedVersionId FROM ContentDocumentLink WHERE LinkedEntityId = :propertyId];
            Set<String> cdlIdList = new Set<String>();
            for(ContentDocumentLink cdl : cdlList) {
                cdlIdList.add(cdl.ContentDocument.LatestPublishedVersionId);
            }
            Set<String> fileTypes = new Set<String>{'jpg', 'png'};
            return [SELECT VersionDataUrl, FileType FROM ContentVersion WHERE Id IN :cdlIdList AND FileType IN :fileTypes AND MainImage__c = true];

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public class PropertyWrapper {
        @AuraEnabled public Property__c property {get; set; }
        @AuraEnabled public String imageUrl {get; set;}
    }
}
