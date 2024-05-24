// navigationLinkExample.js
import { LightningElement, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import getProperty from '@salesforce/apex/propertyClass.getProperty';


export default class NavigationLinkExample extends NavigationMixin(LightningElement) {

  @wire(getProperty)
  wiredProperty;

  handleClickToPropDetail(evt) {

    this[NavigationMixin.Navigate]({
      type: 'comm__namedPage',
      attributes: {
          name: 'Property_Detail__c',
      },
      state: {
          c__recordId: evt.target.dataset.id
      }
  });
  }
}