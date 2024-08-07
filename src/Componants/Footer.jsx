import React from "react";
import { Card } from 'react-bootstrap';

function Footer() {
  return (
    <Card style={{ width: '100%', backgroundColor: 'black', color: 'white', border: 'none', textAlign: 'center' }}>
      <Card.Body>
        <Card.Title>Crédit:</Card.Title>
        <Card.Text>
          Ce produit utilise l'API de TMDb mais n'est ni approuvé ni certifié par TMDb.
        </Card.Text>
      </Card.Body>
      <Card.Footer as="div" style={{ backgroundColor: 'black', color: 'white', borderTop: '1px solid #333' }}>
        &copy; {new Date().getFullYear()} Franck Lamy. Tous droits réservés.
      </Card.Footer>
    </Card>
  );
}

export default Footer;
