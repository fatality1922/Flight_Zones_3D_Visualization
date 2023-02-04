import React, {useState, useEffect} from 'react';
import {render} from 'react-dom';
import {Map} from 'react-map-gl';
import {DeckGL}  from '@deck.gl/react';
import { GeoJsonLayer} from '@deck.gl/layers';
import axios from 'axios';

  const INITIAL_VIEW_STATE = {
      longitude: 19.612237060860284, 
      latitude: 52.023495199670975,
      zoom: 6,
      maxZoom: 20,
      pitch: 80,
      bearing: 0
  };


  
export default function App() {

  const [trueZones, setTrueZones] = useState({
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties":{
        "name":""},
      "geometry": {
        "coordinates": [],
        "type": "Polygon"
      }
    }
  ]
})

useEffect(() => {
  axios.get(process.env.REACT_APP_ZONESS)
    .then(res => {
      let zones_list = []
      res.data.map(zone => {
        zones_list.push({
          "uid": zone.uid,
          "type": "Feature",
          "zone_type": zone.type,
          "properties":{
            "name": zone.name,
            "color": [254,233,184,255],
            "min": zone.min,
            "max": zone.max
          },
      "geometry": {
        "coordinates": zone.geojson.coordinates,
        "type": zone.geojson.type
      }
        })
    })
        let full_zones = {type: "FeatureCollection", features: zones_list}
        setTrueZones(full_zones)
  })
  }, []);

  const colorify = (trueZones) => {
    trueZones.features.forEach(zone => {
      switch(zone.zone_type){
        case 'TSA': zone.properties.color = [255,0,42, 120] ;break;
        case "MRT" : zone.properties.color = [15,79,0, 120];break;
        case "DRAP" : zone.properties.color = [184, 6, 32, 0, 120];break;
        case "D" : zone.properties.color = [191, 22, 22, 120];break;
        case "R" : zone.properties.color = [255, 0, 42, 120];break;
        case "P" : zone.properties.color = [245, 121, 5, 120];break;
        case "DRAR" : zone.properties.color = [245, 39, 69, 120];break;
        case "DRAI" : zone.properties.color = [65, 167, 250, 120];break;
        case "TRA" : zone.properties.color = [199, 68, 165, 120];break;
        case "CTR1KM" : zone.properties.color = [255, 0, 0, 120];break;
        case "RPA" : zone.properties.color = [254, 133, 0, 120] ;break;
        case "CTR6KM" : zone.properties.color = [178, 92, 204, 120];break;
        case "CTR" : zone.properties.color = [15, 26, 217, 120];break;
        case "MCTR2KM" : zone.properties.color = [255, 0, 0, 120];break;
        case "MCTR" : zone.properties.color = [15, 79, 0, 120];break;
        case "ATZ1KM" : zone.properties.color = [255, 0, 0, 120];break;
        case "ATZ6KM" : zone.properties.color = [178, 92, 204, 120];break;
        case "ATZ" : zone.properties.color = [51, 35, 21, 120];break;
        case "NW" : zone.properties.color = [65, 167, 250, 120];break;
        case "AREA" : zone.properties.color = [5, 114, 125, 120];break;
        case "RMZ" : zone.properties.color = [201, 171, 252, 120];break;
        case "ADIZ" : zone.properties.color = [128, 128, 105, 120];break;
        case "TFR" : zone.properties.color = [255, 0, 42, 120];break;
        case "TMA" : zone.properties.color = [59, 136, 255, 120];break;
        case "MTMA" : zone.properties.color = [110, 199, 2, 120];break;
        default: zone.properties.color = [201, 171, 252, 120];
}
    });
  }

  const elevationafy = (trueZones) => {
    trueZones.features.forEach(zone => {
      zone.geometry.coordinates[0]?.forEach(coordinate => coordinate.push(zone.properties.min))
    })
  }

  elevationafy(trueZones)
  colorify(trueZones)


  
    const layer = new GeoJsonLayer({
    id: 'geojson-layer',
    data: trueZones,
    pickable: true,
    stroked: false,
    wireframe: true,
    filled: true,
    extruded: true,
    pointType: 'circle',
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: d => d.properties.color,
    getPointRadius: 100,
    lineWidthScale: 220,
    lineWidthMinPixels: 222,
    getElevation: d => d.properties.max
  });
    

  return (
    <div onContextMenu={evt => evt.preventDefault()}>
    <DeckGL  initialViewState={INITIAL_VIEW_STATE} maxPitch={80}
    controller={true} layers={[layer]}
    getTooltip={({object}) => object && (object.properties.name || object.properties.station)} >
      <Map mapboxAccessToken={process.env.REACT_APP_MBT}
       reuseMaps mapStyle={process.env.REACT_APP_MAPSTYLE}
       preventStyleDiffing 
       maxPitch={80}
       />
    </DeckGL>
    </div>
  );
}

export function renderToDOM(container) {
  render(<App />, container);
}