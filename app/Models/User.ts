import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import Book from './Book'
import { column, beforeSave, BaseModel, hasMany, HasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Perfil from './Perfil'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombres: string

  @column()
  public apellidos: string

  @column()
  public tipo_identificacion: string

  @column()
  public No_identificacion: string

  @column()
  public perfilId: number

  @column()
  public direccion: string

  @column()
  public barrio: string

  @column()
  public municipio: string

  @column()
  public departamento: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Perfil)
  public perfil: HasOne<typeof Perfil>

  @hasMany(() => Book)
  public books: HasMany<typeof Book>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
