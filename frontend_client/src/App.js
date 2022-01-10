import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import MyIndex from "./myComponents/MyIndex";
import DataTable from "./myComponents/DataTable";
import Profile from "./myComponents/Profile";

import { Helmet } from "react-helmet";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="Kaco data extraction webpage" />
        <meta
          name="keywords"
          content="KACO, solar, monitoring, energy, json, csv, open, source"
        />
        <meta name="author" content="Hrvoje Rom" />

        <title>kaco_or_die</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Link to="/index.html">
                <h1>Go to index</h1>
              </Link>
            }
          />
          <Route path="/index.html" element={<MyIndex />} />
          <Route path="/datatable.html" element={<DataTable />} />
          <Route path="/profile.html" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
