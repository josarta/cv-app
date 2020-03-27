import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          2020 Seguimiento de coronavirus COVID-19 <SourceLink>Implementado: josarta@misena.edu.co</SourceLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
