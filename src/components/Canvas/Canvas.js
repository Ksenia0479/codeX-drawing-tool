import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

// actions
import {
  createLine,
  createCanvas,
  createRectangle,
  createBucketFill
} from "store/actions";

class Canvas extends Component {
  renderCanvasBorder = () => {
    const { result, width, height } = this.props;

    const verticalLine = "|";
    const horizontalBorder = 2;
    const horizontalLine = [_.repeat(`-`, width + horizontalBorder)];

    const canvasesWithBorders = _.cloneDeep(result);

    _.forEach(canvasesWithBorders, canvas => {
      _.forEach(canvas, row => {
        row.splice(0, 0, verticalLine);
        row.splice(width + horizontalBorder, 0, verticalLine);
      });
      canvas.splice(0, 0, horizontalLine);
      canvas.splice(height + 1, 0, horizontalLine);
    });
    return canvasesWithBorders;
  };

  render() {
    const canvases = this.renderCanvasBorder();

    return (
      <div>
        {_.map(canvases, canvas => {
          return (
            <div>
              {_.map(canvas, row => {
                return <p>{row}</p>;
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({
  drawingCommands: { commands = [] },
  canvas: { result = [] }
}) => {
  const width = commands[0].coordinates.w;
  const height = commands[0].coordinates.h;

  return { commands, width, height, result };
};

const mapDispatchToProps = {
  createLine,
  createCanvas,
  createRectangle,
  createBucketFill
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);
