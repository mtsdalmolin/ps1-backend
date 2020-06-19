'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ticket extends Model {
  classroom () {
    return this.belongsTo('App/Models/Classroom')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
  
  photos () {
    return this.hasMany('App/Models/Photo')
  }
  
  historics () {
    return this.hasMany('App/Models/Historic')
  }
}

module.exports = Ticket
