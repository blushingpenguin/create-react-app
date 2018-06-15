import update from "immutability-helper";
import { IAction } from "../models/interfaces";
import { IPageSettingsStateSlice } from "../models/state";

export const pageSettingsInitialState: IPageSettingsStateSlice = {
    loadingRequests: [],
    loadedRequests: {},
};

export default function reducer(state: IPageSettingsStateSlice = pageSettingsInitialState, action: IAction<any>): IPageSettingsStateSlice {

    if (action.type.endsWith("PENDING")) {
        return update(state, {
            loadingRequests: { $push: [action.type.replace("_PENDING", "")] }
        });
    }

    if (action.type.endsWith("FULFILLED") || action.type.endsWith("REJECTED")) {
        let actionName = action.type.replace("_FULFILLED", "");
        actionName = actionName.replace("_REJECTED", "");

        return update(state, {
            loadedRequests: {
                $merge: { [actionName]: true }
            },
            loadingRequests: {
                $splice: [[state.loadingRequests.indexOf(actionName), 1]]
            }
        });
    }

    return state;
}
