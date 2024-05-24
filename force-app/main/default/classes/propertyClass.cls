public without sharing class propertyClass {
    public propertyClass() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Property__c> getProperty(){
        try {
            return [SELECT Id, Name FROM Property__c];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<ContentVersion> getImages(String recordId){
        try {
            // return [SELECT ContentDocumentId  FROM ContentDocumentLink where LinkedEntityId =:recordId  and LinkedEntity.Type='Property__c' LIMIT 1];
            List<ContentDocumentLink> cdlList = [SELECT Id, ContentDocument.LatestPublishedVersionId FROM ContentDocumentLink WHERE LinkedEntityId = :recordId];
            Set<String> cdlIdList = new Set<String>();
            for(ContentDocumentLink cdl : cdlList) {
                cdlIdList.add(cdl.ContentDocument.LatestPublishedVersionId);
            }
            Set<String> fileTypes = new Set<String>{'jpg', 'png'};
            return [SELECT VersionDataUrl, FileType FROM ContentVersion WHERE Id IN :cdlIdList AND FileType IN :fileTypes];

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}