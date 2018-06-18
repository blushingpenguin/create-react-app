import { AnyAction, applyMiddleware, combineReducers, createStore, Reducer, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import { IExampleAppStateSlice, IRootStoreState } from "./models/state";
import exampleThings, { exampleThingsInitialState } from "./redux/exampleThings";
import pageSettings, { pageSettingsInitialState } from "./redux/pageSettings";

// these are exported with the module to be combined in a different rootReducer/state
export const rootReducer: Reducer<IExampleAppStateSlice, AnyAction> = combineReducers<IExampleAppStateSlice>({
    exampleThings,
    pageSettings
});

export const initialState: IExampleAppStateSlice = {
    exampleThings: exampleThingsInitialState,
    pageSettings: pageSettingsInitialState
}


const internalRootReducer = combineReducers<IRootStoreState>({
    exampleApp: rootReducer    
});

const internalInitialState: IRootStoreState = {
    exampleApp: initialState
}

const middlewares = [promise(), thunk];

export const configureStore = (state: IRootStoreState = internalInitialState): Store<IRootStoreState, AnyAction> => {
    return createStore<IRootStoreState, any, any, any>(
        internalRootReducer, 
        state,
        composeWithDevTools(applyMiddleware(...middlewares))
    );
};