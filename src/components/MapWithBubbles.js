import world50m from 'assets/geo-data/world-50m.json';
import { scaleLinear } from 'd3-scale';
import React, { Component } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Markers,
  ZoomableGroup,
} from 'react-simple-maps';
import CirclePulse from 'components/CirclePulse'
import { getColor } from 'utils/colors';

const cityScale = scaleLinear()
  .domain([0, 37843000])
  .range([1, 25]);

class BubbleMap extends Component {
  state = {
    paisItems: []
  };


  ordenarAsc(p_array_json, p_key) {
    p_array_json.sort(function (a, b) {
      return a[p_key] > b[p_key];
    });
  }

  creaObjetoPintar(json) {
    var arraycity = [];
    for(var i= 0; i < json.length; i++) {
      var city = json[i];
      arraycity.push({ 
          "name"    : city.countryregion,
          "coordinates"  : [city.location.lng,city.location.lat],
          "population"    : city.hasOwnProperty('confirmed')  ? (city.confirmed) : 0 
      });
  }
  this.setState({paisItems:arraycity})
  }

  cargaTotalPaises(request) {
    fetch(request)
      .then(response => {
        if (!response.ok) {
          this.handleResponseError(response);
        }
        return response.json();
      })
      .then(json => {
        this.ordenarAsc(json, 'countryregion');
        this.creaObjetoPintar(json);
      })
      .catch(error => {
        this.handleError(error);
      });
  }


  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    const request = new Request('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest?onlyCountries=true', {
      method: 'GET'
    });
    this.cargaTotalPaises(request);
  }

  render() {


    const secondaryColor = getColor('secondary');
    const lightColor = getColor('light');

    return (
      <ComposableMap showCenter
        projectionConfig={{ scale: 205 }}
        width={980}
        height={551}
        style={{
          width: '100%',
          height: 'auto',
        }}
      >
        <ZoomableGroup zoom="3" center={this.props.cordenadasPais} disablePanning>
          <Geographies geography={world50m}>
            {(geographies, projection) =>
              geographies.map(
                (geography, i) =>
                  geography.id !== 'ATA' && (
                    <Geography
                      key={i}
                      cacheId={`path-${i}`}
                      geography={geography}
                      projection={projection}
                      style={{
                        default: {
                          fill: lightColor,
                          stroke: secondaryColor,
                          strokeWidth: 0.1,
                          outline: 'none',
                        },
                        hover: {
                          fill: secondaryColor,
                          stroke: secondaryColor,
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                        pressed: {
                          fill: secondaryColor,
                          stroke: secondaryColor,
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                      }}
                    />
                  ),
              )
            }
          </Geographies>
          <Markers>
            {this.state.paisItems.map((city, i) => (
              <Marker key={i} marker={city}>

                { city.name === this.props.nombrePaisActual? 
                  <CirclePulse 
                  color={secondaryColor} 
                  r={cityScale(city.population)} 
                  pulseColor={secondaryColor}/>
                  :
                  <circle
                  cx={0}
                  cy={0}
                  r={cityScale(city.population)}
                  fill={secondaryColor}
                  stroke={secondaryColor}
                  strokeWidth="2"
                />
                }
                }
              </Marker>
            ))}
          </Markers>
        </ZoomableGroup>
      </ComposableMap>
    );
  }
}

BubbleMap.defaultProps = {
  cordenadasPais:[0,0]
};

export default BubbleMap;
