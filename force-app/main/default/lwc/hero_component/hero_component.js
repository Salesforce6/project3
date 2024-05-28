import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class Hero_Component extends NavigationMixin(LightningElement) {



    navToBookATour(e) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: 'tour__c'
            }
        })
    }
}