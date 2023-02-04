import React, { useState } from "react";
import MapComponent from "./MapComponent";
import CacheBuster from "react-cache-buster";
import version from "./Cache Buster/meta.json";

const App = () => {
  const [trueZones, setTrueZones] = useState({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "",
        },
        geometry: {
          coordinates: [],
          type: "Polygon",
        },
      },
    ],
  });

  console.log(version);
  return (
    <CacheBuster
      currentVersion={version}
      isEnable={true}
      isVerboseMode={false} //If true, the library writes verbose logs to console.
      metaFileDirectory={"."} //If public assets are hosted somewhere other than root on your server.
    >
      <MapComponent trueZones={trueZones} setTrueZones={setTrueZones} />
    </CacheBuster>
  );
};

export default App;
