// App.js

import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detailfilm from './Componants/DetailFilm';
import Favories from './Componants/Favories';
import AccueilFilm from './Componants/AccueilFilm';
import NavSearch from './Componants/Header';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PagesEnConstruction from './Componants/PagesEnConstruction';
import Footer from './Componants/Footer';

function App() {
  const [showSearch, setShowSearch] = useState(false);

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavSearch onSearchClick={handleSearchClick} />
        <Routes>
          <Route path="/DétailFilm/:id" element={<Detailfilm />} />
          <Route path="/Favories" element={<Favories />} />
          <Route path="/" element={<AccueilFilm showSearch={showSearch} />} />
          <Route path='/PageEnConstruction' element={<PagesEnConstruction />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
