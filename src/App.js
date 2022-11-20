import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ data: [] });

  const handleClick = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://api.github.com/users/${user}`, {
        headers: {
          Accept: "application/json",
        },
      });
      setData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center m-3">GitHub Api</h2>
      <div className="box">
        <div className="row g-3">
          <div className="col-auto">
            <input
              type="text"
              placeholder="Enter UserName"
              className="form-control"
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="spinner">
        {loading && (
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
      {console.log(data)}
      <div className="box user-details">
        <img src={data.avatar_url} alt={data.name} className="m-3 user-img" />
      </div>
      <div className="text-center">
        <h2>{data.name}</h2>
        <h6 className="mb-0 mt-2">
          {data.bio === null ? "Bio not defined" : data.bio}
        </h6>
        <h6 className="mb-0 mt-2">
          Location: {data.location === null ? "Not defined" : data.location}
        </h6>
        <h6 className="mb-0 mt-2">
          Twitter:{" "}
          {data.twitter_username === null
            ? "Not defined"
            : data.twitter_username}
        </h6>
        <h6 className="mb-0 mt-2">
          Blog: {data.blog === null ? "Not defined" : data.blog}
        </h6>
        <h6 className="mb-0 mt-2">
          GitHub Url: <a href={data.url}>{data.url}</a>
        </h6>
      </div>
    </div>
  );
}

export default App;
