import { LightningElement, wire, track } from 'lwc';
import getContactForUser from '@salesforce/apex/GuestUserController.getContactForUser';
import updateContact from '@salesforce/apex/GuestUserController.updateContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CustomerAccountPortal extends LightningElement {
    @track contact;
    error;
    isEditMode = false;

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

    handleEditClick() {
        this.isEditMode = true;
    }

    handleCancelClick() {
        this.isEditMode = false;
    }

    handleSubmit(event) {
        event.preventDefault(); // Prevent default submit
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    handleSuccess(event) {
        this.isEditMode = false;
        // Handle form success
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Contact updated successfully',
                variant: 'success'
            })
        );
    }

    handleError(event) {
        // Handle form error
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message: 'Error updating contact',
                variant: 'error'
            })
        );
    }

    async handleSave() {
        try {
            await updateContact({ contact: this.contact });
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact updated successfully',
                    variant: 'success'
                })
            );
            this.isEditMode = false;
        } catch (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }
}
