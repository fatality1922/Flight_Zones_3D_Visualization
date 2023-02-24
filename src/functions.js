import axios from 'axios';

const feetToMeters = (alt) => alt * 0.3048;

export const fetchZones = (setTrueZones) => {
  axios.get(process.env.REACT_APP_ZONESS).then((res) => {
    let zonesList = [];
    res.data.map((zone) => {
      if (!zonesList[zone.type]) {
        zonesList[zone.type] = {
          type: 'FeatureCollection',
          features: [],
        };
      }
      zone.geojson.coordinates[0]?.forEach((coordinate) =>
        coordinate.push(zone.min)
      );
      //add third parameter to every point in geoJSON to make bottom border instead of every zone
      //starting from the ground, Sample geoJSON point before: [X: 20, Y: 50], after: [X: 20, Y: 50, Z: 10]

      switch (zone.type) {
        case 'TSA':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [270, 0, 42, 70],
              //add color to zones properties depend on them type
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) - 24,
              //diversify height of equal zones to make them more visible using fakeHeight parameter.
              // This parameter is only used to prevent bugs in 3D display when zones are equal in some altitudes
              // and has minimal influence on correct visualization of the zones
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'MRT':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [15, 79, 0, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) - 22,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'DRAP':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [184, 6, 32, 0, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) - 20,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'D':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [191, 22, 22, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) - 18,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'R':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [270, 0, 42, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) - 16,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'P':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [245, 121, 5, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) - 14,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'DRAR':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [245, 39, 69, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) - 12,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'DRAI':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [65, 167, 250, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) - 10,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'TRA':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [199, 68, 165, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) - 8,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'CTR1KM':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [270, 0, 0, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) - 6,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'RPA':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [254, 133, 0, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) - 4,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'CTR6KM':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [178, 92, 204, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) - 2,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'CTR':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [15, 26, 217, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max),
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'MCTR2KM':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [270, 0, 0, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) + 2,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'MCTR':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [15, 79, 0, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) + 4,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'ATZ1KM':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [270, 0, 0, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) + 6,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'ATZ6KM':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [178, 92, 204, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) + 8,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'ATZ':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [51, 35, 21, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) + 10,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'NW':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [65, 167, 250, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) + 12,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'AREA':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [5, 114, 125, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) + 14,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'RMZ':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [201, 171, 252, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) + 16,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'ADIZ':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [240, 232, 0, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) + 18,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'TFR':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [270, 0, 42, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) + 20,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'TMA':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [59, 136, 270, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) + 22,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        case 'MTMA':
          zonesList[zone.type].features.push({
            uid: zone.uid,
            type: 'Feature',
            zone_type: zone.type,
            properties: {
              name: zone.name,
              color: [110, 199, 2, 70],
              min: feetToMeters(zone.min),
              max: feetToMeters(zone.max),
              fakeHeight: feetToMeters(zone.max) + 24,
            },
            geometry: {
              coordinates: zone.geojson.coordinates,
              type: zone.geojson.type,
            },
          });
          break;
        default:
      }
    });
    let full_zones = { type: 'FeatureCollection', features: zonesList };
    setTrueZones(full_zones);
  });
};
