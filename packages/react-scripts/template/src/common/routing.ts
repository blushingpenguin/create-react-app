
import * as express from "express";
import { RouteConfig } from "react-router-config";
import { AnyAction, Store } from "redux";
import { IStoreState } from "./interfaces";

export interface IExtendedRouteConfig extends RouteConfig {
    methods?: string
    init?: string | boolean | ((req: Express.Request, match: IExtendedRouteConfig) => Promise<Store<IStoreState, AnyAction>>)
    routes?: IExtendedRouteConfig[]
    title?: string
    key?: string
    icon?: string
}

export interface IRenderToStringResult {
    html: string
    css: string
}

export interface IReduxRouterOptions {
    routes: IExtendedRouteConfig[]
    createReduxStore: (req: express.Request, route: IExtendedRouteConfig) => Store<IStoreState, AnyAction>
    routesHandlerPath?: string
    withIds: boolean
    stringifyPreloadedState?: (state: object) => string
    logError?: (req: express.Request, err: Error) => void
    renderToString?: (req: express.Request, store: Store<IStoreState, AnyAction>, match: IExtendedRouteConfig, withIds: boolean) => IRenderToStringResult,
    redirects: IRedirectConfig[]
}

export interface IRedirectConfig {
    startsWith: string;
    redirectsTo: string;
    appendRequestedUrlToRedirect: boolean;
}