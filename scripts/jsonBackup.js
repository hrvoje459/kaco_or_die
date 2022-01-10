const { Pool, Client } = require("pg");
const fs = require("fs");

const pool = new Pool({
  user: "kaco",
  host: "postgre.local.hrvoje",
  database: "kaco_monitoring_db",
  password: "supertajnipass",
  port: 5432,
});

const fetchJsonFromDb = `
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

pool.query(fetchJsonFromDb, (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    /*console.log(JSON.stringify(res.rows[0].json_build_object, null, 4));*/
    console.log(JSON.stringify(res.rows, null, 4));
    fs.writeFile(
      "../frontend_client/public/kaco_monitoring_data.json",
      /*JSON.stringify(res.rows[0].json_build_object, null, 4),*/
      JSON.stringify(res.rows, null, 4),
      function (err) {
        if (err) throw err;
        console.log("Saved!");
      }
    );
  }
});
