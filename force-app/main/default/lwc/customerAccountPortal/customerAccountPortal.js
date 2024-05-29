import { LightningElement, wire } from 'lwc';
import getGuestUserInfo from '@salesforce/apex/GuestUserController.getGuestUserInfo';

export default class GuestUserInfo extends LightningElement {
    guestUser;
    error;

    @wire(getGuestUserInfo)
    wiredGuestUser({ error, data }) {
        if (data) {
            this.guestUser = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.guestUser = undefined;
        }
    }
}