import bg11Image from 'assets/img/logo/doc_covid.png';
import bg18Image from 'assets/img/logo/jl.jpg';
import { UserCard } from 'components/Card';
import { SocialIcon } from 'react-social-icons';

import React from 'react';

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardLink,
  CardText,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';

const Autores = () => {
  return (
   
       <Row>
        <Col md={6} sm={6} xs={12} className="mb-3">
          <CardLink target='_blank' href="http://qbk.zaitaniaingenieria.com">
            <CardImg className="doc-img" top src={bg11Image} />
            <CardBody>
              <CardTitle>Dr Covid</CardTitle>
              <CardText className="al-fin">
              Excelente contribucion, sigue su increible trabajo <SocialIcon target='_blank' url="https://www.facebook.com/drcovidcol/" />
              </CardText>
            </CardBody>
          </CardLink>
        </Col>

        <Col md={6} sm={6} xs={12} className="mb-3">
          <a target='_blank' className="a-efecto" href="https://www.linkedin.com/in/josarta/">
        <UserCard
            avatar={bg18Image}
            avatarSize={110}
            title="Desarrollador"
            subtitle="Jose Luis Sarta Alvarez."
            text="Encuentrame @josarta"
            style={{
              height: 300,
            }}
          />
          </a>
        </Col>
      </Row>

   
  );
};

export default Autores;
