import React from "react";
import { Link } from "react-router-dom";

const AddBtn = () => {
  return (
    <div className="fixed-action-btn">
      <Link
        to="/stories/add"
        className="btn-floating btn-large waves-effect waves-light blue"
      >
        <i className="fas fa-plus"></i>
      </Link>
    </div>
  );
};

export default AddBtn;
