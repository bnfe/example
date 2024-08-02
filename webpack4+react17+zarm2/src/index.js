import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "@/store";

import { HashRouter as Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import RouterTitle from "react-router-title";
import routes from "@/routes";

import { getPersistor } from "@rematch/persist";
import { PersistGate } from "redux-persist/es/integration/react";
const persistor = getPersistor();

import "amfe-flexible";

import { version as DEV_VER } from "~/package.json";
console.table({
  BASE_URL: process.env.BASE_URL,
  DEV_MODE: process.env.NODE_ENV,
  DEV_VER,
});

if (process.env.NODE_ENV === "development") {
  eruda.init();
}

function App() {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <Router>
          <RouterTitle routesConfig={routes} />
          {renderRoutes(routes)}
        </Router>
      </Provider>
    </PersistGate>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// TODO 热更新
if (module.hot) {
  module.hot.accept();
}
