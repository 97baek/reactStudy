import React, { Component } from "react";
import AppPresenter from "./AppPresenter";
import Store from "../../store";

const AppContainer = () => {
  return (
    <Store.Provider>
      <AppPresenter />
    </Store.Provider>
  );
};

export default AppContainer;
