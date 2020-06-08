'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistoricSchema extends Schema {
  up () {
    this.create('historics', (table) => {
      table.increments()
      table.string('description').notNullable()
      table.string('situation').notNullable()
      table
        .integer('ticket_id')
        .unsigned()
        .index('historic_ticket_id')
        .references('id')
        .inTable('tickets')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('historics')
  }
}

module.exports = HistoricSchema
