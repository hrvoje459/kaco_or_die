import { React, useEffect, useState } from "react";
import { Card, Button } from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";

import "semantic-ui-css/semantic.min.css";

import { Link } from "react-router-dom";

function MyIndex() {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    getAccessTokenWithPopup,
  } = useAuth0();

  const refresh = async () => {
    try {
      const accessToken = await getAccessTokenWithPopup({
        audience: `http://localhost:3000/refresh`,
        scope: "read:current_user",
      });

      const osvjezi_preslike = "http://localhost:3000/authorized";
      fetch(osvjezi_preslike, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.text())
        .then((data) => console.log(data));
    } catch (e) {
      console.log(e);
    }
  };

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
            <Link to="/datatable.html">
              Interaktivno sučelje za dohvat podataka
            </Link>
          </h1>
          <div className="login_redak">
            <div>
              <a href="/kaco_monitoring_data.csv" target="_blank" download>
                <Button primary>Download CSV dump</Button>
              </a>
              <a href="/kaco_monitoring_data.json" target="_blank" download>
                <Button primary>Download JSON dump</Button>
              </a>
            </div>
            {isAuthenticated ? (
              <></>
            ) : (
              <Button
                className="login_button"
                inverted
                color="violet"
                onClick={() => loginWithRedirect()}
              >
                Log In
              </Button>
            )}
          </div>{" "}
          <div className="preslika_profil_redak">
            {isLoading ? (
              <Button basic loading>
                Loading
              </Button>
            ) : (
              <>
                {isAuthenticated ? (
                  <>
                    <div>
                      <Button color="red" onClick={refresh}>
                        Osvježi presliku JSON-a
                      </Button>

                      <Link to="/profile.html">
                        <Button secondary>Korisnički profil</Button>
                      </Link>
                    </div>
                    <div>
                      <Button
                        className="logout_button"
                        color="grey"
                        onClick={() =>
                          logout({
                            returnTo: window.location.origin,
                            localOnly: true,
                          })
                        }
                      >
                        Log Out
                      </Button>
                      <Button
                        className="logout_button"
                        color="red"
                        onClick={() =>
                          logout({
                            returnTo: "http://localhost:3000/index.html",
                          })
                        }
                      >
                        Log Out 4 Real
                      </Button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}

export default MyIndex;
