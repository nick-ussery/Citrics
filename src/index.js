import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
  Link,
} from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';

import 'antd/dist/antd.less';
import { Drawer, Layout } from 'antd';

import './components/FontAwesomeIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles/home.css';

// REDUX
import reducers from './state/reducers/index';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-thunk';

// COMPONENTS
import { LoginPage } from './components/pages/Login';
import { config } from './utils/oktaConfig';

import MapService from './components/pages/Home/mapservice';
import SearchBar from './components/pages/Home/searchbar';
import FooterContents from './components/pages/Home/footer';

import Profile from './components/pages/Profile/Profile';
import Compare from './components/pages/Comparison/comparePage';
const { Header, Footer } = Layout;

const store = createStore(reducers, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Router>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const [visible, setVisible] = useState(false);

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <Header className="nav" style={{ background: '#B3B5B8' }}>
        <Link to="/">
          <FontAwesomeIcon icon={['fas', 'search']}></FontAwesomeIcon>
          Search
        </Link>
        <Link to="/">
          <FontAwesomeIcon icon={['fas', 'chart-area']}></FontAwesomeIcon>
          Trending
        </Link>
        <button
          className="button-link"
          onClick={() => {
            setVisible(!visible);
          }}
        >
          <FontAwesomeIcon icon={['fas', 'user-circle']}></FontAwesomeIcon>
          Profile
        </button>
      </Header>
      <Drawer
        title="Profile"
        placement="right"
        closable={true}
        onClose={() => setVisible(false)}
        visible={visible}
      >
        <Profile />
      </Drawer>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/implicit/callback" component={LoginCallback} />
        {/* any of the routes you need secured should be registered as SecureRoutes */}
        <Route path="/search" component={SearchBar} />
        <Route path="/compare" component={Compare} />
        <Route path="/" component={MapService} />
      </Switch>
      <Footer className="footer">
        <FooterContents />
      </Footer>
    </Security>
  );
}
