import { LightningElement, wire, api, track } from 'lwc';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import ImageField from '@salesforce/schema/ContentDocument.LatestPublishedVersion.VersionDataUrl';
import getImages from '@salesforce/apex/propertyClass.getImages'; 
import getMainImages from '@salesforce/apex/propertyClass.getMainImages';

export default class PropertyDetailImageComponent extends LightningElement {

    @api
    recordId;

    @track imageId;
    imgRecord = [];
    @track imgList;
    parameterImg;
    firstImage;



    @wire(getImages, {recordId: "$recordId"})
    propImages({data, error}){
        if(data){
            this.imgList = data;
        }
        else if (error){
            this.imgList = undefined;
        }
    }

    @wire(getMainImages, {recordId: "$recordId"})
    prop2Images({data, error}){
        if(data){
            this.firstImage = data;
        }
        else if (error){
            this.firstImage = undefined;
        }
    }

    //     @wire(getImages, {recordId: "$recordId"})
    // wiredContentDocumentId({data, error}) {
    //     if (data) {
    //         this.imgRecord = data;
    //         this.imgList = this.imgRecord.ContentDocumentId;
    //         if(this.imgRecord.length > 0){
    //             this.parameterImg = [];
    //             this.imgRecord.forEach((imgRecord) =>{
    //                 this.parameterImg.push({
    //                     Id: [imgRecord.ContentDocumentId]
    //                 });
    //             });
    //         }
    //     }else if (error){
    //         this.imgRecord = undefined;
    //     }
    // }

    // @wire(getRecord, {recordId: "$imgList", fields: [ImageField]})
    // contentDocImage;

    // get imageUrl() {
    //     return getFieldValue(this.contentDocImage.data, ImageField);
    // }

    // get resizedImageUrl() {
    //     return getFieldValue(this.contentDocImage.data, ImageField) + 
    //         '?thumb=THUMB240BY180';
    // }

    // connectedCallback() {
    //     this.imgList = this.imgList;
    // } 


}