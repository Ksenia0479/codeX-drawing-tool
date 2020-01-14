import React, { Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";

// components
import { Input, Canvas, Toastr } from "components";

const App = ({ commands }) => {
  return (
    <Fragment>
      <Toastr />
      <Input />
      {!_.isEmpty(commands) && <Canvas />}
    </Fragment>
  );
};

const mapStateToProps = ({ drawingCommands: { commands } }) => {
  return { commands };
};

export default connect(mapStateToProps)(App);
