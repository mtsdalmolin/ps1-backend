'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Photo extends Model {
    tickets () {
        return this.belongsTo('App/Models/Ticket')
    }
}

module.exports = Photo
