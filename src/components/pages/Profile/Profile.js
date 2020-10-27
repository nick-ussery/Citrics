import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const Profile = props => {
  return (
    <div className="profile">
      <h2>Username</h2>
      <img
        src="https://www.flaticon.com/svg/static/icons/svg/219/219988.svg"
        alt="avatar"
        style={{ width: '100px', height: '100px' }}
      />
      <Card style={{ width: '90%', marginTop: '20px', textAlign: 'center' }}>
        <Link style={{ textDecoration: 'underline' }} to="/comparison">
          Comparison
        </Link>
        <p>------</p>
        <p>------</p>
        <p>------</p>
      </Card>
      <Card style={{ width: '90%', marginTop: '20px', textAlign: 'center' }}>
        <h3>Preferred Metrics</h3>
        <p>------</p>
        <p>------</p>
        <p>------</p>
      </Card>
    </div>
  );
};

export default Profile;
