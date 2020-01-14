import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

// styles
import "./toast.css";

// actions
import { removeAlert } from "store/actions";

class Toast extends Component {
  componentDidMount() {
    const { timeOut } = this.props;

    setTimeout(() => {
      this.onRemoveAlertClick();
    }, timeOut);
  }

  onRemoveAlertClick = () => {
    const { removeAlert, id } = this.props;
    removeAlert(id);
  };

  render() {
    const { type, message } = this.props;
    const toastClasses = classNames({ toast: true, [type]: true });
    return (
      <div className={toastClasses}>
        <div className="toast-message">{message}</div>
        <div className="toast-button" onClick={this.onRemoveAlertClick}>
          <i className="ion-md-close" />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = { removeAlert };

export default connect(
  null,
  mapDispatchToProps
)(Toast);
