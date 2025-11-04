
const cds = require('@sap/cds');
const { INSERT, DELETE, UPDATE } = require('@sap/cds/lib/ql/cds-ql');
const SELECT = require('@sap/cds/lib/ql/SELECT');
class AdminService extends cds.ApplicationService {
  async init() {

    //READ Calls
    this.on("READ", "Incidents", async function (res) {
      let query = res.data, results = [];
      if (query.ID) {
        results = await SELECT.from("Incidents").where({ ID: query.ID })
      } else {
        results = await SELECT.from("Incidents")
      }
     console.log('a')
      return results;
    })
  

    super.init()
  }

}

module.exports = AdminService