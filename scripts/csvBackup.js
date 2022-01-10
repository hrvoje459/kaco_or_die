const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "kaco",
  host: "postgre.local.hrvoje",
  database: "kaco_monitoring_db",
  password: "supertajnipass",
  port: 5432,
});

const fetchCSVFromDb = `
select 	power_plant.plant_id, power_plant.plant_name, power_plant.plant_type, power_plant.nominal_power, power_plant.deployment_date,
		person.person_id, person.first_name, person.last_name,
		data_entry.timestamp, data_entry.gen_volt1, data_entry.gen_volt2, data_entry.grid_volt1, data_entry.grid_volt2, data_entry.grid_volt3,
		data_entry.gen_cur1, data_entry.gen_cur2, data_entry.grid_cur1, data_entry.grid_cur2, data_entry.grid_cur3, data_entry.grid_pow,
		data_entry.device_temp, data_entry.device_status,
		location.location_id, location.country, location.district, location.city, location.post_number, location.address
	from power_plant 
		left join data_entry on power_plant.plant_id = data_entry.plant_id
		left join location on power_plant.location_id = location.location_id
		left join owned_by on power_plant.plant_id = owned_by.plant_id
		left join person on owned_by.person_id = person.person_id

`;

pool.query(fetchCSVFromDb, (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(res);
    /*res.rows.forEach((val) => {
      if (val) {
        console.log(val);
      }
    });*/
  }
});

//backup csva ide ovako: sa wsla se spojit na postgresql bazu sa psql naredbom
//psql -h postgre.local.hrvoje -U kaco -d kaco_monitoring_db
// koristeći dobrog usera
//potom pozvati
//\copy (select power_plant.plant_id, power_plant.plant_name, power_plant.plant_type, power_plant.nominal_power, power_plant.deployment_date,person.person_id, person.first_name, person.last_name,data_entry.timestamp, data_entry.gen_volt1, data_entry.gen_volt2, data_entry.grid_volt1, data_entry.grid_volt2, data_entry.grid_volt3,data_entry.gen_cur1, data_entry.gen_cur2, data_entry.grid_cur1, data_entry.grid_cur2, data_entry.grid_cur3, data_entry.grid_pow,data_entry.device_temp, data_entry.device_status,location.location_id, location.country, location.district, location.city, location.post_number, location.address from power_plant left join data_entry on power_plant.plant_id = data_entry.plant_id left join location on power_plant.location_id = location.location_id left join owned_by on power_plant.plant_id = owned_by.plant_id left join person on owned_by.person_id = person.person_id) To '~/test.csv' With CSV DELIMITER ',' HEADER;

//tu grdosiju
//to sprema datoteku u "~/test.csv" u wslu, znači na našoj mašini

//      psql postgresql://kaco:******@postgre.local.hrvoje:5432/kaco_monitoring_db -c "\copy (select power_plant.plant_id, power_plant.plant_name, power_plant.plant_type, power_plant.nominal_power, power_plant.deployment_date,person.person_id, person.first_name, person.last_name,data_entry.timestamp, data_entry.gen_volt1, data_entry.gen_volt2, data_entry.grid_volt1, data_entry.grid_volt2, data_entry.grid_volt3,data_entry.gen_cur1, data_entry.gen_cur2, data_entry.grid_cur1, data_entry.grid_cur2, data_entry.grid_cur3, data_entry.grid_pow,data_entry.device_temp, data_entry.device_status,location.location_id, location.country, location.district, location.city, location.post_number, location.address from power_plant left join data_entry on power_plant.plant_id = data_entry.plant_id left join location on power_plant.location_id = location.location_id left join owned_by on power_plant.plant_id = owned_by.plant_id left join person on owned_by.person_id = person.person_id) To '~/test.csv' With CSV DELIMITER ',' HEADER;"
