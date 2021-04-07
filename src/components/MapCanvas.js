import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  LayerGroup,
  LayersControl,
  ZoomControl,
  useMap,
  Marker,
  CircleMarker,
  Popup,
  Polygon,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Hidden } from "@material-ui/core";
import { TimelineSeparator } from "@material-ui/lab";
import L from "leaflet";
import bbox from "@turf/bbox";
import { lineString } from "@turf/helpers";
import { getCompartments } from "./API";

let icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

const DEFAULT_VIEWPORT = {
  //center: [50.06143, 19.93658],
  zoom: 13,
};

function swapBbox(bbox) {
  return [bbox[1], bbox[0], bbox[3], bbox[2]];
}

function ShowBbox() {
  const map = useMapEvent("moveend", () => {
    console.log(map.getBounds());
    getCompartments();
  });

  return null;
}

class MapCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      dane: "",
      zoom: "",
      center: [50.06143, 19.93658],
      bbox: swapBbox([19.7922355, 49.9676668, 20.2173455, 50.1261338]),
      poly: null,
      poly2: null,
    };
  }

  render() {
    return (
      <React.Fragment>
        <MapContainer
          id="map"
          center={this.state.center}
          zoom={DEFAULT_VIEWPORT.zoom}
          style={{ height: "100vh" }}
          //maxZoom={19}
          //animate="true"
          //ref={this.mapRef}
          //zoomControl={false}
        >
          <LayerGroup>
            <LayersControl position="topright">
              <LayersControl.BaseLayer name="osm" checked={true}>
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  //url="http://globalheat.strava.com/tiles/cycling/color7/color7/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>
            </LayersControl>
          </LayerGroup>

          <ShowBbox />
        </MapContainer>
      </React.Fragment>
    );
  }
}

export default MapCanvas;
