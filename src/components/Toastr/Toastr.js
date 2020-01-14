import React from "react";
import { connect } from "react-redux";
import { createPortal } from "react-dom";
import _ from "lodash";

// components - Toastr
import { Toast } from "./components";

// styles
import "./toastr.css";

const Toastr = ({ alerts }) => {
  return createPortal(
    <div className="toastr">
      <div className="toast-container">
        {_.map(alerts, alert => {
          return <Toast key={alert.id} {...alert} />;
        })}
      </div>
    </div>,
    document.getElementById("toastr")
  );
};

const mapStateToProps = ({ alerts }) => {
  return { alerts };
};

export default connect(mapStateToProps)(Toastr);
