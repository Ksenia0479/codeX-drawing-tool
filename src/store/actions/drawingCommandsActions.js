import _ from "lodash";

// constants
import * as types from "store/constants";

// actions
import { addAlert, handleCommands } from "./";

const isCanvasFirstCommand = command => {
  return () => {
    if (command !== "C") {
      throw new Error("Canvas command must be first!");
    }
  };
};

const checkСoordinatesLocation = ({
  canvas: { w, h },
  coordinates: { x, y }
}) => {
  return () => {
    if (x < 1 || x > w) {
      throw new Error("X coordinate is beyond of the canvas");
    }

    if (y < 1 || y > h) {
      throw new Error("Y coordinate is beyond of the canvas");
    }
  };
};

const validateCanvasCoordinates = coordinates => {
  return () => {
    if (coordinates.length !== 2) {
      throw new Error("Width and Heigh must be provided!");
    }

    const isCoordinatesInteger = _.every(coordinates, coordinate => {
      return _.isInteger(_.toNumber(coordinate));
    });

    if (!isCoordinatesInteger) {
      throw new Error("Coordinates must be integer");
    }
  };
};

const validateLineCoordinates = coordinates => {
  return () => {
    if (coordinates.length !== 4) {
      throw new Error("X1, Y1, X2, Y2 cordinates must be provided!");
    }

    const isCoordinatesInteger = _.every(coordinates, coordinate => {
      return _.isInteger(_.toNumber(coordinate));
    });

    if (!isCoordinatesInteger) {
      throw new Error("Coordinates must be integer");
    }

    const isHorizontalVerticalLine =
      coordinates[0] === coordinates[2] || coordinates[1] === coordinates[3];

    if (!isHorizontalVerticalLine) {
      throw new Error("Support only horizontal or vertical lines");
    }
  };
};

const validateRectangleCoordinates = coordinates => {
  return () => {
    if (coordinates.length !== 4) {
      throw new Error("X1, Y1, X2, Y2 cordinates must be provided!");
    }

    const isCoordinatesInteger = _.every(coordinates, coordinate => {
      return _.isInteger(_.toNumber(coordinate));
    });

    if (!isCoordinatesInteger) {
      throw new Error("Coordinates must be integer");
    }
  };
};

const validateBucketFillCoordinates = coordinates => {
  return () => {
    if (coordinates.length !== 3) {
      throw new Error("X, Y and C arguments must be provided!");
    }

    const isCoordinatesInteger = _.every(
      _.slice(coordinates, 0, 2),
      coordinate => {
        return _.isInteger(_.toNumber(coordinate));
      }
    );

    if (!isCoordinatesInteger) {
      throw new Error("Coordinates must be integer");
    }
  };
};

const fetchDrawingCommands = data => {
  return dispatch => {
    try {
      const commandData = _.split(data, "\n");

      dispatch(
        isCanvasFirstCommand(_.split(_.trimStart(commandData[0]), " ")[0])
      );

      let commands = [];
      _.forEach(commandData, value => {
        const splitedCommands = _.split(_.trim(value), " ");

        const command = _.toUpper(splitedCommands[0]);
        let coordinates = _.slice(splitedCommands, 1);

        // command C
        if (command === "C") {
          dispatch(validateCanvasCoordinates(coordinates));

          coordinates = {
            w: _.parseInt(coordinates[0]),
            h: _.parseInt(coordinates[1])
          };
        } else {
          // command L
          if (command === "L") {
            dispatch(validateLineCoordinates(coordinates));

            coordinates = {
              x1: _.parseInt(coordinates[0]),
              y1: _.parseInt(coordinates[1]),
              x2: _.parseInt(coordinates[2]),
              y2: _.parseInt(coordinates[3])
            };
          }

          // command R
          if (command === "R") {
            dispatch(validateRectangleCoordinates(coordinates));

            coordinates = {
              x1: _.parseInt(coordinates[0]),
              y1: _.parseInt(coordinates[1]),
              x2: _.parseInt(coordinates[2]),
              y2: _.parseInt(coordinates[3])
            };
          }

          // command B
          if (command === "B") {
            dispatch(validateBucketFillCoordinates(coordinates));

            coordinates = {
              x: _.parseInt(coordinates[0]),
              y: _.parseInt(coordinates[1]),
              c: coordinates[2]
            };

            const canvasCoordinates = {
              w: commands[0].coordinates.w,
              h: commands[0].coordinates.h
            };

            dispatch(
              checkСoordinatesLocation({
                canvas: canvasCoordinates,
                coordinates: { x: coordinates.x, y: coordinates.y }
              })
            );
          }

          const canvasCoordinates = {
            w: commands[0].coordinates.w,
            h: commands[0].coordinates.h
          };

          dispatch(
            checkСoordinatesLocation({
              canvas: canvasCoordinates,
              coordinates: { x: coordinates.x1, y: coordinates.y1 }
            })
          );

          dispatch(
            checkСoordinatesLocation({
              canvas: canvasCoordinates,
              coordinates: { x: coordinates.x2, y: coordinates.y2 }
            })
          );
        }

        commands = [...commands, { command, coordinates }];
      });

      dispatch({
        type: types.FETCH_DRAWING_COMMANDS_SUCCESS,
        payload: { commands }
      });
      dispatch(handleCommands());
    } catch ({ message }) {
      const alertType = "error";
      dispatch(addAlert(message, alertType));
    }
  };
};

export { fetchDrawingCommands };
