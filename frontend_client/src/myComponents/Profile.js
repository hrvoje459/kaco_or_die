import React from "react";
import { Card, Button } from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="index ">
      <Card className="my_card_css">
        <Card.Content>
          {isAuthenticated ? (
            <>
              <img
                className="profilna_slika"
                src={user.picture}
                alt={user.name}
              />
              <h2>{user.nickname}</h2>
              <p>{user.email}</p>
              <Link to="/index.html">
                <Button color="">Back to index</Button>
              </Link>
            </>
          ) : (
            <div className="login_redak">
              A di ćeš neulogiran, ajde nati gumb pa se ti lijepo ulogiraj
              <Button
                className="login_button"
                inverted
                color="violet"
                onClick={() =>
                  loginWithRedirect({
                    redirectUri: "http://localhost:3000/profile.html",
                  })
                }
              >
                Log In
              </Button>
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default Profile;
