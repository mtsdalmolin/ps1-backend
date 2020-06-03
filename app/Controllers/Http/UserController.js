'use strict'

const User = use('App/Models/User')
const Role = use('Role')
const Database = use('Database')

class UserController {
  async index ({ request, response }) {
    const users = await User.all()
    return users
  }

  async store ({ request, response }) {
    const data = request.only(['username', 'password', 'email'])
    const { type } = request.all()

    const trx = await Database.beginTransaction()
    try {
      const user = await User.create(data, trx)

      if (type !== 'admin') {
        await trx.commit()
        return response.json(user)
      }

      if (!data.password)
        return response.badRequest('Senha é obrigatória!')

      const role = await Role.findByOrFail('slug', type, trx)
      await user.roles().attach([role.id], null, trx)
      await trx.commit()

      return response.json(user)
    } catch (error) {
      await trx.rollback()
      return response.badRequest('Ocorreu um erro ao realizar o cadastro.')
    }
  }

  async show ({ params, request, response }) {
    const user = await User.findOrFail(params.id)
    return user
  }

  async update ({ auth, params, request, response }) {
    const user = await User.findOrFail(params.id)
    
    let roles = await auth.user.getRoles()

    if (roles[0] !== 'admin' && auth.user.id !== user.id)
      return response.unauthorized("Acesso não permitido")

    const data = request.only(['username', 'password', 'email'])
    user.merge(data)
    await user.save()
    return user
  }

  async destroy ({ params, request, response }) {
    const user = await User.findOrFail(params.id)
    await user.delete()
  }
}

module.exports = UserController
