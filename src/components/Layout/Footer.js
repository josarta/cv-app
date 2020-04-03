import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';


import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <Navbar className="alineacion-nav" >
       <hr/>
      <Nav navbar>
        <NavItem >
        2020 Seguimiento de coronavirus <SourceLink>COVID-19</SourceLink>
          </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
