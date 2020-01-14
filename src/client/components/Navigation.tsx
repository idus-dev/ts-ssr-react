import { NavLink } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import routes from "../routes";

const LinkStyle = styled(NavLink)`
  color: #999;
`;

const NavStyle = styled.nav`
  padding: 0;
  margin: 0;

  > ${LinkStyle} {
    display: inline-block;
    margin: 0 10px;
  }

  .active {
    color: red;
  }
`;

const Navigation = () => (
  <NavStyle>
    {routes.map(({ name, path }) => (
      <LinkStyle key={name} to={path}>
        {name}
      </LinkStyle>
    ))}
  </NavStyle>
);

export default Navigation;
