

const cds = require('@sap/cds');
const { INSERT, DELETE, UPDATE } = require('@sap/cds/lib/ql/cds-ql');
const SELECT = require('@sap/cds/lib/ql/SELECT');
class EscalationService extends cds.ApplicationService {
  async init() {

    //READ Calls
    this.on("Escalation.Changed", async function (res) {
      console.log('event is triggered bro')
    })
  

    super.init()
  }

}

module.exports = EscalationService