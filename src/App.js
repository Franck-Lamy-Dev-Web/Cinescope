import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detailfilm from './Componants/DetailFilm';
import Favories from './Componants/Favories';
import AccueilFilm from './Componants/AccueilFilm';
import NavSearch from './Componants/Header';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PagesEnConstruction from './Componants/PagesEnConstruction';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavSearch/>

        <Routes>
          <Route path="/DétailFilm/:id" element={<Detailfilm />} />
          <Route path="/Favories" element={<Favories />} />
          <Route path="/" element={<AccueilFilm />} />
          <Route path='/PageEnConstruction' element={<PagesEnConstruction/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
