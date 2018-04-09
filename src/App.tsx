import * as React from "react";
import { connect } from "react-redux";
import {ReduxState} from "./store";
import {Dispatch} from "redux";
import {setCellSize} from "./actions";

export interface Props {
  cellSize: number;
  handleChangeCellSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class AppComponent extends React.Component<Props> {
  render() {
    return (
      <input type="number" value={this.props.cellSize} onChange={this.props.handleChangeCellSize} />
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  cellSize: state.app.cell.size
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  handleChangeCellSize: (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCellSize(Number(event.target.value)));
  }
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
