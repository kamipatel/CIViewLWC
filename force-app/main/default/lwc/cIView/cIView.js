import { LightningElement, api, wire, track } from 'lwc';
import getCI from '@salesforce/apex/DataCloudAPIWrapper.getCI';

import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import CONTACT_ID_FIELD from '@salesforce/schema/Contact.Id';
import CONTACT_EXTERNAL_ID_FIELD from '@salesforce/schema/Contact.ExternalId__c';


export default class CIView extends LightningElement {

    @track ciData;
    @api recordId;
    ciFilter;

    @wire(getRecord, { recordId: '$recordId', fields: [CONTACT_ID_FIELD, CONTACT_EXTERNAL_ID_FIELD]})
    wiredEV( { error, data } ) {
        if(data) {
            console.log("*** getRecord called, data=" + JSON.stringify(data));            
            this.evName = getFieldValue(data, CONTACT_EXTERNAL_ID_FIELD);
            this.ciFilter = '[individual__c=' + this.ExternalId__c + ']';
        } else if (error) {
            console.log(error);
        }
    }    

    @wire(getCI, {ciName:'Total_Purchase_Value_Per_Individual__cio', ciFilter: '$ciFilter'})
    wiredCIWrapper({ error, data }) {
        console.log("*** getCI called, ciFilter=" + '');
        console.log("*** wiredStreamingCI 2 recordId=" + this.recordId);
        
        if (data) {
            console.log("*** ciData data json data=" + JSON.stringify(data[0]));                    
            this.ciData = data[0];  

            this.error = undefined;
        } else if (error) {
            this.error = error;
            console.log("*** wiredStreamingCI error=" + JSON.stringify(error));
            this.ciData = undefined;
        }
    }

}

