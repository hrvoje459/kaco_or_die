const { Pool, Client } = require("pg");
const fs = require("fs");
var validation = require("validator");
const { exec } = require("child_process");

const express = require("express");
const { brotliCompressSync } = require("zlib");
const { type } = require("os");
const app = express();

var jwt = require("express-jwt");
var jwks = require("jwks-rsa");

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-uet71f9q.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "http://localhost:3000/refresh",
  issuer: "https://dev-uet71f9q.us.auth0.com/",
  algorithms: ["RS256"],
});

app.get("/authorized", jwtCheck, function (req, res) {
  exec("node ../scripts/jsonBackup.js", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    //console.log(`stdout: ${stdout}`);
  });
  /* exec(
    `sudo psql postgresql://kaco:supertajnipass@postgre.local.hrvoje:5432/kaco_monitoring_db -c "\copy (select power_plant.plant_id, power_plant.plant_name, power_plant.plant_type, power_plant.nominal_power, power_plant.deployment_date,person.person_id, person.first_name, person.last_name,data_entry.timestamp, data_entry.gen_volt1, data_entry.gen_volt2, data_entry.grid_volt1, data_entry.grid_volt2, data_entry.grid_volt3,data_entry.gen_cur1, data_entry.gen_cur2, data_entry.grid_cur1, data_entry.grid_cur2, data_entry.grid_cur3, data_entry.grid_pow,data_entry.device_temp, data_entry.device_status,location.location_id, location.country, location.district, location.city, location.post_number, location.address from power_plant left join data_entry on power_plant.plant_id = data_entry.plant_id left join location on power_plant.location_id = location.location_id left join owned_by on power_plant.plant_id = owned_by.plant_id left join person on owned_by.person_id = person.person_id) To '~/test.csv' With CSV DELIMITER ',' HEADER;"`,
    (error, stdout, stderr) => {
      if (error) {
        console.log("bio tu 1");
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log("bio tu 2");
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log("bio tu 3");
      console.log(`stdout: ${stdout}`);
    }
  ); */
  res.send("Secured Resource");
});

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

const fetchJsonFromDbFilterPlantPlantID = `
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
from power_plant where power_plant.plant_id = $1) as r
`;
const fetchPersonsFromDbAny = `
	select 
		json_agg(
			json_build_object(
				'person_id', person.person_id, 
				'first_name', person.first_name, 
				'last_name', person.last_name)) 
	from person;
`;
const fetchPersonsFromDbByID = `
	select 
		json_agg(
			json_build_object(
				'person_id', person.person_id, 
				'first_name', person.first_name, 
				'last_name', person.last_name)) 
	from person where person.person_id = $1
`;
const fetchLocationsFromDb = `
	select 
		json_agg(
			json_build_object(
			'location_id', location.location_id, 
			'country', location.country, 
			'district', location.district,
			'city', location.city,
			'post_number', location.post_number,
			'address', location.address
		))
	from location
`;

const insertNewPersonInDb = `
	insert into person 
		(first_name, last_name) 
	values ($1,$2)
`;

const updatePowerPlantNameInDb = `
UPDATE power_plant
	SET plant_name = $1
WHERE plant_id = $2;
`;

const deletePersonFromDb = `
	delete from person where person.person_id = $1;
`;

const isOwnerDbQuery = `
	select * from owned_by where person_id = $1;
`;

app.use(express.static("public"));

