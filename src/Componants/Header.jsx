import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import SearchFilm from './SearchFilm';

function NavSearch() {
  const navigate = useNavigate();

  const toHome = () => {
    navigate('/');
  }

  return (
    <Navbar expand="lg" className="bg-NavBar - bg-black ">
      <Container fluid>
        <img className="imageLogo" onClick={toHome} src="https://th.bing.com/th/id/OIP.9JGHHeo1bWVfho4UWckMTwHaHa?rs=1&pid=ImgDetMain" height={"60px"} alt="logo" />
        <Navbar.Brand href="/" className="text-navbar-white">CinéScope</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link href="/" className="text-navbar-white" >Home</Nav.Link>
            <Nav.Link href="/Favories" className="text-navbar-white">Mes favories</Nav.Link>
            <NavDropdown title={<span className="text-white">Plus</span>} id="navbarScrollingDropdown" >
              <NavDropdown.Item href="/PageEnConstruction" >Séries TV</NavDropdown.Item>
              <NavDropdown.Item href="/PageEnConstruction">Recherche par acteurs</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/PageEnConstruction">Recherche par genre</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form className="d-flex">
            <Form.Control type="search" placeholder="Recherche par titre" className="me-2" aria-label="Search" onChange={SearchFilm} />
            <Button variant="outline-success" className='bg-button-gray'>Recherche</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavSearch;
