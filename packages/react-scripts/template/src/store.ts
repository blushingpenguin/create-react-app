import { AnyAction, applyMiddleware, combineReducers, createStore, Reducer, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import { localeInitialState, localeReducer } from "vendeq-locale";
import { pageSettingsInitialState, pageSettingsReducer } from "vendeq-ui-common";
import { IExampleAppStateSlice, IRootStoreState } from "./models/state";
import exampleThings, { exampleThingsInitialState } from "./redux/exampleThings";

// these are exported with the module to be combined in a different rootReducer/state
export const rootReducer: Reducer<IExampleAppStateSlice, AnyAction> = combineReducers<IExampleAppStateSlice>({
    exampleThings
});

export const initialState: IExampleAppStateSlice = {
    exampleThings: exampleThingsInitialState
}


const internalRootReducer = combineReducers<IRootStoreState>({
    exampleApp: rootReducer,
    locale: localeReducer,
    pageSettings: pageSettingsReducer
});

const internalInitialState: IRootStoreState = {
    exampleApp: initialState,
    locale: localeInitialState,
    pageSettings: pageSettingsInitialState
}

const middlewares = [promise(), thunk];

export const configureStore = (state: IRootStoreState = internalInitialState): Store<IRootStoreState, AnyAction> => {
    return createStore<IRootStoreState, any, any, any>(
        internalRootReducer, 
        state,
        composeWithDevTools(applyMiddleware(...middlewares))
    );
};