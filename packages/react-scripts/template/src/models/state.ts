import { IExampleThingMap } from "./exampleThing";

// This interface will be exported and namespace this module's state, 
// so rename exampleApp to something unique for this module
export interface IRootStoreState {
    exampleApp: IExampleAppStateSlice;
}

export interface IExampleAppStateSlice {
    exampleThings: IExampleThingsStateSlice;
    pageSettings: IPageSettingsStateSlice;
}

export interface IExampleThingsStateSlice {
    allIds: string[];
    byId: IExampleThingMap;
}

export interface IPageSettingsStateSlice {
    loadedRequests: IRequestMap,
	loadingRequests: string[];
}

export interface IRequestMap {
	[request: string]: boolean;
}
