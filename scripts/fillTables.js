const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "kaco",
  host: "postgre.local.hrvoje",
  database: "kaco_monitoring_db",
  password: "supertajnipass",
  port: 5432,
});

const insertLocation =
  "INSERT INTO location(country, district, city, post_number, address) VALUES($1, $2, $3, $4, $5) RETURNING *";

const insertPerson =
  "INSERT INTO person(first_name, last_name) VALUES($1, $2) RETURNING *";

const insertPowerPlant =
  "INSERT INTO power_plant(plant_name, plant_type, nominal_power, deployment_date, location_id) VALUES($1, $2, $3, $4, $5) RETURNING *";

const insertOwnership =
  "INSERT INTO owned_by(plant_id, person_id) VALUES($1, $2) RETURNING *";

const locations = [
  [
    "Republika Hrvatska",
    "Sisačko-moslavačka",
    "Glina",
    "44400",
    "Moje selo 459",
  ],
  ["Republika Hrvatska", "Grad Zagreb", "Zagreb", "10000", "Unska ulica 3"],
];

const persons = [
  ["Hrvoje", "Rom"],
  ["Mile", "Ja"],
  ["Žarko", "Biser"],
];

const powerPlants = [
  ["Moje postrojenje", "kupac_s_vlastitom_proizvodnjom", 6500, new Date(), 1],
];

const ownership = [[1, 1]];

locations.forEach(loopInsertLocations);
persons.forEach(loopInsertPersons);
powerPlants.forEach(loopInsertPowerPlants);
ownership.forEach(loopInsertOwnership);

function loopInsertLocations(value) {
  pool.query(insertLocation, value, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(res.rows[0]);
    }
  });
}

function loopInsertPersons(value) {
  pool.query(insertPerson, value, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(res.rows[0]);
    }
  });
}

function loopInsertPowerPlants(value) {
  pool.query(insertPowerPlant, value, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(res.rows[0]);
    }
  });
}

function loopInsertOwnership(value) {
  pool.query(insertOwnership, value, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(res.rows[0]);
    }
  });
}
