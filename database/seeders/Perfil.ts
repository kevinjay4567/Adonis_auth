import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Perfil from 'App/Models/Perfil'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Perfil.createMany([
      {
        id: 1,
        descripcion: 'Administrador'
      },
      {
        id: 2,
        descripcion: 'Escritor'
      },
      {
        id: 3,
        descripcion: 'Lector'
      }
    ])
  }
}
