import { LightningElement, wire } from 'lwc';
import getPopularPropertiesRecords from '@salesforce/apex/PropertiesHomeController.getPopularPropertiesRecords';
import propertyImg from '@salesforce/resourceUrl/nameOfImg';

export default class PropertyHome extends LightningElement {

    propertiesToDisplay = [];
    sfiage  = propertyImg;

    @wire(getPopularPropertiesRecords)
    GetPropertiesHandler(response) {
        // {error, data}
        // Case 1:  {error: undefined, data: ...}
        // Case 2: {error: ..., data: undefined}

        const {data, error } = response; //destructuring
        // same as data = response.data
        // error = repsonse.error
        if(error) {
            console.error(error);
            return;
        } 
        if(data) {
            this.propertiesToDisplay = data;
        }
    }
}