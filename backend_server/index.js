const { Pool, Client } = require("pg");
const fs = require("fs");

const express = require("express");
const { brotliCompressSync } = require("zlib");
const app = express();

const PORT = process.env.PORT || 3001;

const pool = new Pool({
  user: "kaco",
  host: "postgre.local.hrvoje",
  database: "kaco_monitoring_db",
  password: "supertajnipass",
  port: 5432,
});

const fetchJsonFromDbFilterAny = `
select json_agg(r.json_build_object) from (
	select json_build_object(
	'power_plant', json_build_object('plant_id',power_plant.plant_id,
									'plant_name', power_plant.plant_name,
									'plant_type', power_plant.plant_type,
									'nominal_power', power_plant.nominal_power,
									'deployment_date', power_plant.deployment_date,
									'owners', (select json_agg((select person from person where person.person_id = owned_by.person_id))
											   		from owned_by 
											   		where power_plant.plant_id = owned_by.plant_id),
									'location', (select json_build_object('location_id',location.location_id,
																		  'country',location.country,
																		  'district',location.district,
																		  'city',location.city,
																		  'post_number',location.post_number,
																		  'address',location.address)
			 										from location 
			 										where location.location_id = power_plant.location_id),
									'data', (select json_agg(data_entry.*) 
			 									from data_entry  
			 									where data_entry.plant_id = power_plant.plant_id)
									))
from power_plant ) as r
`;

const fetchJsonFromDbFilterPlant = `
select json_agg(r.json_build_object) from (
	select json_build_object(
	'power_plant', json_build_object('plant_id',power_plant.plant_id,
									'plant_name', power_plant.plant_name,
									'plant_type', power_plant.plant_type,
									'nominal_power', power_plant.nominal_power,
									'deployment_date', power_plant.deployment_date,
									'owners', (select json_agg((select person from person where person.person_id = owned_by.person_id))
											   		from owned_by 
											   		where power_plant.plant_id = owned_by.plant_id),
									'location', (select json_build_object('location_id',location.location_id,
																		  'country',location.country,
																		  'district',location.district,
																		  'city',location.city,
																		  'post_number',location.post_number,
																		  'address',location.address)
			 										from location 
			 										where location.location_id = power_plant.location_id),
									'data', (select json_agg(data_entry.*) 
			 									from data_entry  
			 									where data_entry.plant_id = power_plant.plant_id)
									))
from power_plant where power_plant.plant_name like $1) as r
`;
const fetchJsonFromDbFilterPostNumber = `
select json_agg(r.json_build_object) from (
	select json_build_object(
	'power_plant', json_build_object('plant_id',power_plant.plant_id,
									'plant_name', power_plant.plant_name,
									'plant_type', power_plant.plant_type,
									'nominal_power', power_plant.nominal_power,
									'deployment_date', power_plant.deployment_date,
									'owners', (select json_agg((select person from person where person.person_id = owned_by.person_id))
											   		from owned_by 
											   		where power_plant.plant_id = owned_by.plant_id),
									'location', (select json_build_object('location_id',location.location_id,
																		  'country',location.country,
																		  'district',location.district,
																		  'city',location.city,
																		  'post_number',location.post_number,
																		  'address',location.address)
			 										from location 
			 										where location.location_id = power_plant.location_id),
									'data', (select json_agg(data_entry.*) 
			 									from data_entry  
			 									where data_entry.plant_id = power_plant.plant_id)
									))
from power_plant join location on power_plant.location_id = location.location_id where location.post_number = $1) as r
`;
const fetchJsonFromDbFilterNomPower = `
select json_agg(r.json_build_object) from (
	select json_build_object(
	'power_plant', json_build_object('plant_id',power_plant.plant_id,
									'plant_name', power_plant.plant_name,
									'plant_type', power_plant.plant_type,
									'nominal_power', power_plant.nominal_power,
									'deployment_date', power_plant.deployment_date,
									'owners', (select json_agg((select person from person where person.person_id = owned_by.person_id))
											   		from owned_by 
											   		where power_plant.plant_id = owned_by.plant_id),
									'location', (select json_build_object('location_id',location.location_id,
																		  'country',location.country,
																		  'district',location.district,
																		  'city',location.city,
																		  'post_number',location.post_number,
																		  'address',location.address)
			 										from location 
			 										where location.location_id = power_plant.location_id),
									'data', (select json_agg(data_entry.*) 
			 									from data_entry  
			 									where data_entry.plant_id = power_plant.plant_id)
									))
from power_plant where power_plant.nominal_power > $1 - 5 and power_plant.nominal_power < $1 + 5) as r
`;
const fetchJsonFromDbFilterOutPower = `
select json_agg(r.json_build_object) from (
	select json_build_object(
	'power_plant', json_build_object('plant_id',power_plant.plant_id,
									'plant_name', power_plant.plant_name,
									'plant_type', power_plant.plant_type,
									'nominal_power', power_plant.nominal_power,
									'deployment_date', power_plant.deployment_date,
									'owners', (select json_agg((select person from person where person.person_id = owned_by.person_id))
											   		from owned_by 
											   		where power_plant.plant_id = owned_by.plant_id),
									'location', (select json_build_object('location_id',location.location_id,
																		  'country',location.country,
																		  'district',location.district,
																		  'city',location.city,
																		  'post_number',location.post_number,
																		  'address',location.address)
			 										from location 
			 										where location.location_id = power_plant.location_id),
									'data', (select json_agg(data_entry.*) 
			 									from data_entry  
			 									where data_entry.plant_id = power_plant.plant_id 
											 		and data_entry.grid_pow > $1 - 5 
											 		and data_entry.grid_pow < $1 + 5)
									))
from power_plant ) as r
`;

