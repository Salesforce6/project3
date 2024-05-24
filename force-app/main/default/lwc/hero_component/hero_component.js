import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Hero_Component extends NavigationMixin(LightningElement) {

    navToSeeAllPropertiesPage(e) {
        // the name Property__c needs to correspond with
        // the api name of the page made in experience builder
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Property__c',
                actionName: 'list'
            }
        });
    }

    navToBookATour(e) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'tour__c'
            }
        })
    }
}
