'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TicketIdColumnPhotosSchema extends Schema {
  up () {
    this.table('photos', (table) => {
      // alter table
      table
        .integer('ticket_id')
        .references('id')
        .inTable('tickets')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }
}

module.exports = TicketIdColumnPhotosSchema
