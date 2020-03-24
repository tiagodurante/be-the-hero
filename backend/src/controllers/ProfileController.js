const Db = require('../database')
const table = 'incidents'

module.exports = {
  async index (request, response) {
    const ong_id = request.headers.authorization
    const incidents = await Db(table).where('ong_id', ong_id).select('*')
  
    return response.json(incidents)
  }
}