import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("tickets").del();

  // Inserts seed entries
  await knex("users").insert([
    { name: "rowValue1", email: "email@gmail.com1" },
    { name: "rowValue2", email: "email@gmail.com2" },
    { name: "rowValue3", email: "email@gmail.com3" },
    { name: "rowValue4", email: "email@gmail.com4" },
    { name: "rowValue5", email: "email@gmail.com5" },
    { name: "rowValue6", email: "email@gmail.com6" },
    { name: "rowValue7", email: "email@gmail.com7" },
  ]);

  await knex("tickets").insert([
    {
      title: "title1",
      description: "email@gmail.com1",
      created_at: "2024-05-01 19:43:46",
      updated_at: "2024-05-06 16:43:09",
    },
    {
      title: "title2",
      description: "email@gmail.com2",
      created_at: "2024-05-01 19:43:46",
      updated_at: "2024-05-06 16:43:09",
    },
    {
      title: "title3",
      description: "email@gmail.com3",
      created_at: "2024-05-01 19:43:46",
      updated_at: "2024-05-06 16:43:09",
    },
    {
      title: "title4",
      description: "email@gmail.com4",
      created_at: "2024-05-01 19:43:46",
      updated_at: "2024-05-06 16:43:09",
    },
    {
      title: "title5",
      description: "email@gmail.com5",
      created_at: "2024-05-01 19:43:46",
      updated_at: "2024-05-06 16:43:09",
    },
    {
      title: "title6",
      description: "email@gmail.com6",
      created_at: "2024-05-01 19:43:46",
      updated_at: "2024-05-06 16:43:09",
    },
    {
      title: "title7",
      description: "email@gmail.com7",
      created_at: "2024-05-01 19:43:46",
      updated_at: "2024-05-06 16:43:09",
    },
  ]);
}
