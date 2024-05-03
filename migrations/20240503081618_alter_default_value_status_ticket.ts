import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("tickets", (table) => {
    table
      .enum("status", ["IN_PROGRESS", "COMPLETED", "PENDING", "CANCELLED"])
      .alter()
      .defaultTo("PENDING");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("tickets");
}
