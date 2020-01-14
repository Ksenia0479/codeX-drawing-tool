import _ from "lodash";

// constants
import * as types from "store/constants";

const createCanvas = ({ w: width, h: height }) => {
  let canvas = [];

  for (let i = 0; i < height; i++) {
    canvas[i] = [];

    for (let j = 0; j < width; j++) {
      canvas[i][j] = `\u00A0`;
    }
  }

  return { type: types.UPDATE_CANVAS, payload: { data: canvas } };
};

const createLine = ({ x1, y1, x2, y2 }) => {
  return (dispatch, getState) => {
    const { data: canvasToBeUpdated } = getState().canvas;

    _.fill(
      canvasToBeUpdated[y1 - 1],
      "x",
      Math.min(x1, x2) - 1,
      Math.max(x1, x2)
    );

    for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
      canvasToBeUpdated[i - 1][x1 - 1] = "x";
    }

    dispatch({
      type: types.UPDATE_CANVAS,
      payload: { data: canvasToBeUpdated }
    });
  };
};

const createRectangle = ({ x1, y1, x2, y2 }) => {
  return (dispatch, getState) => {
    const { data: canvasToBeUpdated } = getState().canvas;

    if (y2 > y1) {
      for (let i = y1 - 1; i < y2; i++) {
        if (x2 > x1) {
          if (i === y1 - 1 || i + 1 === y2) {
            _.fill(canvasToBeUpdated[i], "x", x1 - 1, x2 + 1);
          } else {
            canvasToBeUpdated[i][x1 - 1] = "x";
            canvasToBeUpdated[i][x2 - 1] = "x";
          }
        }
      }
    }

    dispatch({
      type: types.UPDATE_CANVAS,
      payload: { data: canvasToBeUpdated }
    });
  };
};

const createBucketFill = ({ x, y, c }) => {
  return (dispatch, getState) => {
    const { data: canvasToBeUpdated } = getState().canvas;

    const checkElement = (x, y) => {
      if (
        y < 0 ||
        y > canvasToBeUpdated.length - 1 ||
        canvasToBeUpdated[y][x] !== `\u00A0` ||
        canvasToBeUpdated[y][x] === c ||
        canvasToBeUpdated[y][x] === "x"
      ) {
        return;
      }

      canvasToBeUpdated[y][x] = c;

      checkElement(x - 1, y);
      checkElement(x + 1, y);
      checkElement(x, y - 1);
      checkElement(x, y + 1);
    };

    checkElement(x - 1, y - 1);

    dispatch({
      type: types.UPDATE_CANVAS,
      payload: { data: canvasToBeUpdated }
    });
  };
};

const handleCommands = () => {
  return (dispatch, getState) => {
    const { commands } = getState().drawingCommands;

    _.map(commands, ({ command, coordinates }) => {
      switch (command) {
        case "C":
          dispatch(createCanvas(coordinates));
          break;
        case "L":
          dispatch(createLine(coordinates));
          break;
        case "R":
          dispatch(createRectangle(coordinates));
          break;
        case "B":
          dispatch(createBucketFill(coordinates));
          break;
        default:
          return null;
      }
    });
  };
};

export {
  createCanvas,
  createLine,
  createRectangle,
  createBucketFill,
  handleCommands
};
