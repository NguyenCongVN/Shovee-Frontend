import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import reducers from './rootReducer'
import rootSaga from './rootSaga'
const logger = createLogger({})
const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger , sagaMiddleware]
export const store = createStore(
    reducers,
    applyMiddleware(
        ...middlewares
    )
)
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
