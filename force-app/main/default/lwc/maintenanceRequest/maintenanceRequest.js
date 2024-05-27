import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from "lightning/navigation";
import OBJECT_API_NAME from '@salesforce/schema/Case';
import SUBJECT_FIELD from '@salesforce/schema/Case.Subject';
import TYPE_FIELD from '@salesforce/schema/Case.Type'
import REASON_FIELD from '@salesforce/schema/Case.Reason';
import PRIORITY_FIELD from '@salesforce/schema/Case.Priority';
import DESCRIPTION_FIELD from '@salesforce/schema/Case.Description';
import Toast from 'lightning/toast';
import getUserInfo from '@salesforce/apex/MaintenanceRequestHelper.getUserInfo';


export default class MaintenanceRequest extends NavigationMixin(LightningElement) {

    @api
    objectApiName = OBJECT_API_NAME;

    @api
    subjectField = SUBJECT_FIELD;

    @api
    typeField = TYPE_FIELD;

    // @api
    // reasonField = REASON_FIELD;

    @api
    priorityField = PRIORITY_FIELD;

    @api
    descriptionField = DESCRIPTION_FIELD;

    myFields = [SUBJECT_FIELD, TYPE_FIELD,  PRIORITY_FIELD, DESCRIPTION_FIELD];

    @wire(getUserInfo)
    userInfo;

    handleSuccess() {
        // const evt = new ShowToastEvent({
        //     title: 'Maintenance Request received',
        //     message: 'Case ID: ' + event.detail.id,
        //     variant: 'success',
        // });
        // this.dispatchEvent(evt);
        Toast.show({
            label: 'Success',
            message: 'Maintenance form has been submitted',
            mode: 'sticky',
            variant: 'success'
        }, this);
    }
}