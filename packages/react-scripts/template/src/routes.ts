import { IExtendedRouteConfig } from "./common/routing";
import ExampleThings from "./components/ExampleThings";

export const routes: IExtendedRouteConfig[] = [{
    component: ExampleThings,
    exact: true,
    path: "/things",
    title: 'Example things'
}
];
