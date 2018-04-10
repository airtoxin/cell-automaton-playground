import * as React from "react";
import { connect } from "react-redux";
import {ReduxState} from "./store";
import {Dispatch} from "redux";
import {setBoardSize, setCellSize, setStrategy} from "./actions";

export interface Props {
  cellSize: number;
  patternWidth: number;
  patternHeight: number;
  strategyName: string;
  handleChangeCellSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePatternWidth: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePatternHeight: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeStrategy: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export class AppComponent extends React.Component<Props> {
  render() {
    return (
      <div>
        <div>
          <label>Cell Size</label>
          <input type="number" value={this.props.cellSize} onChange={this.props.handleChangeCellSize} />
        </div>
        <div>
          <label>Pattern Width</label>
          <input type="number" value={this.props.patternWidth} onChange={this.props.handleChangePatternWidth}/>
        </div>
        <div>
          <label>Pattern Height</label>
          <input type="number" value={this.props.patternHeight} onChange={this.props.handleChangePatternHeight}/>
        </div>
        <div>
          <label>Strategy</label>
          <select value={this.props.strategyName} onChange={this.props.handleChangeStrategy}>
            <option key="GameOfLifeStrategy" value="GameOfLifeStrategy">GameOfLifeStrategy</option>
            <option key="VoteStrategy" value="VoteStrategy">VoteStrategy</option>
            <option key="NeonStrategy" value="NeonStrategy">NeonStrategy</option>
            <option key="DazzleStrategy" value="DazzleStrategy">DazzleStrategy</option>
            <option key="WaveStrategy" value="WaveStrategy">WaveStrategy</option>
          </select>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  cellSize: state.app.cell.size,
  patternWidth: state.app.boardSize.width,
  patternHeight: state.app.boardSize.height,
  strategyName: state.app.strategy.name
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  handleChangeCellSize: (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCellSize(Number(event.target.value)));
  },
  handleChangePatternWidth: (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setBoardSize({ width: Number(event.target.value) }))
  },
  handleChangePatternHeight: (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setBoardSize({ height: Number(event.target.value) }))
  },
  handleChangeStrategy: (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStrategy(event.target.value));
  }
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
