import React from "react";
import { Card } from 'react-bootstrap';


function Footer(){
return(
    <Card style={{ width: '100%' }}>
    <Card.Body>
      <Card.Title>Crédit:</Card.Title>
      <Card.Text>
        This product uses the TMDb API but is not endorsed or certified by TMDb.ple text to build on the card title and make up the bulk of the  This product uses the TMDb API but is not endorsed or certified by TMDb.
        <br/>
        Ce produit utilise l'API de TMDb mais n'est ni approuvé ni certifié par TMDb.

      </Card.Text>
    </Card.Body>
    <Card.Footer as="div">
      &copy; {new Date().getFullYear()} Franck Lamy. Tous droits réservés.
    </Card.Footer>
  </Card>);
}

export default Footer;