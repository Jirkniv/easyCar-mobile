import pkg from 'pg';

const { Client } = pkg; // Extrai Client corretamente

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'easy-car_db',
  password: 'Ayreon',
  port: 5432,
});

client.connect()
  .then(() => console.log('✅ Conectado ao PostgreSQL!'))
  .catch(err => console.error('❌ Erro ao conectar:', err));

export default client;