app.get("/power_plant", (req, res) => {
  pool.query(fetchJsonFromDbFilterAny, (err, bes) => {
    if (err) {
      console.log(err.stack);
      res.status(500).send("Error na bazi?");
    } else {
      /*console.log(JSON.stringify(res.rows[0].json_build_object, null, 4));*/
      //console.log(JSON.stringify(bes.rows, null, 4));
      if (bes.rows[0].json_agg == null) {
        res.status(404);
        res.setHeader("Content-Type", "application/json");
        res.json(
          JSON.parse(
            `{
			  "status": "Not Found",
			  "message": "Baza je vjerojatno prazna",
			  "reponse": null
			 }`
          )
        );
        return;
      }
      /* console.log(JSON.stringify(bes.rows[0].json_agg[0].power_plant)); */
      res.setHeader("Content-Type", "application/json");
      res.json(
        JSON.parse(
          "{" +
            '"status": "OK",' +
            '"message": "Evo sve",' +
            '"reponse": ' +
            JSON.stringify(bes.rows[0].json_agg) +
            "}"
        )
      );
    }
  });
});
app.get("/power_plant/:plant_id", (req, res) => {
  console.log("PATTERN: " + req.params.plant_id);

  console.log(parseInt(req.params.plant_id));
  console.log(parseInt(req.params.plant_id) == NaN);
  console.log(isNaN(parseInt(req.params.plant_id)));

  if (isNaN(parseInt(req.params.plant_id))) {
    console.log("nije broj");
    res.status(400);
    res.setHeader("Content-Type", "application/json");
    res.json(
      JSON.parse(
        `{
			"status": "Not Found",
			"message": "To nije broj !!",
			"reponse": null
		   }`
      )
    );
    return;
  }

  console.log("TUSAM");
  pool.query(
    fetchJsonFromDbFilterPlantPlantID,
    [req.params.plant_id],
    (err, bes) => {
      if (err) {
        console.log(err.stack);
        res.status(500).send("Error na bazi?");
      } else {
        /*console.log(JSON.stringify(res.rows[0].json_build_object, null, 4));*/
        //console.log(JSON.stringify(bes.rows, null, 4));
        if (bes.rows[0].json_agg == null) {
          res.status(404);
          res.setHeader("Content-Type", "application/json");
          res.json(
            JSON.parse(
              `{
			"status": "Not Found",
			"message": "Ne postoji postrojenje s tim ID-om",
			"reponse": null
		   }`
            )
          );
          return;
        }
        /* console.log(JSON.stringify(bes.rows[0].json_agg[0].power_plant)); */
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.json(
          JSON.parse(
            "{" +
              '"status": "OK",' +
              '"message": "Pronađeno postrojenje",' +
              '"reponse": ' +
              JSON.stringify(bes.rows[0].json_agg[0].power_plant) +
              "}"
          )
        );
      }
    }
  );
});

app.get("/person", (req, res) => {
  pool.query(fetchPersonsFromDbAny, (err, bes) => {
    if (err) {
      console.log(err.stack);
      res.status(500).send("Error na bazi?");
    } else {
      /*console.log(JSON.stringify(res.rows[0].json_build_object, null, 4));*/
      //console.log(JSON.stringify(bes.rows, null, 4));
      if (bes.rows[0].json_agg == null) {
        res.status(404);
        res.setHeader("Content-Type", "application/json");
        res.json(
          JSON.parse(
            `{
				"status": "Not Found",
				"message": "Baza je vjerojatno prazna",
				"reponse": null
			   }`
          )
        );
        return;
      }
      /* console.log(JSON.stringify(bes.rows[0].json_agg[0].power_plant)); */
      res.setHeader("Content-Type", "application/json");
      res.json(
        JSON.parse(
          "{" +
            '"status": "OK",' +
            '"message": "Evo osoba",' +
            '"reponse": ' +
            JSON.stringify(bes.rows[0].json_agg) +
            "}"
        )
      );
    }
  });
});
app.get("/person/:person_id", (req, res) => {
  console.log(parseInt(req.params.person_id));
  if (isNaN(parseInt(req.params.person_id))) {
    console.log("nije broj");
    res.status(400);
    res.setHeader("Content-Type", "application/json");
    res.json(
      JSON.parse(
        `{
			  "status": "Not Found",
			  "message": "To nije broj !!",
			  "reponse": null
			 }`
      )
    );
    return;
  }

  console.log("TUSAM");
  pool.query(
    fetchPersonsFromDbByID,
    [parseInt(req.params.person_id)],
    (err, bes) => {
      if (err) {
        console.log(err.stack);
        res.status(500).send("Error na bazi?");
      } else {
        /*console.log(JSON.stringify(res.rows[0].json_build_object, null, 4));*/
        //console.log(JSON.stringify(bes.rows, null, 4));
        if (bes.rows[0].json_agg == null) {
          res.status(404);
          res.setHeader("Content-Type", "application/json");
          res.json(
            JSON.parse(
              `{
			  "status": "Not Found",
			  "message": "Ne postoji osoba s tim ID-om ",
			  "reponse": null
			 }`
            )
          );
          return;
        }
        /* console.log(JSON.stringify(bes.rows[0].json_agg[0].power_plant)); */
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.json(
          JSON.parse(
            "{" +
              '"status": "OK",' +
              '"message": "Pronađena osoba",' +
              '"reponse": ' +
              JSON.stringify(bes.rows[0].json_agg[0]) +
              "}"
          )
        );
      }
    }
  );
});

