import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("tickets", (table) => {
    table.boolean("isDelete").defaultTo("false");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("tickets", (table) => {
    table.dropColumn("isDelete");
  });
}
