import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("tickets", (table) => {
    table.dateTime("updated_at").nullable().alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("tickets", (table) => {
    table.dateTime("updated_at").alter();
  });
}
