import React, { useState, useEffect } from 'react';
import PropTypes from 'utils/propTypes';
import { Table, Media } from 'reactstrap';



const CountryProgressTable = ({ 
  parentCallback,
  headers,
  countryData,
  ...restProps }) => {
 
  const [post, setPost] = useState(32);

  useEffect(() => {
    document.getElementById('tr-'+post).classList.add('bg-primary');
  });

 

  const selectRow = (e, countrycode , index) => {
    e.preventDefault();
    console.log('Resultado countryregion --> ' + countrycode);
    document.getElementById('tr-'+post).classList.remove('bg-primary');
    document.getElementById('tr-'+index).classList.add('bg-primary');
    setPost(index);
    parentCallback(countrycode);
  };

  return (
    <div>
    <Table>
      <thead>
        <tr className="text-capitalize align-middle text-center">
          {headers.map((item, index) => <th key={index}>{item}</th>)}
        </tr>
      </thead>
    </Table>
    <Table responsive hover {...restProps}>
      <tbody>
        {countryData.map(({ countryregion, image, location, countrycode }, index) => (
          <tr key={index} id={'tr-'+index} onClick={e => selectRow(e, countrycode , index)} >
            <td className="align-middle text-left">{countryregion}</td>
            <td className="align-middle text-center">
                <Media  className="img-tmn" object src={image} alt={countryregion} />
          </td>
          </tr>
        ))}
      </tbody>
    </Table>
   </div>
  );
};

CountryProgressTable.propTypes = {
  headers: PropTypes.node,
  countryData: PropTypes.arrayOf(
    PropTypes.shape({
      countryregion: PropTypes.string,
      image: PropTypes.string,
      location: PropTypes.map,
      countrycode: PropTypes.map,
    })
  ),
};

CountryProgressTable.defaultProps = {
  headers: [],
  countryData: [],
};

export default CountryProgressTable;
