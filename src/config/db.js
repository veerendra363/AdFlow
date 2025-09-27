import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",          // default postgres user
  host: "localhost",         // default host
  database: "adFlow",          // your db name
  password: "veltris@123",   // your password
  port: 5432,                // default postgres port
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ DB Connection Failed", err));

export default pool;