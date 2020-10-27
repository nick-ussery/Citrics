import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Carousel } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setSelectedData } from '../../../state/actions/searched-cities-actions';

const CitySelect = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedInfo = useSelector(state => state.cityReducer.selected);
  const markers = useSelector(state => state.cityReducer.markers);

  if (!selectedInfo) {
    return 'Error loading data';
  }

  return (
    <div className="city-select">
      <div className="compare-list">
        {props.list.length > 1 && selectedInfo[0] ? (
          <>
            <h3>Current List</h3>
            <Carousel dotPosition="bottom" className="carousel">
              {props.list.map((item, i) => (
                <div
                  className="city-list-item"
                  onClick={() => {
                    if (markers.length > 0) {
                      setTimeout(() => {
                        dispatch(setSelectedData(item.cityName));
                      }, 300);
                    }
                    props.setSelected(item);
                  }}
                >
                  {item.cityName}
                </div>
              ))}
            </Carousel>
          </>
        ) : null}
        {props.list.length > 1 && (
          <Button
            to="/compare"
            onClick={() => history.push('/compare')}
            className="btn compare"
          >
            View Comparison
          </Button>
        )}
      </div>
      <div className="city-info">
        {props.list.length !== 0 && props.selected && selectedInfo[0] ? (
          <>
            {' '}
            <h2>{props.selected.cityName}</h2>
            <h3>{selectedInfo[0].statename}</h3>
            <img
              src={selectedInfo[0].wiki_img_url}
              alt="City Banner"
              className="city-select-banner"
            />
            <h3>About</h3>
            <p>
              <strong>Time-Zone</strong>: {selectedInfo[0].timezone}
            </p>
            <p>
              <strong>Population</strong>: {selectedInfo[0].pop}
            </p>
            <p>
              <strong>Counties</strong>: {selectedInfo[0].counties}
            </p>
            <p>
              <strong>Density</strong>: {selectedInfo[0].density_mi_sq} miles,{' '}
              {selectedInfo[0].density_km_sq} kilometers
            </p>
            <p>
              <strong>ACA Status</strong>: {selectedInfo[0].ACA_status}
            </p>
          </>
        ) : (
          <div
            style={{
              textAlign: 'center',
              fontSize: '1.7rem',
              opacity: 0.5,
            }}
          >
            <h3>Select a City</h3>
          </div>
        )}
      </div>
      <FontAwesomeIcon
        style={{
          color: 'red',
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}
        icon={['fas', 'trash']}
      ></FontAwesomeIcon>
    </div>
  );
};

export default CitySelect;
