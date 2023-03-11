import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LectorAuth {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    if(auth.user?.perfilId !== 3) {
      response.status(401).send({ error: 'Unauthorized' })
    } else {
      await next()
    }
  }
}
