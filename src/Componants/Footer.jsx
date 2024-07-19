import React from "react";
import { Card } from 'react-bootstrap';


function Footer(){
return(
    <Card style={{ width: '100%' }}>
    <Card.Body>
      <Card.Title>Crédit:</Card.Title>
      <Card.Text>
        Ce produit utilise l'API de TMDb mais n'est ni approuvé ni certifié par TMDb.

      </Card.Text>
    </Card.Body>
    <Card.Footer as="div">
      &copy; {new Date().getFullYear()} Franck Lamy. Tous droits réservés.
    </Card.Footer>
  </Card>);
}

export default Footer;