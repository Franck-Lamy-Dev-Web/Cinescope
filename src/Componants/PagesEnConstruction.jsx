import React from "react";
import ConstrucSite from '../assets/images/en_contruction.png';

function PagesEnConstruction() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Page en construction !</h1>
      <img 
        src={ConstrucSite} 
        alt="En construction" 
        style={{ display: 'block', margin: '0 auto', maxWidth: '100%', height: 'auto' }} 
      />
    </div>
  );
}

export default PagesEnConstruction;
