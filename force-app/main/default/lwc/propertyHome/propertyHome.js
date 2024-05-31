import { LightningElement, wire } from 'lwc';
import getPopularPropertiesRecords from '@salesforce/apex/PropertiesHomeController.getPopularPropertiesRecords';
import { NavigationMixin } from 'lightning/navigation';

export default class PropertyHome extends NavigationMixin(LightningElement) {

    propertiesToDisplay;

    @wire(getPopularPropertiesRecords)
    GetPropertiesHandler(response) {

        const {data, error } = response; 
        if(error) {
            console.error(error);
            return;
        } 
        if(data) {
            this.propertiesToDisplay = data;
        }
    }
    navToPropertyPage(e) {
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

    navToMaintenanceRequestForm(e) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Maintenance_Request_Form__c', // Correct API name
            }
        });
    }
}