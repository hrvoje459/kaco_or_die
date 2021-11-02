const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "kaco",
  host: "postgre.local.hrvoje",
  database: "kaco_monitoring_db",
  password: "supertajnipass",
  port: 5432,
});

const createTables = `CREATE TABLE person
(
  person_id SERIAL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (person_id)
);

CREATE TABLE location
(
  location_id SERIAL,
  country VARCHAR(255) NOT NULL,
  district VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  post_number INT NOT NULL,
  address VARCHAR(255) NOT NULL,
  PRIMARY KEY (location_id),
  UNIQUE (country, district, city, post_number, address)
);

CREATE TABLE power_plant
(
  plant_id SERIAL,
  plant_name VARCHAR(255) NOT NULL,
  plant_type VARCHAR(40) NOT NULL,
  nominal_power NUMERIC(10, 2) NOT NULL,
  deployment_date TIMESTAMP NOT NULL,
  location_id INT NOT NULL,
  PRIMARY KEY (plant_id),
  FOREIGN KEY (location_id) REFERENCES location(location_id),
  UNIQUE (plant_name)
);

CREATE TABLE owned_by
(
  plant_id INT NOT NULL,
  person_id INT NOT NULL,
  PRIMARY KEY (plant_id, person_id),
  FOREIGN KEY (plant_id) REFERENCES power_plant(plant_id),
  FOREIGN KEY (person_id) REFERENCES person(person_id)
);

CREATE TABLE data_entry
(
  timestamp TIMESTAMP NOT NULL,
  plant_id INT NOT NULL,
  gen_volt1 NUMERIC(10, 2) NOT NULL,
  gen_volt2 NUMERIC(10, 2) NOT NULL,
  grid_volt1 NUMERIC(10, 2) NOT NULL,
  grid_volt2 NUMERIC(10, 2) NOT NULL,
  grid_volt3 NUMERIC(10, 2) NOT NULL,
  gen_cur1 NUMERIC(10, 2) NOT NULL,
  gen_cur2 NUMERIC(10, 2) NOT NULL,
  grid_cur1 NUMERIC(10, 2) NOT NULL,
  grid_cur2 NUMERIC(10, 2) NOT NULL,
  grid_cur3 NUMERIC(10, 2) NOT NULL,
  grid_pow NUMERIC(10, 2) NOT NULL,
  device_temp NUMERIC(10, 2) NOT NULL,
  device_status VARCHAR(20) NOT NULL,
  PRIMARY KEY (timestamp, plant_id),
  FOREIGN KEY (plant_id) REFERENCES power_plant(plant_id)
);
`;

// async/await - check out a client
(async () => {
  const client = await pool.connect();
  try {
    const res1 = await client.query(createTables);
    console.log("tables should be successfully created");
  } finally {
    // Make sure to release the client before any error handling,
    // just in case the error handling itself throws an error.
    client.release();
  }
})().catch((err) => console.log(err.stack));
