import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Book from "App/Models/Book";
import User from "App/Models/User";

export default class BooksController {
  public async store({ request, response }: HttpContextContract) {
    if (await this.existsUser(request.input("usuario_id"))) {
      const book = new Book();
      book.title = request.input("title");
      book.editorial = request.input("editorial");
      book.formato = request.input("formato");
      book.no_paginas = request.input("no_paginas");
      book.userId = request.input("usuario_id");

      const user = await User.findBy("id", request.input("usuario_id"));
      await user?.related("books").save(book);

      return response.status(201).json({
        libro: book.title,
        msg: "Libro ingresado correctamente",
        estado: 200,
      });
    } else {
      return response.status(401).json({
        error: "Usuario no registrado con rol: Escritor o Admin",
      });
    }
  }

  public async index({ response }: HttpContextContract) {
    const books = await Book.all();
    return response.status(200).json({ books });
  }

  public async show({ params }: HttpContextContract) {
    try {
      const book = await Book.find(params.id);
      if (book) {
        return book;
      } else {
        return "Registro no existe";
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const book = await Book.find(params.id);
    if (book) {
      book.title = request.input("title");
      book.userId = request.input("author");
      book.no_paginas = request.input("no_paginas");
      book.editorial = request.input("editorial");
      book.formato = request.input("formato");

      if (await book.save()) {
        return {
          msg: "Libro actualizado correctamente",
          book,
        };
      }
      return {
        msg: "No se pudo actualizar el libro",
        estado: 401,
      };
    }
    return {
      msg: "Registro no encontrado",
      estado: 401,
    };
  }

  public async destroy({params}: HttpContextContract) {
    const book = await Book.find(params.id);

    if (book) {
      book.delete();
      return {
        msg: "Libro eliminado correctamente",
        book
      }
    }
    return {
      msg: "No se encontro el libro",
      estado: 401
    }
  }

  private async existsUser(id: number) {
    const user = await User.findBy("id", id);
    if (user !== null) {
      if (user?.perfilId === 1 || 2) {
        return true;
      }
    }
    return false;
  }
}
