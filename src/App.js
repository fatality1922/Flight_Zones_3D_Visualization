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

const App = () => {
  const [trueZones, setTrueZones] = useState({
    type: 'FeatureCollection',
    features: [],
  });

  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <HelpIcon
        onClick={handleClickOpen}
        style={{
          zIndex: 9,
          position: 'fixed',
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
            Use Right Mouse Button to control the map
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
        <MapComponent trueZones={trueZones} setTrueZones={setTrueZones} />
      </CacheBuster>
    </div>
  );
};

export default App;
