using { sap.capire.incidents as my } from '../db/schema';
namespace sap.capire.incidents.api; 
/**
 * Service used by administrators to manage customers and incidents.
 */
service EscalateService{
    entity Escalation as projection on my.Escalation;
    event Escalation.Changed : Escalation; 
    
}

annotate EscalateService with @(requires: 'support');