'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Classroom extends Model {
    schools () {
        return this
          .belongsTo('App/Models/School')
    }

    tickets (){
        return this
          .hasMany('App/Models/Ticket')
          .pivotTable('tickets')
    }
}

module.exports = Classroom
