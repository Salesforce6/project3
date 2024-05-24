import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Hero_Component extends NavigationMixin(LightningElement) {

    navToSeeAllPropertiesPage(e) {
        // the name Residence_Viewer__c needs to correspond with
        // the api name of the page made in experience builder
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'Property_Detail__c',
            }
        });
    }

    // navToBookATour(e) {
    //     this[NavigationMixin.Navigate]({
    //         type: 'comm__namedPage',
    //         attributes: {
    //             name: 'Tour__c'
    //         }
    //     })
    // }
}
