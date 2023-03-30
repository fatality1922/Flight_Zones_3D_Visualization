import React, { useState } from 'react';
import MapComponent from './MapComponent';
import CacheBuster from 'react-cache-buster';
import version from './Cache Buster/meta.json';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import gif from './gif.gif';
import HelpIcon from '@mui/icons-material/Help';
import { slide as Menu } from 'react-burger-menu';
import './App.css';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const App = () => {
  const [trueZones, setTrueZones] = useState({
    type: 'FeatureCollection',
    features: [],
  });

  const [open, setOpen] = React.useState(true);
  const [layersVisibility, setLayersVisibility] = useState({
    TSA: true,
    TRA: true,
    TMA: true,
    TFR: true,
    RPA: true,
    RMZ: true,
    R: true,
    P: true,
    NW: true,
    MTMA: true,
    MRT: true,
    MCTR2KM: true,
    MCTR: true,
    DRAR: true,
    DRAP: true,
    DRAI: true,
    D: true,
    CTR6KM: true,
    CTR1KM: true,
    CTR: true,
    ATZ6KM: true,
    ATZ1KM: true,
    ATZ: true,
    AREA: true,
    ADIZ: true,
  });
  const layersColors = {
    TSA: '#FF002A',
    TRA: '#C744A5',
    TMA: '#3B88FF',
    TFR: '#FF002A',
    RPA: '#ff7961',
    RMZ: '#C9ABFC',
    R: '#FF002A',
    P: '#f57905',
    NW: '#41a7fa',
    MTMA: '#6EC702',
    MRT: '#0F4F00',
    MCTR2KM: '#FF0000',
    MCTR: '#0F4F00',
    DRAR: '#f52745',
    DRAP: '#b80620',
    DRAI: '#41a7fa',
    D: '#BF1616',
    CTR6KM: '#B25CCC',
    CTR1KM: '#FF0000',
    CTR: '#0F1AD9',
    ATZ6KM: '#B25CCC',
    ATZ1KM: '#FF0000',
    ATZ: '#332315',
    AREA: '#05727D',
    ADIZ: '#808069',
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(process.env.REACT_APP_ZONESS);

  return (
    <div>
      <Menu>
        <h1>Change visibility of zones</h1>
        {Object.entries(layersVisibility).map(([key, value]) => (
          <FormControlLabel
            key={key}
            control={
              <Switch
                style={{ color: layersColors[key] }} // przypisanie niestandardowego koloru
                checked={value}
                onChange={(e) =>
                  setLayersVisibility((prev) => ({
                    ...prev,
                    [key]: e.target.checked,
                  }))
                }
              />
            }
            label={key}
          />
        ))}
      </Menu>

      <HelpIcon
        onClick={handleClickOpen}
        style={{
          zIndex: 9,
          cursor: 'pointer',
          width: '2em',
          height: '2em',
        }}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Info'}</DialogTitle>
        <DialogContent>
          <img
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            src={gif}
            alt="image"
          />
          <DialogContentText>
            Use Right Mouse Button to control the map.
          </DialogContentText>
          <DialogContentText>
            On mobile devices use 2 fingers to rotate horizontally and 3 fingers
            to rotate vertically.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
      <CacheBuster
        currentVersion={JSON.stringify(version)}
        isEnabled={true}
        isVerboseMode={false} //If true, the library writes verbose logs to console.
        metaFileDirectory={'.'} //If public assets are hosted somewhere other than root on your server.
      >
        <MapComponent
          trueZones={trueZones}
          setTrueZones={setTrueZones}
          layersVisibility={layersVisibility}
        />
      </CacheBuster>
    </div>
  );
};

export default App;
