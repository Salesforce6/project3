import { LightningElement, wire } from 'lwc';
import getPopularPropertiesRecords from '@salesforce/apex/PropertiesHomeController.getPopularPropertiesRecords';
// import propertyImg from '@salesforce/resourceUrl/nameOfImg';
import { NavigationMixin } from 'lightning/navigation';

export default class PropertyHome extends NavigationMixin(LightningElement) {

    propertiesToDisplay;
    // sfiage  = propertyImg;

    @wire(getPopularPropertiesRecords)
    GetPropertiesHandler(response) {
        // {error, data}
        // Case 1:  {error: undefined, data: ...}
        // Case 2: {error: ..., data: undefined}

        const {data, error } = response; //destructuring
        // same as data = response.data
        // error = repsonse.error
        if(error) {
            console.error(error);
            return;
        } 
        if(data) {
            this.propertiesToDisplay = data;
        }
    }

    navToPropertyPage(e) {

        // the name Residence_Viewer__c needs to correspond with
        // the api name of the page made in experience builder
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Property_Detail__c',
            },
            state: {
                c__recordId: e.target.dataset.id
            }
        });
    }
}