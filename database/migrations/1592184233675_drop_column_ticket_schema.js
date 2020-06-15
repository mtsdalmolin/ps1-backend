'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DropColumnTicketSchema extends Schema {
  up () {
    this.table('tickets', (table) => {
      // alter table
      table.dropColumn('photo_id')
    })
  }

  down () {
    this.table('tickets', (table) => {
      // reverse alternations
      table
        .integer('photo_id')
        .unsigned()
        .index('ticket_photo_id')
        .references('id')
        .inTable('photos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }
}

module.exports = DropColumnTicketSchema
