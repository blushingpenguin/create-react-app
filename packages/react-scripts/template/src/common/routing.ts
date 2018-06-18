
import * as express from "express";
import { RouteConfig } from "react-router-config";
import { Store } from "redux";

export interface IExtendedRouteConfig extends RouteConfig {
    methods?: string
    init?: string | boolean | ((req: Express.Request, match: IExtendedRouteConfig) => Promise<Store>)
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
    createReduxStore: (req: express.Request, route: IExtendedRouteConfig) => Store
    routesHandlerPath?: string
    withIds: boolean
    stringifyPreloadedState?: (state: object) => string
    logError?: (req: express.Request, err: Error) => void
    renderToString?: (req: express.Request, store: Store, match: IExtendedRouteConfig, withIds: boolean) => IRenderToStringResult,
    redirects: IRedirectConfig[]
}

export interface IRedirectConfig {
    startsWith: string;
    redirectsTo: string;
    appendRequestedUrlToRedirect: boolean;
}