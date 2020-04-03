import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';
import { SocialIcon } from 'react-social-icons';

import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <Navbar className="alineacion-nav" >
      <Nav navbar>
        <NavItem >
        2020 Seguimiento de coronavirus <SourceLink>COVID-19</SourceLink>
          <SocialIcon target='_blank' url="https://twitter.com/josarta?lang=es" />
          <SocialIcon target='_blank' url="https://github.com/josarta" />
          <SocialIcon target='_blank' url="https://www.linkedin.com/in/josarta/" />
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
