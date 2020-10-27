import React, { useEffect } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { Row, Col } from 'antd';
import './login.css';
import { config } from '../../../utils/oktaConfig';

const LoginContainer = () => {
  useEffect(() => {
    const { pkce, issuer, clientId, redirectUri, scopes } = config;
    // destructure your config so that you can pass it into the required fields in your widget.
    const widget = new OktaSignIn({
      baseUrl: issuer ? issuer.split('/oauth2')[0] : '',
      clientId,
      redirectUri,
      registration: {
        // there is more we can do to handle some errors here.
      },
      features: { registration: false },
      // turning this feature on allows your widget to use Okta for user registration
      logo: 'path-to-your-logo',
      // add your custom logo to your signing/register widget here.
      i18n: {
        en: {
          'primaryauth.title': 'Welcome Back to Citrics',
          // change title for your app
        },
      },
      authParams: {
        pkce,
        issuer,
        display: 'page',
        scopes,
      },
    });

    widget.renderEl(
      { el: '#sign-in-widget' },
      () => {
        /**
         * In this flow, the success handler will not be called because we redirect
         * to the Okta org for the authentication workflow.
         */
      },
      err => {
        throw err;
      }
    );
  }, []);

  return (
    <div className="loginPage">
      <Row
        style={{
          color: '#072a42',
          fontSize: '30px',
          fontStyle: 'italic',
          background: '#072a42',
        }}
      >
        <div>Citrics</div>
      </Row>
      <Row xs={1} md={2} lg={4} justify="space-around">
        <Col />
        <Col>
          <img
            className="loginImage"
            margin="auto"
            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
            alt="City in the night"
          />
        </Col>
        <Col>
          <div id="sign-in-widget" />
        </Col>
        <Col />
      </Row>
      <Row
        style={{ color: '#072a42', fontSize: '30px', background: '#072a42' }}
      >
        <div>h</div>
      </Row>
    </div>
  );
};

export default LoginContainer;
