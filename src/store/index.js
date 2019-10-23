import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducers";
import notificationSaga from "./sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(notificationSaga);

// render the application
