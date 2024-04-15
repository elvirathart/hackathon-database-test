import { Client } from 'pg';

// Functie zet id, name, type in pokemon_types table
// Heb je een andere user, database name of password ingesteld? Pas dit aan.
async function insertIntoPokemon_types(id: number, name: string, type: string): Promise<void> {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'pokemon',
    password: 'pass123',
    port: 5432,
  });

  try {
    await client.connect();
    await client.query('INSERT INTO pokemon_types (id, name, type) VALUES ($1, $2, $3)', [id, name, type]);
  } finally {
    await client.end();
  }
}

describe('Database tests', () => {
  it('should insert a string into pokemon_types table and assert count is 13', async () => {
    
    await insertIntoPokemon_types(2, 'morpeko', 'electric');

    // Connect om rows in the pokemon_types table te tellen
    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'pokemon',
      password: 'pass123',
      port: 5432,
    });

    try {
      await client.connect();
      const result = await client.query('SELECT COUNT(*) AS count FROM pokemon_types');
      expect(result.rows[0].count).toBe('13');
    } finally {
      await client.end();
    }
  });
});