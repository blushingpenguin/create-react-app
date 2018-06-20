import { ILocaleState } from "vendeq-locale";
import { IPageSettingsStateSlice } from "vendeq-ui-common";
import { IExampleThingMap } from "./exampleThing";

// This interface will be exported and namespace this module's state, 
// so rename exampleApp to something unique for this module
export interface IRootStoreState {
    exampleApp: IExampleAppStateSlice;
    locale: ILocaleState;
    pageSettings: IPageSettingsStateSlice;
}

export interface IExampleAppStateSlice {
    exampleThings: IExampleThingsStateSlice;
}

export interface IExampleThingsStateSlice {
    allIds: string[];
    byId: IExampleThingMap;
}