// vim: set ts=4 sw=4
import { Breadcrumb, Layout } from 'antd';
import { CollapseType } from 'antd/lib/layout/Sider';
// import { WithStyles } from 'isomorphic-style-loader-utils';
import * as React from 'react';
import { matchPath } from "react-router";
import { interval, Subject, Subscription } from 'rxjs';
import { throttle } from 'rxjs/operators';
import '../App.less';
import "../index.css";
import { routes as globalRoutes } from "../routes";
import "../vendeq.png";
import AppBar from './AppBar';
import { IExtendedRouteConfig } from './routing';
import SidebarMenu from './SidebarMenu';
import './styles/PageLayout.less';

interface IPageLayoutState {
    collapsed: boolean;
    mobileMode: boolean;
}

// @WithStyles(styles)
export class PageLayout extends React.Component<{}, IPageLayoutState> {
    // public static contextTypes = {
    //     router: PropTypes.object,
    //     route: PropTypes.object
    // };

    private onWindowResize$: Subject<any>;
    private subscription: Subscription;

    constructor(props: any) {
        super(props);

        this.onWindowResize$ = new Subject();
        this.onWindowResize = this.onWindowResize.bind(this);

        this.state = {
            collapsed: this.isCollapsibleWidth(),
            mobileMode: this.isMobileWidth()
        };
    }

    public componentDidMount () {
        if (window) {
            window.addEventListener('resize', this.onWindowResize);
        }
        this.subscription = this.onWindowResize$
            .pipe(throttle(val => interval(250), {leading: true, trailing: true}))
            .subscribe(() => {
                if (this.state.mobileMode !== this.isMobileWidth()) {
                    this.setState({
                        mobileMode: this.isMobileWidth()
                    })
                }
            });                
    }

    public componentWillUnmount() {
        if (window) {
            window.removeEventListener('resize', this.onWindowResize);
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
            delete this.subscription;
        }
    }

    private onWindowResize = () => {
        this.onWindowResize$.next();
    }

    private isMobileWidth = (): boolean => {
        return typeof(window) !== "undefined" && window.innerWidth <= 750;
    };

    private isCollapsibleWidth = (): boolean => {
        return typeof(window) !== "undefined" && window.innerWidth <= 992;
    };

    private toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    private onCollapse = (collapsed: boolean, type: CollapseType): void => {
        if (type === "responsive") {
            this.setState({
                collapsed
            });
        }
    };

    private getSelectedMenuItemPath = (): IExtendedRouteConfig[] => {
        const matchedPath = this.context && this.context.router && 
            this.context.router.route && this.context.router.route.match ?
                this.context.router.route.match.path as string : "";
        const selectedRoute: IExtendedRouteConfig[] = [];
        this.findRoute(globalRoutes, matchedPath, selectedRoute);
        return selectedRoute;
    }

    private findRoute(routes: IExtendedRouteConfig[], matchedPath: string,
        currentPath: IExtendedRouteConfig[]) : boolean {
        for (const route of routes) {
            currentPath.push(route);
            if (matchPath(matchedPath, route) ||
                (route.routes && this.findRoute(route.routes, matchedPath, currentPath))) {
                return true;
            }
            currentPath.pop();
        }
        return false;
    };

    public render() {
        const selectedMenuItemPath = this.getSelectedMenuItemPath();
        const title = selectedMenuItemPath.length > 0 ?
            selectedMenuItemPath[selectedMenuItemPath.length - 1].title || "" : "";

        const breadcrumbItems: JSX.Element[] = [];
        for (const menuItem of selectedMenuItemPath) {
            breadcrumbItems.push(<Breadcrumb.Item key={menuItem.title}>{menuItem.title}</Breadcrumb.Item>);
        }
        const breadcrumb = breadcrumbItems.length > 1 ?
            <Breadcrumb>
                {breadcrumbItems}
            </Breadcrumb> : null;

        return (
            <Layout className={this.state.mobileMode ? "layout-mobile" : ""} hasSider={true}>
                <Layout.Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    collapsible={true}
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                    trigger={null}
                >
                    <div className="logo" />
                    <SidebarMenu selectedMenuItemPath={selectedMenuItemPath} />
                </Layout.Sider>
                <Layout>
                    <Layout.Header className="layout-header">
                        <AppBar
                            sidebarCollapsed={this.state.collapsed}
                            onToggleCollapsed={this.toggleCollapsed}
                            pageTitle={title}
                            mobileMode={this.state.mobileMode}
                        />
                    </Layout.Header>
                    <Layout.Content className="layout-content">
                        <div style={{ margin: '16px 0' }}>
                            {breadcrumb}
                        </div>
                        {this.props.children}
                    </Layout.Content>
                    <Layout.Footer className="layout-footer">
                        ©{new Date().getFullYear()} Vendeq
                </Layout.Footer>
                </Layout>
            </Layout>
        );
    }
}
