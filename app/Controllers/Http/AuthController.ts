import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import Perfil from "App/Models/Perfil";

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    try {
      const token = await auth.use("api").attempt(email, password, {
        expiresIn: "60 mins",
      });
      return {
        token,
        msg: "Usuario logueado correctamente",
      };
    } catch (error) {
      return response.unauthorized("Invalid credentials");
    }
  }

  public async register({ request, auth, response }: HttpContextContract) {
    if (!await this.existsUser(request.input("no_identificacion"))) 
    {
      const nombres = request.input("nombres");
      const apellidos = request.input("apellidos");
      const perfil_id = request.input("perfil");
      const tipo_identificacion = request.input("tipo_identificacion");
      const no_identificacion = request.input("no_identificacion");
      const direccion = request.input("direccion");
      const barrio = request.input("barrio");
      const municipio = request.input("municipio");
      const departamento = request.input("departamento");
      const email = request.input("email");
      const password = request.input("password");

      if (await this.existsPerfil(perfil_id)) {
        // Crea un nuevo usuario;
        const perfil = await Perfil.findBy("id", perfil_id);
        const user = new User();
        user.nombres = nombres;
        user.apellidos = apellidos;
        user.tipo_identificacion = tipo_identificacion;
        user.No_identificacion = no_identificacion;
        user.perfilId = perfil_id;
        user.direccion = direccion;
        user.barrio = barrio;
        user.municipio = municipio;
        user.departamento = departamento;
        user.email = email;
        user.password = password;

        await perfil?.related("users").save(user);
        const token = await auth.use("api").login(user, {
          expiresIn: "60 mins",
        });
        response
          .status(201)
          .json({ Token: token, message: "Usuario registrado correctamente" });
      } else {
        response.json({ message: "El perfil no existe" });
      }
    } else {
      response.json({ message: "El usuario ya esta registrado" });
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use("api").logout();

    return {
      msg: "Usuario deslogueado correctamente",
    };
  }

  private async existsPerfil(id: number) {
    const perfil = await Perfil.findBy("id", id);
    if (perfil) {
      return true;
    } else {
      return false;
    }
  }

  private async existsUser(id: number) {
    const user = await User.findBy("no_identificacion", id);
    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
