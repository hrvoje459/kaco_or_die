import React from "react";
import {
  List,
  Button,
  Label,
  Grid,
  Icon,
  Menu,
  Table,
} from "semantic-ui-react";
import { useEffect, useState } from "react";

import Forma from "./Forma.js";

function DataTable() {
  const [data_entries, setData_entries] = useState("");
  const [listItems, setListItems] = useState("");

  let baseUrl = "http://localhost:3001";

  /*useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
      accepts: "application/json",
    };
    fetch("/api?what_search=any", requestOptions)
      //fetch("/kaco_data.json", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setData_entries(JSON.parse(result)[0].json_agg);
        console.log(JSON.parse(result)[0].json_agg);
      })
      .catch((error) => console.log("error", error));
  }, []);*/

  useEffect(() => {
    console.log(data_entries);

    let retci;

    if (data_entries != "" && data_entries != null) {
      retci = data_entries.map((entry) => {
        console.log("entry");
        console.log(entry.power_plant);
        var plant_name = entry.power_plant.plant_name;
        var post_number = entry.power_plant.location.post_number;
        var nominal_power = entry.power_plant.nominal_power;

        console.log(plant_name + nominal_power);

        if (entry.power_plant.data == null) {
          return;
        }

        var data = entry.power_plant.data;
        console.log(data);

        return data.map((data_entry, index) => {
          var timestamp = data_entry.timestamp;
          var grid_pow = data_entry.grid_pow;
          var device_temp = data_entry.device_temp;
          var device_status = data_entry.device_status;

          var plant_id = data_entry.plant_id;
          var gen_volt1 = data_entry.gen_volt1;
          var gen_volt2 = data_entry.gen_volt2;
          var grid_volt1 = data_entry.grid_volt1;
          var grid_volt2 = data_entry.grid_volt2;
          var grid_volt3 = data_entry.grid_volt3;
          var gen_cur1 = data_entry.gen_cur1;
          var gen_cur2 = data_entry.gen_cur2;
          var grid_cur1 = data_entry.grid_cur1;
          var grid_cur2 = data_entry.grid_cur2;
          var grid_cur3 = data_entry.grid_cur3;

          return (
            <Table.Row key={plant_name + "" + timestamp}>
              <Table.Cell>{plant_name}</Table.Cell>
              <Table.Cell>{post_number}</Table.Cell>
              <Table.Cell>{nominal_power}</Table.Cell>
              <Table.Cell>{timestamp.toString()}</Table.Cell>
              <Table.Cell>{grid_pow}</Table.Cell>
              <Table.Cell>{device_temp}</Table.Cell>
              <Table.Cell>{device_status}</Table.Cell>

              <Table.Cell>{gen_volt1}</Table.Cell>
              <Table.Cell>{gen_volt2}</Table.Cell>

              <Table.Cell>{grid_volt1}</Table.Cell>
              <Table.Cell>{grid_volt2}</Table.Cell>
              <Table.Cell>{grid_volt3}</Table.Cell>

              <Table.Cell>{gen_cur1}</Table.Cell>
              <Table.Cell>{gen_cur2}</Table.Cell>

              <Table.Cell>{grid_cur1}</Table.Cell>
              <Table.Cell>{grid_cur2}</Table.Cell>
              <Table.Cell>{grid_cur3}</Table.Cell>
            </Table.Row>
          );
        });
      });

      console.log(retci);
    }
    setListItems(retci);
  }, [data_entries]);

  const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };
  const exportToJson = (e) => {
    e.preventDefault();
    downloadFile({
      data: JSON.stringify(data_entries),
      fileName: "users.json",
      fileType: "text/json",
    });
  };

  const exportToCsv = (e) => {
    e.preventDefault();

    // Headers for each column
    let headers = [
      "Postrojenje, Poštanski broj, Nominana snaga, Vrijeme, Izlazna snaga, Temperatura, Status, Napon generatora 1, Napon generatora 2, Napon mreže 1, Napon mreže , Napon mreže 3, Struja generatora 1, Struja generaora 2, Struja mreže 1, Struja mreže 2, Struja mreže 3",
    ];

    // Convert users data to a csv
    let acc = [];

    if (data_entries != "") {
      data_entries.forEach((entry) => {
        const { plant_id, nominal_power, plant_name } = entry.power_plant;

        if (
          entry.power_plant.data == null ||
          entry.power_plant.data == undefined
        ) {
          return;
        }
        entry.power_plant.data.forEach((data_entri) => {
          const {
            timestamp,
            grid_pow,
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
            device_temp,
            device_status,
          } = data_entri;
          acc.push(
            [
              plant_name,
              entry.power_plant.location.post_number,
              nominal_power,
              timestamp,
              grid_pow,
              device_temp,
              device_status,
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
            ].join(",")
          );
        });
      }, []);

      downloadFile({
        data: [...headers, ...acc].join("\n"),
        fileName: "users.csv",
        fileType: "text/csv",
      });
    } else {
      console.log("nema podataka u tablici");
    }
  };
  return (
    <div className="datatable">
      {" "}
      <Forma postaviData={setData_entries}></Forma>
      <Button type="button" onClick={exportToJson}>
        Export to JSON
      </Button>
      <Button type="button" onClick={exportToCsv}>
        Export to CSV
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Postrojenje</Table.HeaderCell>
            <Table.HeaderCell>Poštanski broj</Table.HeaderCell>
            <Table.HeaderCell>Nominalna snaga</Table.HeaderCell>

            <Table.HeaderCell>Vrijeme</Table.HeaderCell>

            <Table.HeaderCell>Izlazna snaga</Table.HeaderCell>

            <Table.HeaderCell>Temperatura</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>

            <Table.HeaderCell>Napon generatora 1</Table.HeaderCell>
            <Table.HeaderCell>Napon generatora 2</Table.HeaderCell>

            <Table.HeaderCell>Napon mreže 1</Table.HeaderCell>
            <Table.HeaderCell>Napon mreže 2</Table.HeaderCell>
            <Table.HeaderCell>Napon mreže 3</Table.HeaderCell>

            <Table.HeaderCell>Struja generatora 1</Table.HeaderCell>
            <Table.HeaderCell>Struja generatora 2</Table.HeaderCell>

            <Table.HeaderCell>Struja mreže 1</Table.HeaderCell>
            <Table.HeaderCell>Struja mreže 2</Table.HeaderCell>
            <Table.HeaderCell>Struja mreže 3</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {listItems ? (
            listItems
          ) : (
            <Table.Row>
              <Table.Cell>Nema podataka</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}

export default DataTable;
