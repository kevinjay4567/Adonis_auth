import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Perfil from 'App/Models/Perfil'

export default class PerfilsController {
  public async index({}: HttpContextContract) {
    const perfils = await Perfil.all()
    return perfils
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {descripcion} = request.all()
    const perfil = await Perfil.create({descripcion})
    return response.status(201).json(perfil)

  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({request, params}: HttpContextContract){
    const perfil = await Perfil.findBy("id", params.id)

    if (perfil) {
      perfil.descripcion = request.input('descripcion')
      if (await perfil.save()) {
        return {
          msg: "Perfil actualizado correctamente",
          estado: 201
        }
      }
      return {
        msg: "Error al actualizar el perfil",
        estado: 400
      }
    }
    return {
      msg: "Perfil no registrado",
      estado: 400
    } 
  }

  public async destroy({params}: HttpContextContract) {
    const perfil = await Perfil.findBy("id", params.id)
    if (perfil) {
      perfil.delete()
      return {
        msg: "Perfil eliminado correctamente",
        perfil
      }
    }
    return {
      msg: "Perfil no registrado"
    }
  }
}
