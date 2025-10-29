
const cds = require('@sap/cds');
const { INSERT, DELETE, UPDATE } = require('@sap/cds/lib/ql/cds-ql');
const SELECT = require('@sap/cds/lib/ql/SELECT');
class ProcessorService extends cds.ApplicationService {
    async init() {

        //READ Calls
        this.on("READ", "Incidents", async function (res) {
            let query = res.data, results = [];
            if (query.ID) {
                results = await SELECT.from("Incidents").where({ ID: query.ID })
            } else {
                results = await SELECT.from("Incidents")
            }

            return results;
        })
        this.after("READ", "Incidents", async function (res) {
            res.forEach((a) => {
                a.title = a.urgency_code + " " + a.title
            })

            return res;
        })

         //Update Calls
        this.before("UPDATE", "Incidents", async function (res) {
          let body = res.req.body
           let incident = await SELECT.from("Incidents").where({ ID: body.ID })
            if(!incident){
   res.error("Couldnt find the incident")
            }
            if(incident[0].customer_ID !== body.customer_ID){
                res.error("Customer ID cannot be changed in between incidents")
           
            }
          if(!body.customer_ID){
            res.error('400', "Customer id is mandatory")
          }
        })
     
        this.on("UPDATE", "Incidents", async function (res) {
            let body = res.req.body;
              let update =await UPDATE("Incidents").set({"status_code":body.status_code}).where({'ID':body.ID});
            //  let update =await UPDATE("Incidents",body.ID).with(body).where({'ID':body.ID});
            return update;
        })
        this.after("UPDATE", "Incidents", async function (req) {
           
        })

        //Create Calls
         this.before("CREATE", "Incidents", async function (res) {
            
          let body = res.req.body
          if(!body.customer_ID){
            res.error('400', "Customer id is mandatory")
          }
         
        })
        this.on("CREATE", "Incidents", async function (res) {
          
            let body = res.req.body;
            let insert = await INSERT.into("Incidents").entries(body);
            return insert
         
        })

        this.after("CREATE", "Incidents", async function (res) {
          
           ///nothing to do here for now
         
        })


        //Delete
        this.on("DELETE", "Incidents", async function (res) {

          let deleted = await DELETE.from("Incidents").where({"ID":res.data.ID});
            return deleted;
        })

        //Ation and functions
        this.on("getIncidentStatuses", async function (res) {
          let statuses = await SELECT.from("Status")
          return statuses;
         
        })
        this.on("createIncident", async function (res) {
          let {data}= res;
          let newIncident ={
                  
                  "customer_ID": data.customer_ID,
                  "title": data.title,
                  "urgency_code": "M",
                  "status_code": "A"
                }

        let insert = INSERT.into("Incidents").entries(newIncident)
         return insert;
        })


        this.on("closeIncident", async function (res) {
          let {params}= res;
         

        let update = await UPDATE("Incidents").set({"status_code":"C"}).where({"ID":params[0].ID})
         return update;
        })

        super.init()
    }

}

module.exports = ProcessorService