import { IExtendedRouteConfigBase } from "vendeq-ui-common";
import ExampleThings from "./components/ExampleThings";

// this will be exported by module exports, add routes to be added to parent apps
export const routes: IExtendedRouteConfigBase[] = [{
    component: ExampleThings,
    exact: true,
    path: "/things",
    title: "Example things"
}];

export const localRoutes: IExtendedRouteConfigBase[] = routes.concat([{
    component: ExampleThings,
    exact: true,
    path: "/",
    title: "Home"
}]);
