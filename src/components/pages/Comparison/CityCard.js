import React from 'react';

import { Card } from 'antd';

import '../../FontAwesomeIcons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CityCard = props => {
  return (
    <>
      <div className="search-cities">
        <Card bordered={true} style={{ width: 500, height: 475 }}>
          <img
            className="city-img"
            src={props.wiki_img_url}
            alt="Wikipedia Img of City"
            height="200px"
            width="400px"
          />
          <div className="city-metrics">
            <h2 className="city-name">{`${props.name}, ${props.statename}`}</h2>
            <p>
              <FontAwesomeIcon icon={['fas', 'users']}></FontAwesomeIcon>
              Population: {props.pop}
            </p>
            <p>
              <FontAwesomeIcon icon={['fas', 'house-user']}></FontAwesomeIcon>
              Average Rent: ${props.rent}
            </p>
            <p>
              <FontAwesomeIcon
                icon={['fas', 'money-bill-wave']}
              ></FontAwesomeIcon>
              Average Househole Income: ${props.household}
            </p>
            <p>
              <FontAwesomeIcon icon={['fas', 'laptop']}></FontAwesomeIcon>
              City Website:
              <a
                href={
                  props.website.startsWith('http://www.') ||
                  props.website.startsWith('http') ||
                  props.website.startsWith('https://www.')
                    ? `${props.website}`
                    : `http://www.${props.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {props.website}
              </a>
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CityCard;
