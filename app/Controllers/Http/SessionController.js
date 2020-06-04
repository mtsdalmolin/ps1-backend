'use strict'

const User = use('App/Models/User')
const School = use('App/Models/School')
const UserSchool = use('App/Models/UserSchool')

class SessionController {
  async create ({ auth, request, response }) { 
    const { email, password } = request.all()
    const user = await User.findBy('email', email)

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
      }
      token = await auth.attempt(email, password)
    }

    return school ? { user, token, school } : { user, token }
  }
}

module.exports = SessionController
