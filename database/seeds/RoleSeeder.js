'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Database = use('Database')
const Role = use('Role')

class RoleSeeder {
  async run () {
    await Database.transaction(async trx => {
      const roleAdmin = new Role()
      roleAdmin.name = 'Admin'
      roleAdmin.slug = 'admin'
      roleAdmin.description = 'manage admin privileges'
      await roleAdmin.save(trx)
    })
  }
}

module.exports = RoleSeeder
