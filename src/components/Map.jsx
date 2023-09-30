/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../css/Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCitiesContext } from "../contexts/CitiesContext";

function Map() {
  const [searchParam] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([64, 28]);
  const { cities } = useCitiesContext();
  const cityLat = searchParam.get("lat");
  const cityLng = searchParam.get("lng");

  useEffect(() => {
    if ((cityLat, cityLng)) setMapPosition([cityLat, cityLng]);
  }, [cityLat, cityLng]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={5}
        // if true, map  zoom in or out upon mouse wheel scroll
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* making marker for each city in the cities array */}
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        {/* if mapPosition state updated, ChangeCenter component will be rerendered with new position */}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// by default, the data change which used in leaflet component does not actually rerender the component, we  have to make custome componet to change the view

const ChangeCenter = ({ position }) => {
  // use map hook gives the current instance of map component
  const map = useMap();
  // setView() method of map rerender the map based on given data
  map.setView(position);
  // it is a component it must return something
  return null;
};

// compoent to delect clive event from Map compoent

const DetectClick = () => {
  const navigate = useNavigate();
  // useMapEvents() is a hook provided by leaflet, which takes argument as an opject where key is the event name and value is call back function for some action
  useMapEvents({
    click: (e) => navigate(`form?${e.latlng.lat}&${e.latlng.lng}`),
  });
};

export default Map;
