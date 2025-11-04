using { sap.capire.incidents as my } from '../db/schema';

/**
 * Service used by support personell, i.e. the incidents' 'processors'.
 */
service ProcessorService { 
    @readonly
    entity Incidents as projection on my.Incidents excluding {stream} actions{
        action closeIncident( ID: String) returns Incidents;
        function getcustomerDetails(customer_ID: String) returns Customers;
    }
    
    action createIncident ( title :String, customer_ID: String) returns Incidents;
    @readonly
    entity Customers as projection on my.Customers;
    @readonly
    entity Status as projection on my.Status;
    function getIncidentStatuses() returns many Status;

}


annotate ProcessorService with @(requires: 'support');
