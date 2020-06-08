'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ticket extends Model {
  classrooms () {
      return this
        .belongsTo('App/Models/Classroom')
  }
  users () {
    return this
      .belongsTo('App/Models/User')
  }
  photos () {
      return this
        .hasMany('App/Models/Photo')
  }
  historics () {
    return this
      .belongsToMany('App/Models/Historic')
      .pivotTable('historics')
  }
}

module.exports = Ticket
