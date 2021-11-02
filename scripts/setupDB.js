const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "bazepodataka",
  port: 5432,
});

const test = "SELECT NOW()";
const createNewDatabaseQuery = "CREATE DATABASE kaco_monitoring_db";
const createNewUserQuery =
  "CREATE USER kaco WITH ENCRYPTED PASSWORD 'supertajnipass';";
const grantPrivilegesQuery =
  "GRANT ALL PRIVILEGES ON DATABASE kaco_monitoring_db TO kaco;";

// async/await - check out a client
(async () => {
  const client = await pool.connect();
  try {
    const res1 = await client.query(test);
    console.log("test: " + res1.rows[0]);
    const res2 = await client.query(createNewDatabaseQuery);
    console.log("create new database: " + res2);
    const res3 = await client.query(createNewUserQuery);
    console.log("create new user: " + res3);
    const res4 = await client.query(grantPrivilegesQuery);
    console.log("grant privileges: " + res4);
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release();
  }
})().catch((err) => console.log(err.stack));
