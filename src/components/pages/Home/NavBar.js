import React from 'react';
import { NavLink } from 'react-router-dom';

let styling = {
  color: 'black',
  fontSize: '1em',
};

function NavBar({ LoadingComponent }) {
  return (
    <div style={styling}>
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink exact to="/login">
        Login
      </NavLink>
      <NavLink exact to="/register">
        Register
      </NavLink>
    </div>
  );
}

export default NavBar;
