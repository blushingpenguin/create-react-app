// vim: set ts=4 sw=4
import { Icon, Menu } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { routes as globalRoutes } from '../routes';
import { IExtendedRouteConfig } from './routing';
import './styles/SidebarMenu.less';

interface ISidebarMenuBaseProps {
    selectedMenuItemPath: IExtendedRouteConfig[];
}

interface ISidebarMenuState {
    openKeys: string[];
}

class SidebarMenu extends React.Component<ISidebarMenuBaseProps, ISidebarMenuState> {
    constructor(props: ISidebarMenuBaseProps) {
        super(props);

        const menuItemPath = this.props.selectedMenuItemPath;
        const openKeys: string[] = [];
        for (let i = 0; i < menuItemPath.length - 1; ++i) {
            openKeys.push(menuItemPath[i].title!);
        }

        this.state = {
            openKeys
        };
    }

    private getMenuItems = (routes: IExtendedRouteConfig[]): JSX.Element[] => {
        return routes.map((route) => {
            if (route.routes && route.routes.length > 0) {
                return (
                    <Menu.SubMenu key={route.title} title={route.title}>
                        {this.getMenuItems(route.routes)}
                    </Menu.SubMenu>
                );
            } else {
                return (
                    <Menu.Item key={route.path!}>
                        {route.icon ? <Icon type={route.icon} /> : null}
                        <Link to={route.path!}>{route.title}</Link>
                    </Menu.Item>
                );
            }
        });
    }

    private onOpenChange = (openKeys: string[]) => {
        this.setState({
            openKeys
        });
    }

    public render() {
        return (
            <Menu
                className="sidebar-menu"
                mode="inline"
                selectedKeys={this.props.selectedMenuItemPath.map(x => x.path||"")}
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
            >
                {this.getMenuItems(globalRoutes)}
            </Menu>
        );
    }
}

export default SidebarMenu;
