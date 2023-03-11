import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({response}: HttpContextContract) {
    const users = await User.all()
    return response.status(200).json(users)
  }

  public async create({}: HttpContextContract) {}

  public async store({request}: HttpContextContract) {
    this.validate(request.body())
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  private async validate(data) {
    console.log(data)
  }
}
