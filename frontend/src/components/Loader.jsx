import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';


const Loader = () => {
  return (
    <>
        <div style={{width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <CircularProgress color="secondary" />
      </div>
    </>
  )
}

export default Loader
