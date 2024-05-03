import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTableIfNotExists("users", (table) => {
        table.increments("user_id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.boolean("isDelete").notNullable().defaultTo("false");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");
}

