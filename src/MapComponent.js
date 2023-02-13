import React, { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import { Map } from "react-map-gl";
import { DeckGL } from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import {
  colorZoneTypes,
  addBottomBorders,
  correctHeight,
  fetchZones,
} from "./functions.js";

const INITIAL_VIEW_STATE = {
  longitude: 19.612237060860284,
  latitude: 52.023495199670975,
  zoom: 6,
  maxZoom: 20,
  pitch: 80,
  bearing: 0,
};

export default function MapComponent(props) {
  const layerRef = useRef(null);
  const deckRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    fetchZones(props.setTrueZones);
  }, [props.setTrueZones]);

  addBottomBorders(props.trueZones);
  colorZoneTypes(props.trueZones);
  correctHeight(props.trueZones);

  const data2 = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          coordinates: [
            [
              [17.39570840745384, 53.66845965706776],
              [17.39570840745384, 51.00709419311397],
              [22.781191511573013, 51.00709419311397],
              [22.781191511573013, 53.66845965706776],
              [17.39570840745384, 53.66845965706776],
            ],
          ],
          type: "Polygon",
        },
      },
    ],
  };

  const layer = new GeoJsonLayer({
    id: "geojson-layer",
    data: props.trueZones,
    wireframe: false,
    filled: true,
    extruded: true,
    pickable: true,
    ref: layerRef,
    getFillColor: (d) => d.properties.color,
    getElevation: (d) => d.properties.fakeHeight,
  });
  const layer2 = new GeoJsonLayer({
    id: "geojson-layer2",
    data: data2,
    wireframe: false,
    filled: true,
    extruded: true,
    pickable: true,
    visible: visible,
    ref: layerRef,
    getFillColor: [0, 255, 255, 555],
  });

  const toggleLayerAndViewport = (e) => {
    console.log(e);
    setVisible(!visible);
  };

  return (
    <div onContextMenu={(evt) => evt.preventDefault()}>
      <DeckGL
        ref={deckRef}
        initialViewState={INITIAL_VIEW_STATE}
        maxPitch={90}
        controller={true}
        layers={[layer]}
        getTooltip={({ object }) =>
          object && (object.properties.name || object.properties.station)
        }
      >
        {/* <button onClick={(e) => toggleLayerAndViewport(e)}>
          Viewport and layer
        </button> */}
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
