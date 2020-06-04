'use strict'

const User = use('App/Models/User')

class SessionController {
  async create ({ request, auth }) { 
    const { email, password } = request.all()
    const user = await User.findByOrFail('email', email)
    const userRoles = await user.getRoles()
    
    let token;
    if (userRoles[0] !== 'admin') {
      token = await auth.generate(user)
    } else {
      token = await auth.attempt(email, password)
    }

    return { user, token }
  }
}

module.exports = SessionController
