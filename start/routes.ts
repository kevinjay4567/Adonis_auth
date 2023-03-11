/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");

  Route.group(() => {
    Route.post("logout", "AuthController.logout");

    Route.group(() => {
      Route.get("books", "BooksController.index");
      Route.get("books/:id", "BooksController.show");
    }).middleware("role:1,2,3");

    Route.group(() => {
      Route.post("books", "BooksController.store");
      Route.put("books/:id", "BooksController.update");
      Route.delete("books/:id", "BooksController.destroy");
    }).middleware("role:1,2");

    Route.group(() => {
      Route.get("users", "UsersController.index");
      Route.get("perfil", "PerfilsController.index");
      Route.post("perfil", "PerfilsController.store");
      Route.put("perfil/:id", "PerfilsController.update");
      Route.delete("perfil/:id", "PerfilsController.destroy");
    }).middleware("role:1");
  }).middleware("auth");
}).prefix("api");
