import MapWithBubbles from 'components/MapWithBubbles';
import Page from 'components/Page';
import CountryProgressTable from 'components/CountryProgressTable';
import { IconWidget, NumberWidget } from 'components/Widget';
import React from 'react';
import {
  MdSentimentSatisfied,
  MdPlace,
  MdEnhancedEncryption,
  MdWhatshot,
} from 'react-icons/md';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import { countryProgressTableData } from 'demos/dashboardCountry';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombrePaisActual:"Colombia",
      paisItemsOrdenados: [],
      paisItems: {},
      itemsTotalesFormateados: {},
      itemsTotales: {},
      iso2: "CO",
      iso3: "COL",
      paisItemsTotalesFormateados: {},
      paisItemsTotales: {},
    };
  }

  callback = (countrycode) => {
    let url = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest';
    let iso = 'iso3';
    let valueIso = countrycode.iso3;
    const request1 = new Request(
      url + '?' + iso + '=' + valueIso, {
      method: 'GET',
    });
    this.cargaIsoTotales(request1);
  }

  handleResponseError(response) {
    throw new Error("HTTP error, status = " + response.status);
  }
  handleError(error) {
    console.log(error.message);
  }

  cargaValoresTotales(request) {
    fetch(request)
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })
      .then(json => {
        let itemsTotalesFormateados =
        {
          "confirmed": json.hasOwnProperty('confirmed') ? json.confirmed.toLocaleString() : "0",
          "deaths": json.hasOwnProperty('deaths') ? json.deaths.toLocaleString() : "0",
          "recovered": json.hasOwnProperty('recovered') ? json.recovered.toLocaleString() : "0"
        };

        this.setState({
          itemsTotalesFormateados: itemsTotalesFormateados,
          itemsTotales: json
        })
        let url = 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest';
        let iso = 'iso3';
        let valueIso = 'COL';
        const request1 = new Request(
          url + '?' + iso + '=' + valueIso, {
          method: 'GET',
        });
        this.cargaIsoTotales(request1);

      })
      .catch(error => {
        this.handleError(error);
      });
  }

  cargaIsoTotales(request) {
    fetch(request)
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })
      .then(json => {
        let paisItemsTotalesFormateados =
        {
          "confirmed": json[0].hasOwnProperty('confirmed') ? json[0].confirmed.toLocaleString() : "0",
          "deaths": json[0].hasOwnProperty('deaths') ? json[0].deaths.toLocaleString() : "0",
          "recovered": json[0].hasOwnProperty('recovered') ? json[0].recovered.toLocaleString() : "0"
        };
        this.setState({
          nombrePaisActual:json[0].countryregion,
          paisItems: json[0],
          paisItemsTotalesFormateados: paisItemsTotalesFormateados
        })
      })
      .catch(error => {
        this.handleError(error);
      });
  }


  ordenarAscTable(data, key, orden) {
    return data.sort(function (a, b) {
      var x = a[key],
        y = b[key];

      if (orden === 'asc') {
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      }

      if (orden === 'desc') {
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      }
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const request = new Request('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief', {
      method: 'GET'
    });
    this.cargaValoresTotales(request);
    this.ordenarAscTable(countryProgressTableData, 'countryregion', 'asc');
  }

  render() {
    return (
      <Page
        className="DashboardPage"
        title={this.state.paisItems.countryregion + ' - ' + 'Seguimiento de coronavirus'}
        breadcrumbs={[{ name: 'Mapa', active: true }]}
      >
        <Row>
          <Col lg={4} md={6} sm={6} xs={12}>
            <IconWidget
              bgColor='primary'
              icon={MdEnhancedEncryption}
              iconProps={{ size: 50 }}
              title={'Total : '}
              valor={this.state.paisItemsTotalesFormateados.confirmed}
              subtitle="Total confirmados"
            />
          </Col>

          <Col lg={4} md={6} sm={6} xs={12}>
            <IconWidget
              bgColor='danger'
              icon={MdWhatshot}
              iconProps={{ size: 50 }}
              title={'Total : '}
              valor={this.state.paisItemsTotalesFormateados.deaths}
              subtitle="Total muertes"
            />
          </Col>

          <Col lg={4} md={6} sm={6} xs={12}>
            <IconWidget
              bgColor='success'
              icon={MdSentimentSatisfied}
              iconProps={{ size: 50 }}
              title={'Total : '}
              valor={this.state.paisItemsTotalesFormateados.recovered}
              subtitle="Total recuperados"
            />
          </Col>
        </Row>

        <Row>
          <Col lg={4} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total confirmados"
              subtitle="Casos globales"
              number={this.state.itemsTotalesFormateados.confirmed}
              color="primary"
              progress={{
                value: Number.parseFloat((this.state.paisItemsTotalesFormateados.confirmed * 100) / this.state.itemsTotales.confirmed).toFixed(4)
                ,
                label: 'Casos ' + this.state.paisItems.countryregion
                  + ' % Casos globales',

              }}
            />
          </Col>

          <Col lg={4} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Muertes totales"
              subtitle="Casos globales"
              number={this.state.itemsTotalesFormateados.deaths}
              color="danger"
              progress={{
                value: (Number.parseFloat(this.state.paisItemsTotalesFormateados.deaths * 100) / this.state.itemsTotales.deaths).toFixed(4),
                label: 'Casos ' + this.state.paisItems.countryregion
                  + ' % Casos globales',
              }}
            />
          </Col>

          <Col lg={4} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total  recuperados"
              subtitle="Casos globales"
              number={this.state.itemsTotalesFormateados.recovered}
              color="success"
              progress={{
                value: (Number.parseFloat(this.state.paisItemsTotalesFormateados.recovered * 100) / this.state.itemsTotales.recovered).toFixed(4),
                label: 'Casos ' + this.state.paisItems.countryregion
                  + ' % Casos globales',
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col lg="8" md="12" sm="12" xs="12">
            <Card inverse className="bg-gradient-primary">
              <CardHeader className="bg-gradient-primary">
                Casos confirmados acumulados
              </CardHeader>
              <CardBody>
                <MapWithBubbles nombrePaisActual={this.state.nombrePaisActual} />
              </CardBody>
            </Card>
          </Col>
          <Col lg="4" md="12" sm="12" xs="12">
          <Card>
            <CardHeader>Seleccione un país</CardHeader>
            <CardBody  >
              <CountryProgressTable
                headers={[
                  'Pais',
                  <MdPlace size={25} />,
                ]}
                countryData={countryProgressTableData}
                parentCallback={this.callback}
              />
            </CardBody>
          </Card>
        </Col>
        </Row>
      </Page>
    );
  }
}
export default DashboardPage;
