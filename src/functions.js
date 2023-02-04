export const colorZoneTypes = (trueZones) => {
  trueZones.features.forEach((zone) => {
    switch (zone.zone_type) {
      case "TSA":
        zone.properties.color = [255, 0, 42, 120];
        break;
      case "MRT":
        zone.properties.color = [15, 79, 0, 120];
        break;
      case "DRAP":
        zone.properties.color = [184, 6, 32, 0, 120];
        break;
      case "D":
        zone.properties.color = [191, 22, 22, 120];
        break;
      case "R":
        zone.properties.color = [255, 0, 42, 120];
        break;
      case "P":
        zone.properties.color = [245, 121, 5, 120];
        break;
      case "DRAR":
        zone.properties.color = [245, 39, 69, 120];
        break;
      case "DRAI":
        zone.properties.color = [65, 167, 250, 120];
        break;
      case "TRA":
        zone.properties.color = [199, 68, 165, 120];
        break;
      case "CTR1KM":
        zone.properties.color = [255, 0, 0, 120];
        break;
      case "RPA":
        zone.properties.color = [254, 133, 0, 120];
        break;
      case "CTR6KM":
        zone.properties.color = [178, 92, 204, 120];
        break;
      case "CTR":
        zone.properties.color = [15, 26, 217, 120];
        break;
      case "MCTR2KM":
        zone.properties.color = [255, 0, 0, 120];
        break;
      case "MCTR":
        zone.properties.color = [15, 79, 0, 120];
        break;
      case "ATZ1KM":
        zone.properties.color = [255, 0, 0, 120];
        break;
      case "ATZ6KM":
        zone.properties.color = [178, 92, 204, 120];
        break;
      case "ATZ":
        zone.properties.color = [51, 35, 21, 120];
        break;
      case "NW":
        zone.properties.color = [65, 167, 250, 120];
        break;
      case "AREA":
        zone.properties.color = [5, 114, 125, 120];
        break;
      case "RMZ":
        zone.properties.color = [201, 171, 252, 120];
        break;
      case "ADIZ":
        zone.properties.color = [128, 128, 105, 120];
        break;
      case "TFR":
        zone.properties.color = [255, 0, 42, 120];
        break;
      case "TMA":
        zone.properties.color = [59, 136, 255, 120];
        break;
      case "MTMA":
        zone.properties.color = [110, 199, 2, 120];
        break;
      default:
        zone.properties.color = [201, 171, 252, 120];
    }
  });
};
//add color to zones properties depend on them type
export const correctHeight = (trueZones) => {
  trueZones.features.forEach((zone) => {
    switch (zone.zone_type) {
      case "TSA":
        zone.properties.fakeHeight = zone.properties.max - 24;
        break;
      case "MRT":
        zone.properties.fakeHeight = zone.properties.max - 22;
        break;
      case "DRAP":
        zone.properties.fakeHeight = zone.properties.max - 20;
        break;
      case "D":
        zone.properties.fakeHeight = zone.properties.max - 18;
        break;
      case "R":
        zone.properties.fakeHeight = zone.properties.max - 16;
        break;
      case "P":
        zone.properties.fakeHeight = zone.properties.max - 14;
        break;
      case "DRAR":
        zone.properties.fakeHeight = zone.properties.max - 12;
        break;
      case "DRAI":
        zone.properties.fakeHeight = zone.properties.max - 10;
        break;
      case "TRA":
        zone.properties.fakeHeight = zone.properties.max - 8;
        break;
      case "CTR1KM":
        zone.properties.fakeHeight = zone.properties.max - 6;
        break;
      case "RPA":
        zone.properties.fakeHeight = zone.properties.max - 4;
        break;
      case "CTR6KM":
        zone.properties.fakeHeight = zone.properties.max - 2;
        break;
      case "CTR":
        zone.properties.fakeHeight = zone.properties.max;
        break;
      case "MCTR2KM":
        zone.properties.fakeHeight = zone.properties.max + 2;
        break;
      case "MCTR":
        zone.properties.fakeHeight = zone.properties.max + 4;
        break;
      case "ATZ1KM":
        zone.properties.fakeHeight = zone.properties.max + 6;
        break;
      case "ATZ6KM":
        zone.properties.fakeHeight = zone.properties.max + 8;
        break;
      case "ATZ":
        zone.properties.fakeHeight = zone.properties.max + 10;
        break;
      case "NW":
        zone.properties.fakeHeight = zone.properties.max + 12;
        break;
      case "AREA":
        zone.properties.fakeHeight = zone.properties.max + 14;
        break;
      case "RMZ":
        zone.properties.fakeHeight = zone.properties.max + 16;
        break;
      case "ADIZ":
        zone.properties.fakeHeight = zone.properties.max + 18;
        break;
      case "TFR":
        zone.properties.fakeHeight = zone.properties.max + 20;
        break;
      case "TMA":
        zone.properties.fakeHeight = zone.properties.max + 22;
        break;
      case "MTMA":
        zone.properties.fakeHeight = zone.properties.max + 24;
        break;
      default:
        zone.properties.fakeHeight = zone.properties.max + 26;
    }
  });
};
//diversify height of equal zones to make them more visible using fakeHeight parameter.
// This parameter is only used to prevent bugs in 3D display when zones are equal in some altitudes
// and has minimal influence on correct visualization of the zones

export const addBottomBorders = (trueZones) => {
  trueZones.features.forEach((zone) => {
    zone.geometry.coordinates[0]?.forEach((coordinate) =>
      coordinate.push(zone.properties.min)
    );
  });
};
//add third parameter to every point in geoJSON to make bottom border instead of every zone
//starting from the ground, Sample geoJSON point before: [X: 20, Y: 50], after: [X: 20, Y: 50, Z: 10]

// export const deleteZones = (trueZones) => {
//   trueZones.features.forEach(function (zone) {
//     switch (zone.zone_type) {
//       case "TSA":
//         const temp = trueZones;
//         temp.features.splice(22, 123);
//         setTrueZones(temp);
//         console.log(trueZones);

//         break;
//       case "MRT":
//         const temp2 = trueZones;
//         temp.features.splice(22, 123);
//         setTrueZones(temp2);
//         console.log(trueZones);
//         break;
//       default:
//         return;
//     }
//   });
// };
