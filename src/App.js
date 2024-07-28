import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detailfilm from './Componants/DetailFilm';
import DetailSerie from './Componants/DetailSerie'; // Assurez-vous que ce composant existe
import Favories from './Componants/Favories';
import AccueilFilm from './Componants/AccueilFilm';
import NavSearch from './Componants/Header';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PagesEnConstruction from './Componants/PagesEnConstruction';
import Footer from './Componants/Footer';
import RechercheGenre from './Componants/RechercheGenre';
import { Container } from 'react-bootstrap';
import SearchFilm from './Componants/SearchFilm';
import SeriesTV from './Componants/SeriesTV';
import RechercheSeries from './Componants/RechercheSeries';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <BrowserRouter>
        <NavSearch />
        <Container style={{ flex: 1, paddingTop: '20px' }}>
          <Routes>
            <Route path="/DétailFilm/:id" element={<Detailfilm />} />
            <Route path="/DétailSerie/:id" element={<DetailSerie />} />
            <Route path="/Favories" element={<Favories />} />
            <Route path="/" element={<AccueilFilm />} />
            <Route path='/PageEnConstruction' element={<PagesEnConstruction />} />
            <Route path='/recherche_genre' element={<RechercheGenre />} />
            <Route path='/recherche_par_titre' element={<SearchFilm />} />
            <Route path='/series_tv' element={<SeriesTV />} />
            <Route path='/series_recherche' element={<RechercheSeries />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
