import * as React from "react";
import { Route, RouteProps, Switch, SwitchProps } from "react-router";
import { PageLayout } from "./PageLayout";
import { IExtendedRouteConfig } from "./routing";

export default function renderRoutes(routes: IExtendedRouteConfig[], switchProps?: SwitchProps, extraProps?: RouteProps) : JSX.Element {
    function renderComponent(route: IExtendedRouteConfig, props?: any) {
        const X = route.component as React.ComponentType;
        return <PageLayout><X {...props} {...extraProps} route={route} /></PageLayout>
    }
    
    return (
        <Switch {...switchProps}>
            {routes.map((route, i) => (
                <Route
                    key={route.key || i}
                    path={route.path}
                    exact={route.exact}
                    strict={route.strict}
                    // tslint:disable-next-line:jsx-no-lambda
                    render={props => renderComponent(route, props)}
                />
            ))}
        </Switch>
    );
}
