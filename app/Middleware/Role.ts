import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class Role {
  public async handle(
    { response, auth }: HttpContextContract,
    next: () => Promise<void>,
    guards?: string[]
  ) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const user = await auth.authenticate();
    if (guards) {
      if (guards.includes(user.perfilId.toString())) {
        await next();
      } else {
        response.unauthorized("No autorizado");
      }
    }
  }
}
