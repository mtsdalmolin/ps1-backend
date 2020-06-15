'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UrlColumnPhotoSchema extends Schema {
  up () {
    this.table('photos', (table) => {
      // alter table
      table
        .string('url')
        .notNullable()
        .defaultTo('https://sisgepephotos.s3-sa-east-1.amazonaws.com/sisgepe-logo.jpeg')
    })
  }

  down () {
    this.table('photos', (table) => {
      // reverse alternations
      table.dropColumn('url')
    })
  }
}

module.exports = UrlColumnPhotoSchema
