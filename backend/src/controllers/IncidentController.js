const Db = require('../database')
const table = 'incidents'

module.exports = {
  async index (request, response) {
    const { page = 1 } = request.query

    const [count] = await Db(table).count()
    const incidents = await Db(table).join('ongs', 'ongs.id', '=', 'incidents.ong_id').limit(5).offset((page - 1)*5).select(['incidents.*', 'ongs.name', 'ongs.whatsapp', 'ongs.email', 'ongs.city', 'ongs.uf'])
  
    response.header('X-Total-Count', count['count(*)'])
    return response.json(incidents)
  },
  async create (request, response) {
    const { title, description, value } = request.body
    const ong_id = request.headers.authorization
  
    const [id] = await Db(table).insert({
      title, ong_id, description, value
    })
  
    return response.json({
      id
    })
  },
  async delete (request, response) {
    const { id } = request.params
    const ong_id = request.headers.authorization

    const incident = await Db(table).where('id', id).select('ong_id').first()

    if (ong_id !== incident.ong_id) {
      return response.status(401).json({
        error: 'Operation not permitted'
      })
    }
    
    await Db(table).where('id', id).delete()

    return response.status(204).send()
  }
}