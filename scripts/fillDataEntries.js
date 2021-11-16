const { Pool, Client } = require("pg");
const fs = require("fs");

const pool = new Pool({
  user: "kaco",
  host: "postgre.local.hrvoje",
  database: "kaco_monitoring_db",
  password: "supertajnipass",
  port: 5432,
});

const insertDataEntry = `INSERT INTO data_entry(
	timestamp,
	gen_volt1,
	gen_volt2,
	grid_volt1,
	grid_volt2,
	grid_volt3,
	gen_cur1,
	gen_cur2,
	grid_cur1,
	grid_cur2,
	grid_cur3,
	grid_pow,
	device_temp,
	device_status,
	plant_id) VALUES(to_timestamp($1), $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`;

fs.readFile("../raw_data/scrape_01.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  //console.log(data);

  const mjerenja = data.split("\n");

  mjerenja.forEach((entry) => {
    let vrijednosti = entry.split(";");
    if (vrijednosti.length != 14) {
      return;
    }

    vrijednosti[1] = (vrijednosti[1] / 65535) * 1600;
    vrijednosti[2] = (vrijednosti[2] / 65535) * 1600;

    vrijednosti[3] = (vrijednosti[3] / 65535) * 1600;
    vrijednosti[4] = (vrijednosti[4] / 65535) * 1600;
    vrijednosti[5] = (vrijednosti[5] / 65535) * 1600;

    vrijednosti[6] = (vrijednosti[6] / 65535) * 200;
    vrijednosti[7] = (vrijednosti[7] / 65535) * 200;

    vrijednosti[8] = (vrijednosti[8] / 65535) * 200;
    vrijednosti[9] = (vrijednosti[9] / 65535) * 200;
    vrijednosti[10] = (vrijednosti[10] / 65535) * 200;

    vrijednosti[11] = (vrijednosti[11] / 65535) * 100000;

    vrijednosti[12] = vrijednosti[12] / 100;

    vrijednosti.push(3);

    pool.query(insertDataEntry, vrijednosti, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows[0]);
      }
    });
  });
});
/*
const insertLocation =
  "INSERT INTO location(country, district, city, post_number, address) VALUES($1, $2, $3, $4, $5) RETURNING *";

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

locations.forEach(loopInsertLocations);

function loopInsertLocations(value) {
  pool.query(insertLocation, value, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(res.rows[0]);
    }
  });
}*/
