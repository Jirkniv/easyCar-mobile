import pkg from 'pg';

const { Pool } = pkg; // Use Pool ao invés de Client

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'easy-car_db',
  password: 'Ayreon',
  port: 5432,
});

db.connect()
  .then(() => console.log('✅ Conectado ao PostgreSQL!'))
  .catch(err => console.error('❌ Erro ao conectar ao PostgreSQL:', err));

// Função de execução de queries
 function execute(command, params = []) {
  return db.query(command, params)
    .then(result => result.rows)
    .catch(err => {
      console.error("❌ Erro na query:", err);
      throw err;
    });
}

export { db, execute };
