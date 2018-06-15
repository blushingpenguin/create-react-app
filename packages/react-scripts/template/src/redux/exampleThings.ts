import { AxiosResponse } from "axios";
import update from "immutability-helper";
import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import ExampleThingApi from "../apis/exampleThingApi";
import { IExampleThing, IExampleThingMap } from "../models/exampleThing";
import { IExampleThingsStateSlice } from "../models/state";

export enum exampleThingActionTypes {
    GET_EXAMPLE_THINGS = "GET_EXAMPLE_THINGS",
    GET_EXAMPLE_THING = "GET_EXAMPLE_THING",
    CREATE_EXAMPLE_THING = "CREATE_EXAMPLE_THING",
    UPDATE_EXAMPLE_THING = "UPDATE_EXAMPLE_THING",
    DELETE_EXAMPLE_THING = "DELETE_EXAMPLE_THING",
}

export const exampleThingActions = {

    getExampleThings: createAction(exampleThingActionTypes.GET_EXAMPLE_THINGS, resolve => {
        return (search?: string) => resolve({ 
            promise: ExampleThingApi.getExampleThings(search) 
        });
    }),

    getExampleThing: createAction(exampleThingActionTypes.GET_EXAMPLE_THING, resolve => {
        return (appId: string) => resolve({ 
            promise: ExampleThingApi.getExampleThing(appId)
        });
    }),

    createExampleThing: createAction(exampleThingActionTypes.CREATE_EXAMPLE_THING, resolve => {
        return (app: IExampleThing) => resolve({ 
            promise: ExampleThingApi.createExampleThing(app)
        });
    }),

    updateExampleThing: createAction(exampleThingActionTypes.UPDATE_EXAMPLE_THING, resolve => {
        return (app: IExampleThing) => resolve({ 
            promise: ExampleThingApi.updateExampleThing(app.id||"", app) 
        });
    }),

    deleteExampleThing: createAction(exampleThingActionTypes.DELETE_EXAMPLE_THING, resolve => {
        return (appId: string) => resolve({ 
            promise: ExampleThingApi.deleteExampleThing(appId)
        });
    })
}

const asyncResponseActions = {
    getExampleThingsResponses: createAsyncAction("GET_EXAMPLE_THINGS_PENDING", "GET_EXAMPLE_THINGS_FULFILLED", "GET_EXAMPLE_THINGS_REJECTED")<void, AxiosResponse<IExampleThing[]>, Error>(),
    getExampleThingResponses: createAsyncAction("GET_EXAMPLE_THING_PENDING", "GET_EXAMPLE_THING_FULFILLED", "GET_EXAMPLE_THING_REJECTED")<void, AxiosResponse<IExampleThing>, Error>(),
    createExampleThingResponses: createAsyncAction("CREATE_EXAMPLE_THING_PENDING", "CREATE_EXAMPLE_THING_FULFILLED", "CREATE_EXAMPLE_THING_REJECTED")<void, AxiosResponse<IExampleThing>, Error>(),
    updateExampleThingResponses: createAsyncAction("UPDATE_EXAMPLE_THING_PENDING", "UPDATE_EXAMPLE_THING_FULFILLED", "UPDATE_EXAMPLE_THING_REJECTED")<void, AxiosResponse<IExampleThing>, Error>(),
    deleteExampleThingResponses: createAsyncAction("DELETE_EXAMPLE_THING_PENDING", "DELETE_EXAMPLE_THING_FULFILLED", "DELETE_EXAMPLE_THING_REJECTED")<void, AxiosResponse, Error>(),
}

type ExampleThingsActionTypes = ActionType<typeof exampleThingActions | typeof asyncResponseActions>;

export const exampleThingsInitialState: IExampleThingsStateSlice = {
    allIds: [],
    byId: {}
};

export default function reducer(state: IExampleThingsStateSlice = exampleThingsInitialState, action: ExampleThingsActionTypes): IExampleThingsStateSlice {
    switch (action.type) {
        case "GET_EXAMPLE_THINGS_FULFILLED": {
            const apps = action.payload.data;
            const appIds = [];
            const appsById: IExampleThingMap = {};
            
            for (const app of apps) {
                appIds.push(app.id);
                appsById[app.id||""] = app;
            }

            return update(state, {
                allIds: { $set: appIds },
                byId: { $set: appsById }
            });
        }
        case "GET_EXAMPLE_THING_FULFILLED":
        case "CREATE_EXAMPLE_THING_FULFILLED": {
            const newApp = action.payload.data;
            if (newApp.id != null) {
                return update(state, {
                    allIds: {$push: [newApp.id]},
                    byId: {$merge: { [newApp.id]: newApp}}
                });
            }
        }
        case "UPDATE_EXAMPLE_THING_FULFILLED": {
            const updatedApp = action.payload.data;
            if (updatedApp.id != null) {
                return update(state, {
                    byId: {$merge: { [updatedApp.id]: updatedApp}}
                });
            }
        }
    }

    return state;
}
