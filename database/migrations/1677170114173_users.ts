import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.bigInteger("no_identificacion").notNullable();
      table.string("nombres", 255).notNullable();
      table.string("apellidos", 255).notNullable();
      table.string("tipo_identificacion", 255).notNullable();
      table.integer("perfil_id").unsigned().references("id").inTable("perfils").onDelete("CASCADE");
      table.string("direccion", 255).notNullable();
      table.string("barrio", 255).notNullable();
      table.string("municipio", 255).notNullable();
      table.string("departamento", 255).notNullable();
      table.string("email", 255).notNullable().unique();
      table.string("password", 180).notNullable();
      table.string("remember_me_token").nullable();
      table.timestamp("created_at", { useTz: true }).notNullable();
      table.timestamp("updated_at", { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
