import React, { useState } from "react";
import { connect } from "react-redux";

// actions
import { fetchDrawingCommands } from "store/actions";

// styles
import "./input.css";

const Input = ({ fetchDrawingCommands }) => {
  const [fileReader] = useState(new FileReader());

  const handleFileRead = () => {
    const data = fileReader.result;
    fetchDrawingCommands(data);
  };

  const handleFileChoosen = file => {
    fileReader.readAsText(file);
    fileReader.onloadend = handleFileRead;
  };

  return (
    <input
      type="file"
      onChange={e => {
        handleFileChoosen(e.target.files[0]);
      }}
    />
  );
};

const mapDispatchToProps = { fetchDrawingCommands };

export default connect(
  null,
  mapDispatchToProps
)(Input);
