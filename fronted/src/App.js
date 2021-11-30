import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import "./App.css";
import axios from "axios";
import { format } from "timeago.js";
import SignUp from "./component/SignUp.component";
import SignIn from "./component/SignIn.component";

const App = () => {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [showsignIn, setShowsignIn] = useState(false);
  const [showsignUp, setShowsignUp] = useState(false);

  const [places, setPlaces] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setnewPlace] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 30.5595,
    longitude: 22.9375,
    zoom: 3,
  });
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const res = await axios.get("/places");
        setPlaces(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPlaces();
  }, []);
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...setViewport, latitude: lat, longitude: long });
  };
  const handleAddClick = (e) => {
    const [long, lat] = e.lngLat;
    setnewPlace({
      lat,
      long,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newnewPlace = {
      username: currentUser,
      title,
      description,
      rating,
      latitude: newPlace.lat,
      longitude: newPlace.long,
    };
    try {
      const res = await axios.post("/places", newnewPlace);
      setPlaces([...places, res.data]);
      setnewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };
  const handlesignout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  };
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/elisha123/ckwjw7mzj98hv14mp9rifi99c"
        onDblClick={handleAddClick}
        transitionDuration="200"
      >
        {places.map((p) => (
          <>
            <Marker
              latitude={p.latitude}
              longitude={p.longitude}
              offsetLeft={-viewport.zoom * 7}
              offsetTop={-viewport.zoom * 12}
            >
              <Room
                style={{
                  fontSize: viewport.zoom * 12,
                  color: p.username === currentUser ? "green" : "yellow",
                  cursor: "pointer",
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                latitude={p.latitude}
                longitude={p.longitude}
                closeButton={true}
                closeOnClick={false}
                anchor="bottom"
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="description">{p.description}</p>
                  <label>Information</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                  <span className="date">{format(p.createdAt)}</span>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<Star className="star" />)}
                  </div>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            anchor="top"
            onClose={() => setnewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter the place name"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea
                  placeholder="Add a review about this place"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
                <button className="submitButton" type="submit">
                  Add place
                </button>
              </form>
            </div>
          </Popup>
        )}
        {currentUser ? (
          <button className="button signout" onClick={handlesignout}>
            Sign Out
          </button>
        ) : (
          <div className="buttons ">
            <button
              className="button signin"
              onClick={() => setShowsignIn(true)}
            >
              Sign In
            </button>
            <button
              className="button signup"
              onClick={() => setShowsignUp(true)}
            >
              Sign Up
            </button>
          </div>
        )}

        <h1 className="logo">ED-MAP</h1>
        {showsignUp && <SignUp setShowsignUp={setShowsignUp} />}
        {showsignIn && (
          <SignIn
            setShowsignIn={setShowsignIn}
            myStorage={myStorage}
            setCurrentUser={setCurrentUser}
          />
        )}
      </ReactMapGL>
    </div>
  );
};
export default App;
