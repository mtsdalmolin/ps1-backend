'use strict'

const User = use('App/Models/User')
const School = use('App/Models/School')
const UserSchool = use('App/Models/UserSchool')
const Address = use('App/Models/Address')

class SessionController {
  async create ({ auth, request, response }) { 
    const { email, password, username } = request.all()

    let user
    if (password)
      user = await User.findBy('email', email)
    else
      user = await User.findOrCreate(
        { email },
        { username, email }
      )

    if (!user)
      return response.badRequest('E-mail não cadastrado!')

    const userSchool = await UserSchool.findBy('user_id', user.id)

    const userRoles = await user.getRoles()
    
    let token;
    let school;
    if (userRoles[0] !== 'admin') {
      token = await auth.generate(user)
    } else {
      if (userSchool) {
        school = await School.find(userSchool.school_id)
        school.address = await Address.findBy('school_id', school.$attributes.id)
      }
      token = await auth.attempt(email, password)
    }

    return school ? { user, token, school } : { user, token }
  }
}

module.exports = SessionController