app.use(express.static("public"));

app.get("/api", (req, res) => {
  console.log("PATTERN: " + req.query.pattern);
  console.log("What to search: " + req.query.what_search);

  let pattern = "";
  if (req.query.pattern) {
    pattern = req.query.pattern;
  }

  if (req.query.what_search == "post_number") {
    pool.query(fetchJsonFromDbFilterPostNumber, [pattern], (err, bes) => {
      if (err) {
        console.log(err.stack);
        res.status(500).send("Something broke!");
      } else {
        /*console.log(JSON.stringify(res.rows[0].json_build_object, null, 4));*/
        //console.log(JSON.stringify(bes.rows, null, 4));
        res.json(JSON.parse(JSON.stringify(bes.rows)));
      }
    });
  }
  if (req.query.what_search == "postrojenje") {
    pattern = "%" + pattern + "%";
    pool.query(fetchJsonFromDbFilterPlant, [pattern], (err, bes) => {
      if (err) {
        console.log(err.stack);
        res.status(500).send("Something broke!");
      } else {
        /*console.log(JSON.stringify(res.rows[0].json_build_object, null, 4));*/
        //console.log(JSON.stringify(bes.rows, null, 4));
        res.json(JSON.parse(JSON.stringify(bes.rows)));
      }
    });
  }
  if (req.query.what_search == "nom_power") {
    console.log("TUSAM");
    pool.query(fetchJsonFromDbFilterNomPower, [pattern], (err, bes) => {
      if (err) {
        console.log(err.stack);
        res.status(500).send("Something broke!");
      } else {
        /*console.log(JSON.stringify(res.rows[0].json_build_object, null, 4));*/
        //console.log(JSON.stringify(bes.rows, null, 4));
        res.json(JSON.parse(JSON.stringify(bes.rows)));
      }
    });
  }
  if (req.query.what_search == "out_power") {
    console.log("TUSAM");
    pool.query(fetchJsonFromDbFilterOutPower, [pattern], (err, bes) => {
      if (err) {
        console.log(err.stack);
        res.status(500).send("Something broke!");
      } else {
        /*console.log(JSON.stringify(res.rows[0].json_build_object, null, 4));*/
        //console.log(JSON.stringify(bes.rows, null, 4));
        res.json(JSON.parse(JSON.stringify(bes.rows)));
      }
    });
  }
  if (req.query.what_search == "any") {
    console.log("TUSAM");
    pool.query(fetchJsonFromDbFilterAny, (err, bes) => {
      if (err) {
        console.log(err.stack);
        res.status(500).send("Something broke!");
      } else {
        /*console.log(JSON.stringify(res.rows[0].json_build_object, null, 4));*/
        //console.log(JSON.stringify(bes.rows, null, 4));

        res.json(JSON.parse(JSON.stringify(bes.rows)));
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
