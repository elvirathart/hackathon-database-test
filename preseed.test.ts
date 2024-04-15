import { StartedTestContainer } from "testcontainers";
import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { Client } from "pg";

describe("Redis", () => {
  let container: StartedTestContainer;
  let client: Client;

  beforeEach(async () => {
    container = await new PostgreSqlContainer("preseeded")
      .withUsername("postgres")
      .withPassword("pass123")
      .withExposedPorts(5432)
      .start();
    client = await initClient(container);
  });

  afterEach(async () => {
    try {
      await client.end();
    } catch (error) {
      console.error("Error closing database connection:", error);
    }
    await container.stop();
  });

  it("contains slowpoke", async () => {
    const todo = await select(client, 79);
    expect(todo.rows[0].name).toBe("slowpoke");
  });

  it("contains slowpoke", async () => {
    const todo = await select(client, 94);
    expect(todo.rows[0].name).toBe("gengar");
  });

  it("contains typhlosion", async () => {
    const todo = await select(client, 157);
    expect(todo.rows[0].name).toBe("typhlosion");
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

async function select(client: Client, id: number): Promise<any> {
  await client.connect();
  const result = await client.query(
    "SELECT * FROM pokemon_types where id = $1;",
    [id]
  );
  client.end();
  return result;
}
