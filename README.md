# kaco_or_die

Solar power plant monitoring project
</br></br>

<h1>Author: Hrvoje Rom</h1>

<h2>License: <a href = "https://creativecommons.org/licenses/by-sa/4.0/legalcode">Attribution-ShareAlike 4.0 International</a></h2>

<h2>Data model version: 1.0 </h2>

<h2>Data language: Croatian</h2>

Data entities found in dataset and their attributes:

- power_plant

  - plant_id: power plants unique identifier
  - plant_name: power plants name, nickname
  - plant*type: \_tba*
  - nominal_power: maximum power output of the power plant
  - deployment_date: time of deployment

</br>

- location
  - location_id: locations unique identifier
  - country, disctrict, city, post_number and address are all part of the unique location of the power plant, names are self explanatory
  - future filtering?

</br>

- person

  - person_id, first_name, last_name
  - self explanatory, used for determining ownership of the power plant

</br>

- data_entry / data
  - timestamp: time of measurement
  - plant_id: power plant identificator, primary key together with timestamp
  - gen_volt1: first generators voltage
  - gen_volt2: second generators voltage
  - grid_volt1: first grid voltage
  - grid_volt2: second grid voltage
  - grid_volt3: third grid voltage
  - gen_cur1: first generators current
  - gen_cur2: second generators current
  - grid_cur1: first grid current
  - grid_cur2: second grid current
  - grid_cur3: third grid current
  - grid_pow: total grid power output
  - device_temp: temperature of the device
  - device_status: power plant status

</br>
<h2>Useful resources:</h2>

[Link1](https://knx-user-forum.de/forum/%C3%B6ffentlicher-bereich/knx-eib-forum/964293-kaco-powador-wr-an-callidomus)

[Link2](https://www.123solar.org/phpBB/viewtopic.php?t=405)
