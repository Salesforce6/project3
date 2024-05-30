import { LightningElement, api, wire, track } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import PropertyObject from '@salesforce/schema/Property__c';
import NameField from '@salesforce/schema/Property__c.Name'
import PetsField from '@salesforce/schema/Property__c.Pets__c'
import StateField from '@salesforce/schema/Property__c.State__c'
import StreetField from '@salesforce/schema/Property__c.Street_Address__c'
import ZipCodeField from '@salesforce/schema/Property__c.Zip_Code__c'
import DescriptionField from '@salesforce/schema/Property__c.Description__c'
import CityField from '@salesforce/schema/Property__c.City__c'
import BedField from '@salesforce/schema/Property__c.Beds__c'
import BathroomField from '@salesforce/schema/Property__c.Bathrooms__c'
import SqftField from '@salesforce/schema/Property__c.Sqft__c'
import PriceField from '@salesforce/schema/Property__c.Rent__c';


export default class propertyDetailPage extends LightningElement {  
    @api
    recordId;
    @track
    currentPageReference;
    
    objectApiName = PropertyObject;
    fields = {
        name: NameField.fieldApiName,
        pets: PetsField.fieldApiName,
        state: StateField.fieldApiName,
        street: StreetField.fieldApiName,
        zipCode: ZipCodeField.fieldApiName,
        description: DescriptionField.fieldApiName,
        city: CityField.fieldApiName,
        beds: BedField.fieldApiName,
        bath:BathroomField.fieldApiName,
        sqft:SqftField.fieldApiName,
        price:PriceField.fieldApiName,
    }
    
    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        this.currentPageReference = currentPageReference;
    }
    connectedCallback() {
        this.recordId = this.currentPageReference?.state?.c__recordId;
    } 


}