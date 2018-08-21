import React from "react";
import styled from "react-emotion";
import { Link } from "react-router-dom";

const _Button = ({ onClick, to, href, children, className, target }) => {
  if (onClick) {
    return (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    );
  }
  if (href || !to) {
    return (
      <a className={className} href={href} target={target}>
        {children}
      </a>
    );
  } else {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }
};

const Button = styled(_Button)`
  padding: 1rem;
  margin: 1rem;
  border: 2px solid #fff;
  color: #fff;
  background: none;
  :hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.2);
  }
  :active {
    background: rgba(255, 255, 255, 0.2);
  }
  text-decoration: none;
`;
export default Button;
