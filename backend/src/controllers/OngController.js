const crypto = require('crypto')
const Db = require('../database')
const table = 'ongs'

module.exports = {
  async create (request, response) {
    const { name, email, whatsapp, city, uf } = request.body
  
    const id = crypto.randomBytes(4).toString('HEX')
  
    await Db(table).insert({
      id, name, email, whatsapp, city, uf
    })
  
    return response.json({
      id
    })
  },
  async index (request, response) {
    const ongs = await Db(table).select('*')
  
    return response.json(ongs)
  }
}