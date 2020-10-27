import React from 'react';
import '../../../styles/home.css';
//component imports
import CityCard from './CityCard';
import MetricCard from './MetricCard';
// antd imports
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';

function Compare(props) {
  const cities = useSelector(state => state.cityReducer.cityInfo);

  return (
    <>
      <Col className="col">
        <Row className="row">
          {cities.map(cities => (
            <CityCard
              wiki_img_url={cities.wiki_img_url}
              name={cities.city}
              statename={cities.statename}
              pop={cities.pop}
              rent={cities.rent}
              household={cities.household}
              website={cities.website}
            />
          ))}
        </Row>
      </Col>
      <Col className="col">
        <Row className="row">
          {cities.length !== 0 && <MetricCard data={cities} />}
        </Row>
      </Col>
    </>
  );
}
export default Compare;
