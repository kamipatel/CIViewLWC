public with sharing class DataCloudAPIWrapper {
    public DataCloudAPIWrapper() {
    }

    @AuraEnabled(cacheable=true)
    public static List<Object> getCI(String ciName, String filters) { 
    
    //(String ciName, String dimensions, String measures, String orderby, String filters, Integer batchSize, Integer offset)
         List<Object> data = new List<Object>();
         ConnectApi.CdpQueryOutput res = null;
         System.debug('ciName=' + ciName);
         //filters = '[individual__c=dddd]';
         System.debug('filters=' + filters);     
         
         try{
             res = ConnectApi.CdpQuery.queryCalculatedInsights(ciName,null,null,null,filters,null,null);
             data = res.data;
         }catch (Exception e){
             System.debug('getCI exeception=' + e);   
         }
         
         System.debug('res=' + res);   
         System.debug('data=' + data);        
         
         return data; 
      }
          
      
}