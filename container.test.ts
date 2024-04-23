import { StartedTestContainer } from "testcontainers";
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { Client } from "pg";

describe("Container test", () => {
  let container: StartedTestContainer;
  let client: Client;

  beforeEach(async () => {
    container = await new PostgreSqlContainer("postgres")
      .withUsername("postgres")
      .withPassword("pass123")
      .withDatabase("pokemon")
      .withExposedPorts(5432)
      .start();
    client = await initClient(container);

    try {
      await client.connect();
      await client.query(
        `CREATE TABLE pokemon_types(ID INT PRIMARY KEY NOT NULL, NAME TEXT NOT NULL, TYPE TEXT NOT NULL);`
      );
    } catch (error) {
      console.error("Error setting up database:", error);
    }
  });

  afterEach(async () => {
    try {
      await client.end();
    } catch (error) {
      console.error("Error closing database connection:", error);
    }
    await container.stop();
  });

  it("works", async () => {
    await insertIntoPokemon_types(client, 4, "charmander", "fire");
  });

  it("works twice", async () => {
    await insertIntoPokemon_types(client, 4, "charmander", "fire");
  });

  it("works thrice", async () => {
    await insertIntoPokemon_types(client, 4, "charmander", "fire");
  });

  it("works frice", async () => {
    await insertIntoPokemon_types(client, 4, "charmander", "fire");
  });

  it("works quince", async () => {
    await insertIntoPokemon_types(client, 4, "charmander", "fire");
  });
});

async function initClient(container: StartedTestContainer): Promise<Client> {
  return new Client({
    user: "postgres",
    host: container.getHost(),
    database: "pokemon",
    password: "pass123",
    port: container.getMappedPort(5432),
  });
}

async function insertIntoPokemon_types(
  client: Client,
  id: number,
  name: string,
  type: string
): Promise<void> {
  // Reuse the existing client connection
  await client.query(
    "INSERT INTO pokemon_types (id, name, type) VALUES ($1, $2, $3)",
    [id, name, type]
  );
}
