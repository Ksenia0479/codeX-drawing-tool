import { combineReducers } from "redux";

import drawingCommands from "./drawingCommandsReducer";
import canvas from "./canvasReducer";
import alerts from "./alertsReducer";

export default combineReducers({ drawingCommands, canvas, alerts });