app.get("/location", (req, res) => {
  pool.query(fetchLocationsFromDb, (err, bes) => {
    if (err) {
      console.log(err.stack);
      res.status(500).send("Error na bazi?");
    } else {
      /*console.log(JSON.stringify(res.rows[0].json_build_object, null, 4));*/
      //console.log(JSON.stringify(bes.rows, null, 4));
      if (bes.rows[0].json_agg == null) {
        res.status(404);
        res.setHeader("Content-Type", "application/json");
        res.json(
          JSON.parse(
            `{
				  "status": "Not Found",
				  "message": "Nema lokacija",
				  "reponse": null
				 }`
          )
        );
        return;
      }
      /* console.log(JSON.stringify(bes.rows[0].json_agg[0].power_plant)); */
      res.setHeader("Content-Type", "application/json");
      for (let index = 0; index < bes.rows[0].json_agg.length; index++) {
        // const element = array[index];

        bes.rows[0].json_agg[index]["@type"] = "postalAddress";
        bes.rows[0].json_agg[index]["@context"] = {};
        bes.rows[0].json_agg[index]["@context"]["@vocab"] =
          "https://schema.org/";
        bes.rows[0].json_agg[index]["@context"]["country"] = "addressCountry";
        bes.rows[0].json_agg[index]["@context"]["district"] = "addressRegion";
        bes.rows[0].json_agg[index]["@context"]["post_number"] = "postalCode";
        bes.rows[0].json_agg[index]["@context"]["address"] = "streetAddress";
        bes.rows[0].json_agg[index]["@context"]["city"] = "addressLocality";
      }
      res.json(
        JSON.parse(
          "{" +
            '"status": "OK",' +
            '"message": "Evo lokacije",' +
            '"reponse": ' +
            JSON.stringify(bes.rows[0].json_agg) +
            "}"
        )
      );
    }
  });
});

app.post("/person", (req, res) => {
  console.log(req.query.first_name + " " + req.query.last_name);
  if (req.query.first_name == "" || req.query.first_name == undefined) {
    res.status(400);
    res.setHeader("Content-Type", "application/json");
    res.json(
      JSON.parse(
        "{" +
          '"status": "Bad request",' +
          '"message": "Ime je obavezno! ",' +
          '"reponse": "Ime je obavezno! "' +
          "}"
      )
    );
    return;
  }
  console.log("=" + req.query.last_name + "=");
  if (req.query.last_name == "" || req.query.last_name == undefined) {
    res.status(400);
    res.setHeader("Content-Type", "application/json");
    res.json(
      JSON.parse(
        "{" +
          '"status": "Bad request",' +
          '"message": "Prezime je obavezno! ",' +
          '"reponse": "Prezime je obavezno! "' +
          "}"
      )
    );
    return;
  }
  if (
    !validation.isAlpha(req.query.first_name) ||
    !validation.isAlpha(req.query.last_name)
  ) {
    res.status(400);
    res.setHeader("Content-Type", "application/json");
    res.json(
      JSON.parse(
        "{" +
          '"status": "OK",' +
          '"message": "Ne prolazi validaciju! ",' +
          '"reponse": "Ime ili prezime sadrze znakove koji nisu tekst"' +
          "}"
      )
    );
    return;
  }
  pool.query(
    insertNewPersonInDb,
    [req.query.first_name, req.query.last_name],
    (err, bes) => {
      if (err) {
        console.log(err.stack);
        res.status(500).send("Error na bazi?");
      } else {
        console.log(bes);
        res.setHeader("Content-Type", "application/json");
        res.json(
          JSON.parse(
            "{" +
              '"status": "OK",' +
              '"message": "Nova osoba uspjesno dodana",' +
              '"reponse": "null"' +
              "}"
          )
        );
      }
    }
  );
});

app.put("/power_plant/:plant_id", (req, res) => {
  if (isNaN(parseInt(req.params.plant_id))) {
    console.log("nije broj");
    res.status(400);
    res.setHeader("Content-Type", "application/json");
    res.json(
      JSON.parse(
        `{
			"status": "Not Found",
			"message": "To nije broj !!",
			"reponse": null
		}`
      )
    );
    return;
  }
  if (req.query.plant_name == "" || req.query.plant_name == undefined) {
    res.status(400);
    res.setHeader("Content-Type", "application/json");
    res.json(
      JSON.parse(
        "{" +
          '"status": "Bad request",' +
          '"message": "Pa ak mjenjas ime, onda je ime obavezno ",' +
          '"reponse": "Dodaj ime u zahtjev"' +
          "}"
      )
    );
    return;
  }

  pool.query(
    fetchJsonFromDbFilterPlantPlantID,
    [req.params.plant_id],
    (err, bes) => {
      if (err) {
        console.log(err.stack);
        res.status(500).send("Error na bazi?");
      } else {
        /*console.log(JSON.stringify(res.rows[0].json_build_object, null, 4));*/
        //console.log(JSON.stringify(bes.rows, null, 4));
        if (bes.rows[0].json_agg == null) {
          res.status(404);
          res.setHeader("Content-Type", "application/json");
          res.json(
            JSON.parse(
              `{
			"status": "Not Found",
			"message": "Ne postoji postrojenje s tim ID-om, nije moguće promijeniti ime",
			"reponse": null
		   }`
            )
          );
          return;
        }
        /* console.log(JSON.stringify(bes.rows[0].json_agg[0].power_plant)); */

        ///
        pool.query(
          updatePowerPlantNameInDb,
          [req.query.plant_name, req.params.plant_id],
          (err, bes) => {
            if (err) {
              console.log(err.stack);
              res.status(500).send("Error na bazi?");
            } else {
              /*console.log(JSON.stringify(res.rows[0].json_build_object, null, 4));*/
              //console.log(JSON.stringify(bes.rows, null, 4));

              /* console.log(JSON.stringify(bes.rows[0].json_agg[0].power_plant)); */
              res.status(200);
              res.setHeader("Content-Type", "application/json");
              res.json(
                JSON.parse(
                  "{" +
                    '"status": "OK",' +
                    '"message": "Uspješno postavljeno ime postrojenja",' +
                    '"reponse": null' +
                    "}"
                )
              );
            }
          }
        );
      }
    }
  );
});

