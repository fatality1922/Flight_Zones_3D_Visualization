import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Map } from "react-map-gl";
import { DeckGL } from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import {
  colorZoneTypes,
  addBottomBorders,
  correctHeight,
  fetchZones,
  deleteZones,
} from "./functions.js";
import Hammer from "react-hammerjs";
import { Deck } from "@deck.gl/core";

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
    fetchZones(props.setTrueZones);
  }, [props.setTrueZones]);

  const layer = new GeoJsonLayer({
    id: "geojson-layer",
    data: props.trueZones,
    wireframe: false,
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
      {/* </Hammer> */}
    </div>
  );
}

export function renderToDOM(container) {
  render(<MapComponent />, container);
}
