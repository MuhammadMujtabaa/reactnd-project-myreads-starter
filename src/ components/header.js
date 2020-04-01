import React from "react";
import PropTypes from "prop-types";

const Header = ({ heading }) => {
  return (
    <div className="list-books-title">
      <h1>{heading}</h1>
    </div>
  );
};

Header.prototype = {
  heading: PropTypes.string.isRequired
};

export default Header;