app.delete("/person/:person_id", (req, res) => {
  if (isNaN(parseInt(req.params.person_id))) {
    console.log("nije broj");
    res.status(400);
    res.setHeader("Content-Type", "application/json");
    res.json(
      JSON.parse(
        `{
				"status": "Not Found",
				"message": "To nije broj !!",
				"reponse": null
			   }`
      )
    );
    return;
  }

  console.log("TUSAM");
  pool.query(fetchPersonsFromDbByID, [req.params.person_id], (err, bes) => {
    if (err) {
      console.log(err.stack);
      res.status(500).send("Error na bazi?");
    } else {
      /*console.log(JSON.stringify(res.rows[0].json_build_object, null, 4));*/
      //console.log(JSON.stringify(bes.rows, null, 4));
      if (bes.rows[0].json_agg == null) {
        res.status(404);
        res.setHeader("Content-Type", "application/json");
        res.json(
          JSON.parse(
            `{
				"status": "Not Found",
				"message": "Ne postoji osoba s tim ID-om",
				"reponse": null
			   }`
          )
        );
        return;
      }
      /* console.log(JSON.stringify(bes.rows[0].json_agg[0].power_plant)); */

      pool.query(isOwnerDbQuery, [req.params.person_id], (err, bes) => {
        if (err) {
          console.log(err.stack);
          res.status(500).send("Error na bazi?");
        } else {
          console.log("BES ROWS" + bes.rows.length);
          if (bes.rows.length > 0) {
            res.status(400);
            res.setHeader("Content-Type", "application/json");
            res.json(
              JSON.parse(
                "{" +
                  '"status": "Bad request",' +
                  '"message": "Osoba je vlasnik postrojenja i nije ju moguće obrisati",' +
                  '"reponse": null' +
                  "}"
              )
            );
            return;
          } else {
            pool.query(
              deletePersonFromDb,
              [req.params.person_id],
              (err, bes) => {
                if (err) {
                  console.log(err.stack);
                  res.status(500).send("Error na bazi?");
                } else {
                  res.status(200);
                  res.setHeader("Content-Type", "application/json");
                  res.json(
                    JSON.parse(
                      "{" +
                        '"status": "OK",' +
                        '"message": "Uspješno obrisana osoba",' +
                        '"reponse": null' +
                        "}"
                    )
                  );
                }
              }
            );
          }
        }
      });
    }
  });
});

app.get("/openapi", (req, res) => {
  fs.readFile("../openapi.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.setHeader("Content-Type", "application/json");
    res.json(
      JSON.parse(
        "{" +
          '"status": "OK",' +
          '"message": "Evo openapi-a",' +
          '"reponse": ' +
          JSON.stringify(JSON.parse(data)) +
          "}"
      )
    );
    res.send();
  });
  /* res.status(200);
  res.setHeader("Content-Type", "application/json");
  res.json(
    JSON.parse(
      "{" +
        '"status": "OK",' +
        '"message": "Evo lokacije",' +
        '"reponse": ' +
        JSON.stringify(bes.rows[0].json_agg) +
        "}"
    )
  ); */
});

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
app.get("*", function (req, res) {
  res.status(404);
  res.json(
    JSON.parse(
      `{
		  "status": "Not Found",
		  "message": "Čini se da ova putanja nije implementirana",
		  "reponse": null
		 }`
    )
  );
});
app.post("*", function (req, res) {
  res.status(404);
  res.json(
    JSON.parse(
      `{
			"status": "Not Found",
			"message": "Čini se da ova putanja nije implementirana",
			"reponse": null
		   }`
    )
  );
});
app.put("*", function (req, res) {
  res.status(404);
  res.json(
    JSON.parse(
      `{
			"status": "Not Found",
			"message": "Čini se da ova putanja nije implementirana",
			"reponse": null
		   }`
    )
  );
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
