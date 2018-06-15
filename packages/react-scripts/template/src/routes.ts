import { IExtendedRouteConfig } from "./common/routing";
import ExampleThings from "./components/ExampleThings";

// this will be exported by module exports, add routes to be added to parent apps
export const routes: IExtendedRouteConfig[] = [{
    component: ExampleThings,
    exact: true,
    path: "/things",
    title: "Example things"
}];

export const localRoutes: IExtendedRouteConfig[] = routes.concat([{
    component: ExampleThings,
    exact: true,
    path: "/",
    title: "Home"
}]);
