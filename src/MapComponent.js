import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Map } from "react-map-gl";
import { DeckGL } from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import {
  colorZoneTypes,
  addBottomBorders,
  correctHeight,
  // deleteZones,
} from "./functions.js";
import axios from "axios";

const INITIAL_VIEW_STATE = {
  longitude: 19.612237060860284,
  latitude: 52.023495199670975,
  zoom: 6,
  maxZoom: 20,
  pitch: 80,
  bearing: 0,
};

export default function MapComponent(props) {
  useEffect(() => {
    axios.get(process.env.REACT_APP_ZONESS).then((res) => {
      let zones_list = [];
      res.data.map((zone) => {
        zones_list.push({
          uid: zone.uid,
          type: "Feature",
          zone_type: zone.type,
          properties: {
            name: zone.name,
            color: [254, 233, 184, 255],
            min: zone.min,
            max: zone.max,
            fakeHeight: 0,
          },
          geometry: {
            coordinates: zone.geojson.coordinates,
            type: zone.geojson.type,
          },
        });
      });
      let full_zones = { type: "FeatureCollection", features: zones_list };
      props.setTrueZones(full_zones);
    });
  }, []);

  const layer = new GeoJsonLayer({
    id: "geojson-layer",
    data: props.trueZones,
    wireframe: true,
    filled: true,
    extruded: true,
    pickable: true,
    getFillColor: (d) => d.properties.color,
    getElevation: (d) => d.properties.fakeHeight,
  });

  addBottomBorders(props.trueZones);
  colorZoneTypes(props.trueZones);
  correctHeight(props.trueZones);

  return (
    <div onContextMenu={(evt) => evt.preventDefault()}>
      <button
        style={{
          position: "fixed",
          width: "100px",
          height: "100px",
          zIndex: "999",
        }}
        // onClick={deleteZones(props.trueZones)}
      />
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        maxPitch={80}
        controller={true}
        layers={[layer]}
        getTooltip={({ object }) =>
          object && (object.properties.name || object.properties.station)
        }
      >
        <Map
          mapboxAccessToken={process.env.REACT_APP_MBT}
          reuseMaps
          mapStyle={process.env.REACT_APP_MAPSTYLE}
          preventStyleDiffing
          maxPitch={80}
        />
      </DeckGL>
    </div>
  );
}

export function renderToDOM(container) {
  render(<MapComponent />, container);
}
