import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists("tickets", (table) => {
    table.increments("ticket_id").primary();
    table.string("title").notNullable();
    table.string("description");
    table.dateTime("created_at").notNullable();
    table.dateTime("updated_at").notNullable();
    table.enum("status", ["IN_PROGRESS", "COMPLETED", "PENDING", "CANCELLED"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("tickets");
}
