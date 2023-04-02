import React, { useState, useEffect } from 'react';
import { Map } from 'react-map-gl';
import { DeckGL } from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { fetchZones } from './functions.js';

const INITIAL_VIEW_STATE = {
  longitude: 19.612237060860284,
  latitude: 52.023495199670975,
  zoom: 6,
  maxZoom: 20,
  pitch: 80,
  bearing: 0,
};

function MapComponent(props) {
  useEffect(() => {
    fetchZones(props.setTrueZones);
  }, [props.setTrueZones]);

  const [visible, setVisible] = useState(true);

  const layers = Object.keys(props.trueZones.features).map((type) => {
    return new GeoJsonLayer({
      id: `${type}`,
      data: props.trueZones.features[type],
      wireframe: false,
      filled: true,
      extruded: true,
      pickable: true,
      visible: props.layersVisibility[type],
      // onClick: () => handleLayerClick(type),
      getFillColor: (d) => d.properties.color,
      getElevation: (d) => d.properties.fakeHeight,
    });
  });

  return (
    <div onContextMenu={(evt) => evt.preventDefault()}>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        maxPitch={80}
        controller={{
          touchRotate: true,
        }}
        layers={layers}
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

export default MapComponent;
