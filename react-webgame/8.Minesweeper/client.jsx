import React, { Component } from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";
import Minesweeper from "./Minesweeper";

const Hot = hot(Minesweeper);

ReactDOM.render(<Hot />, document.querySelector("#root"));
