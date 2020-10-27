import React, { useEffect, useState } from 'react';
import mapStyles from './mapStyles';
import SearchBar from './searchbar';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Drawer } from 'antd';
import 'antd/dist/antd.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CitySelect from './CitySelect';
import { useHistory } from 'react-router-dom';
import {
  RemoveFirstMarker,
  RemoveAlerts,
  setSelectedData,
} from '../../../state/actions/searched-cities-actions';
import axios from 'axios';
import CityData from '../../../data/cities';
import { SaveCity } from '../../../state/actions/searched-cities-actions';

const libraries = ['places'];

const mapContainerStyle = {
  width: '99vw',
  height: '90vh',
};

const center = {
  lat: 39.106667,
  lng: -94.676392,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const searchStyles = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  zIndex: 2,
  top: '70px',
};

// COMPONENT
const MapService = props => {
  // REDUX STATE
  const markers = useSelector(state => state.cityReducer.markers);
  const alert = useSelector(state => state.cityReducer.alert);
  const selectedInfo = useSelector(state => state.cityReducer.selected);
  const dispatch = useDispatch();

  const history = useHistory();

  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);

  // Manage Compare List Length
  if (markers.length > 3) {
    dispatch(RemoveFirstMarker());
  }

  // Load API Data into state
  const CityId = markers.map(city => {
    return CityData[city.address];
  });

  useEffect(() => {
    let first = `https://labs27-b-citrics-api.herokuapp.com/cities/city/id/${CityId[0]}`;
    let second = `https://labs27-b-citrics-api.herokuapp.com/cities/city/id/${CityId[1]}`;
    let third = `https://labs27-b-citrics-api.herokuapp.com/cities/city/id/${CityId[2]}`;

    if (markers.length === 3) {
      axios
        .all([axios.get(first), axios.get(second), axios.get(third)])
        .then(
          axios.spread((first, second, third) => {
            dispatch(SaveCity([first.data, second.data, third.data]));
            dispatch(
              setSelectedData(
                selected
                  ? selected.cityName
                  : markers[markers.length - 1].cityName
              )
            );
          })
        )
        .catch(err => console.log(err));
    } else if (markers.length === 2) {
      axios
        .all([axios.get(first), axios.get(second)])
        .then(
          axios.spread((first, second) => {
            dispatch(SaveCity([first.data, second.data]));
            dispatch(
              setSelectedData(
                selected
                  ? selected.cityName
                  : markers[markers.length - 1].cityName
              )
            );
          })
        )
        .catch(err => console.log(err));
    } else if (markers.length === 1) {
      axios.get(first).then(res => {
        dispatch(SaveCity([res.data]));
        dispatch(
          setSelectedData(
            selected ? selected.cityName : markers[markers.length - 1].cityName
          )
        );
      });
    }
  }, [CityId, dispatch, markers, selected]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  });

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  // UseEffect to check if a new search has been made
  useEffect(() => {
    setSelected(markers[markers.length - 1]);

    setTimeout(() => {
      if (markers.length > 0) {
        setVisible(true);
      }
    }, 500);
  }, [dispatch, markers]);

  if (loadError) return 'Error Loading Maps';
  if (!isLoaded) return 'Loading...';

  return (
    <>
      <div className="search-bar-container" styles={searchStyles}>
        <SearchBar panToCenter={panTo} width={800} />
      </div>
      {alert ? (
        <div className="alert-warn">
          <Alert
            type="warning"
            message="Please only select 3 cities"
            closable={true}
            showIcon={true}
            onClose={() => dispatch(RemoveAlerts())}
          />
        </div>
      ) : null}
      <div id="map">
        {window.innerWidth < 500 ? null : (
          <>
            <Button
              onClick={() => setVisible(!visible)}
              className="btn open-drawer"
              style={{
                background: '#e8833a',
                color: 'white',
                fontWeight: 'bold',
                position: 'absolute',
                zIndex: 2,
              }}
            >
              <FontAwesomeIcon icon={['fas', 'list-ul']}></FontAwesomeIcon>
            </Button>
            <Drawer
              width={window.innerWidth > 900 ? 500 : window.innerWidth - 200}
              className="drawer"
              mask={false}
              placement="left"
              closable={true}
              onClose={() => setVisible(false)}
              visible={visible}
            >
              <CitySelect
                list={markers}
                selected={selected}
                setSelected={setSelected}
              />
            </Drawer>
          </>
        )}

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={5}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {markers.map(marker => (
            <Marker
              key={`${marker.lat}-${marker.lng}`}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
              onClick={e => setSelected(marker)}
              icon={{
                // Need to tweak the URL to get pointer.svg to work, this one is temporary
                url: `https://www.flaticon.com/svg/static/icons/svg/1181/1181732.svg`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />
          ))}

          {selected && selectedInfo[0] ? (
            <InfoWindow
              position={{
                lat: selected.lat,
                lng: selected.lng,
              }}
              onCloseClick={() => setSelected(null)}
            >
              <div className="pointer-info">
                <h2>{selected.cityName ? selected.cityName : 'Error'}</h2>
                <FontAwesomeIcon icon={['fas', 'laptop']}></FontAwesomeIcon>
                <a
                  className="info-window-a"
                  href={
                    selectedInfo[0].website.startsWith('http://www.') ||
                    selectedInfo[0].website.startsWith('http') ||
                    selectedInfo[0].website.startsWith('https://www.')
                      ? `${selectedInfo[0].website}`
                      : `http://www.${selectedInfo[0].website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
                <img
                  src={selectedInfo[0].wiki_img_url}
                  alt="city banner"
                  className="info-banner"
                />
                <Button
                  onClick={() => {
                    markers.length > 1
                      ? history.push('/compare')
                      : setVisible(true);
                  }}
                  className="btn"
                  type="primary"
                  size="large"
                >
                  {markers.length > 1 ? 'Compare' : 'View'}
                </Button>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    </>
  );
};

export default MapService;
