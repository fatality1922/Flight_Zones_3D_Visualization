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
  deleteZones,
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

  useEffect(() => {
    fetchZones(props.setTrueZones);
    // deckRef.current.deck.setProps({
    //   controller: { touchRotate: true },
    // });
    // console.log(deckRef.current.deck);
  }, [props.setTrueZones]);
  // useEffect(() => {
  //   deckRef.current.deck.setProps({
  //     controller: { touchRotate: true },
  //   });
  // }, []);

  // const layer = new GeoJsonLayer({
  //   id: "geojson-layer",
  //   data: props.trueZones,
  //   wireframe: false,
  //   filled: true,
  //   extruded: true,
  //   pickable: true,
  //   getFillColor: (d) => d.properties.color,
  //   getElevation: (d) => d.properties.fakeHeight,
  // });

  addBottomBorders(props.trueZones);
  colorZoneTypes(props.trueZones);
  correctHeight(props.trueZones);

  const data2 = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "",
        },
        geometry: {
          coordinates: [
            [17.39570840745384, 53.66845965706776],
            [17.39570840745384, 51.00709419311397],
            [22.781191511573013, 51.00709419311397],
            [22.781191511573013, 53.66845965706776],
            [17.39570840745384, 53.66845965706776],
          ],
          type: "Polygon",
        },
      },
    ],
  };

  const [stref, setStref] = useState();

  // let zones_list = props.trueZones.features.filter((zone) => {
  //   zone.zone_type === "TSA";
  // });
  // console.log(zones_list);

  // let zones_list = data2;
  // props.trueZones.features.forEach((zone) => {
  //   if (zone.zone_type === "TSA") {
  //     zones_list.features.push({
  //       uid: zone.uid,
  //       type: "Feature",
  //       zone_type: zone.type,
  //       properties: {
  //         name: zone.properties.name,
  //         color: [254, 233, 184, 270],
  //         min: zone.properties.min,
  //         max: zone.properties.max,
  //         fakeHeight: zone.properties.fakeHeight,
  //       },
  //       geometry: {
  //         coordinates: zone.geometry.coordinates,
  //         type: zone.geometry.coordinates.type,
  //       },
  //     });
  //   }
  // });
  // console.log(zones_list);
  // setStref(zones_list);

  const toggleLayerAndViewport = () => {
    deckRef.current.deck.setProps({
      layers: new GeoJsonLayer({
        id: "geojson-layer2",
        data: { data2 },
      }),
      controller: { touchRotate: true },
    });
    // deckRef.current.deck.setProps({
    //   controller: { touchRotate: true },
    // });
    // console.log(props.trueZones.features[1]);
  };

  return (
    <div onContextMenu={(evt) => evt.preventDefault()}>
      <DeckGL
        ref={deckRef}
        initialViewState={INITIAL_VIEW_STATE}
        maxPitch={90}
        controller={true}
        layers={[
          new GeoJsonLayer({
            id: "geojson-layer",
            data: props.trueZones,
            wireframe: false,
            filled: true,
            extruded: true,
            pickable: true,
            ref: layerRef,
            getFillColor: (d) => d.properties.color,
            getElevation: (d) => d.properties.fakeHeight,
          }),
        ]}
        getTooltip={({ object }) =>
          object && (object.properties.name || object.properties.station)
        }
      >
        <button onClick={toggleLayerAndViewport}>Viewport and layer</button>
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
