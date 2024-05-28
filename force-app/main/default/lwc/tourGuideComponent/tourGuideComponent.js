import { LightningElement, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ToastContainer from 'lightning/toastContainer';
import Toast from 'lightning/toast';
import LeadObject from '@salesforce/schema/Lead';
import tourObject from '@salesforce/schema/Tour__c'
//import FirstName from '@salesforce/schema/Lead.FirstName';
//import LastName from '@salesforce/schema/Lead.LastName';
import Status from '@salesforce/schema/Lead.Status';
import Name from '@salesforce/schema/Account.Name';
import FirstName from '@salesforce/schema/Contact.FirstName';
import LastName from '@salesforce/schema/Contact.LastName';
import AccountId from '@salesforce/schema/Contact.AccountId';
import AccountObject from '@salesforce/schema/Account';
import Company from '@salesforce/schema/Lead.Company';
import contactObject from '@salesforce/schema/Contact';
import TourName from '@salesforce/schema/Tour__c.Name';


export default class TourGuideComponent extends LightningElement {
    toastContainer;
    minDate = new Date().toISOString().slice(0,10);
    leadFields ={};
    tourFields = {};
    tourName;
    @api
    recordId;

    changeHandlerLead(event){
        const {name, value} = event.target;
        this.leadFields[name]=value;
    }
    changeHandlerTour(event){
        const {name, value} = event.target;
        this.tourFields[name]=value;
    }

    submitTour(){
        let dateChecker = this.template.querySelector('.dateInput').value;
        if(dateChecker > this.minDate & this.leadFields.FirstName != null & this.leadFields.LastName != null & this.leadFields.Email != null)
            {
                this.leadFields.Company = this.leadFields.FirstName + ' ' + this.leadFields.LastName;
                this.tourName = this.leadFields.FirstName + ' ' + this.leadFields.LastName + ' Tour';
                this.leadFields.Status = 'Open - Not Contacted';
                const recordInput = {apiName:LeadObject.objectApiName, fields:this.leadFields}
                createRecord(recordInput).then(res => {
                    this.tourFields.Lead__c = res.id;
                    console.log(this.tourName);
                    this.tourFields.Name = this.tourName;
                    this.tourFields.Property__c = this.recordId;
                    const conRecordInput = {apiName:tourObject.objectApiName, fields:this.tourFields}
                    createRecord(conRecordInput);
                    this.successShowToast();
                    this.template.querySelector('form.createForm').reset();
                    this.leadFields={};
                    this.tourFields={};
                }).catch(error=>{
                    this.failureShowToast();
                })
            }
            else{
                this.missingFieldsShowToast();
                return null
            }

    }
    connectedCallback() {
        this.toastContainer = ToastContainer.instance();
        
    }

    successShowToast()
    {
        this.toastContainer.maxToasts = 1;
        Toast.show({
            label: 'Success',
            message: 'Tour date set!',
            mode: 'dismissable',
            variant: 'success',
        }, this);
    }
    failureShowToast()
    {
        this.toastContainer.maxToasts = 1;
        Toast.show({
            label: 'Unsuccessful',
            message: 'Please try again!',
            mode: 'dismissable',
            variant: 'error',
        }, this);
    }
    missingFieldsShowToast()
    {
        this.toastContainer.maxToasts = 1;
        Toast.show({
            label: 'Unsuccessful',
            message: 'Please enter all require fields!',
            mode: 'dismissable',
            variant: 'error',
        }, this);
    }


    // toastContainer;
    // leadFields ={};
    // conFields = {};
    // changeHandler(event){
    //     const {name, value} = event.target;
    //     this.leadFields[name]=value;
    // }
    // changeHandlerCon(event){
    //     const {name, value} = event.target;
    //     this.conFields[name]=value;
    // }

    // submitTour(){
    //     const recordInput = {apiName:AccountObject.objectApiName, fields:this.leadFields}
    //     createRecord(recordInput).then(res => {
    //         this.conFields.AccountId = res.id;
    //         const conRecordInput = {apiName:contactObject.objectApiName, fields:this.conFields}
    //         createRecord(conRecordInput);
    //         this.successShowToast();
    //         this.template.querySelector('form.createForm').reset();
    //         this.leadFields={};
    //         this.conFields={};
    //     }).catch(error=>{
    //         this.failureShowToast();
    //     })

    // }
    // connectedCallback() {
    //     this.toastContainer = ToastContainer.instance();
        
    // }

    // successShowToast()
    // {
    //     this.toastContainer.maxToasts = 1;
    //     Toast.show({
    //         label: 'Success',
    //         message: 'Tour date set!',
    //         mode: 'dismissable',
    //         variant: 'success',
    //     }, this);
    // }
    // failureShowToast()
    // {
    //     this.toastContainer.maxToasts = 1;
    //     Toast.show({
    //         label: 'Unsuccessful',
    //         message: 'Please try Again!',
    //         mode: 'dismissable',
    //         variant: 'error',
    //     }, this);
    // }
}