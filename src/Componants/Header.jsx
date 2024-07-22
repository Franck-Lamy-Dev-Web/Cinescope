import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import LogoCine from '../assets/images/logocinema.png';

function NavSearch({ onSearchClick }) {
  const navigate = useNavigate();

  const toHome = () => {
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="bg-navbar-black"> 
      <Container fluid>
        <Link to="/" className="imageLogo" onClick={toHome}>
          <img src={LogoCine} height="50px" alt="logo_cinema" />
        </Link>

        <Navbar.Brand as={Link} to="/" className="text-navbar-white">
          CinéScope
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0"  navbarScroll>
            <Nav.Link as={Link} to="/" className="text-navbar-white">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/Favories" className="text-navbar-white">Mes favoris</Nav.Link>
            <NavDropdown title={<span className="text-white">Recherche film:</span>} id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/recherche_par_titre">Par Titre</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/recherche_genre">Par Genre</NavDropdown.Item>
              {/* <NavDropdown.Item as={Link} to="/PageEnConstruction">Par Acteurs</NavDropdown.Item> */}
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/PageEnConstruction">Séries TV</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavSearch;
