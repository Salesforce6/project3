import { LightningElement, wire } from 'lwc';
import getContactForUser from '@salesforce/apex/GuestUserController.getContactForUser';

export default class GuestUserController extends LightningElement {
    contact;
    error;

    @wire(getContactForUser)
    wiredContact({ error, data }) {
        if (data) {
            this.contact = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contact = undefined;
        }
    }

    get hasContact() {
        return this.contact !== undefined;
    }
}