'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class School extends Model {
  users () {
    return this
      .belongsToMany('App/Models/User')
      .pivotTable('user_schools')
  }

  address () {
    return this.hasOne('App/Models/Address')
  }

  classrooms () {
    return this.hasMany('App/Models/Classroom')
  }
}

module.exports = School
