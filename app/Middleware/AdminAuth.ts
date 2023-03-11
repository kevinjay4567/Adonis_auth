import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
export default class AdminAuth {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    if (auth.user?.perfilId !== 1) {
      response.status(401).send({ error: "Unauthorized" });
      return;
    }
    await next();
  }
}
