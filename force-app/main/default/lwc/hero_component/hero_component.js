import { LightningElement, track, wire } from 'lwc';
import getAllVacantProperties from '@salesforce/apex/PropertyHelper.getAllPropertiesWithVacancies'
import { NavigationMixin } from 'lightning/navigation';
import isGuest from '@salesforce/user/isGuest';
// import heroImage from '@salesforce/resourceUrl/heroImage;

export default class Home extends NavigationMixin(LightningElement) {

    @wire(getAllVacantProperties)
    properties;


    // navToResidencePage(e) {

    //     // the name Residence_Viewer__c needs to correspond with
    //     // the api name of the page made in experience builder
    //     this[NavigationMixin.Navigate]({
    //         type: 'comm__namedPage',
    //         attributes: {
    //             name: 'Residence_Viewer__c',
    //         },
    //         state: {
    //             c__recordId: e.target.dataset.id
    //         }
    //     });
    // }
}
