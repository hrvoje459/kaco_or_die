import React from "react";
import { Card, Button } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

import { Link } from "react-router-dom";

function MyIndex() {
  return (
    <div className="index">
      <Card className="my_card_css">
        <Card.Content>
          <h1>kaco_or_die</h1>
          <h2>Solar power plant monitoring project</h2>
          <h3>Author: Hrvoje Rom</h3>
          <h2>
            License:{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/legalcode">
              Attribution-ShareAlike 4.0 International
            </a>
          </h2>
          <h3>Data model version: 1.0 </h3>
          <h3>Data language: Croatian</h3>
          <h3>
            Repo:{" "}
            <a href="https://github.com/hrvoje459/kaco_or_die">kaco_or_die</a>
          </h3>
          <h1>
            <Link to="/datatable">Interaktivno sučelje za dohvat podataka</Link>
          </h1>
          <a href="/kaco_monitoring_data.csv" target="_blank" download>
            <Button primary>Download JSON dump</Button>
          </a>
          <a href="/kaco_monitoring_data.json" target="_blank" download>
            <Button primary>Download CSV dump</Button>
          </a>
        </Card.Content>
      </Card>
    </div>
  );
}

export default MyIndex;
