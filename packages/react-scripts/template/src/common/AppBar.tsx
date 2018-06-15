// vim: set ts=4 sw=4
import { Dropdown, Icon, Input, Menu } from 'antd';
// import { Localized } from "fluent-react/compat";
import * as React from 'react';
// import { connect } from 'react-redux';
// import { GlobalOptions } from '../globalOptions';
// import { changeLocales } from "../i18n/Locale";
import './styles/AppBar.less';


interface IAppBarBaseProps {
    pageTitle: string;
    mobileMode: boolean;
    sidebarCollapsed: boolean;
    onToggleCollapsed: () => void;
}

interface IAppBarState {
    searchVisible: boolean;
}

class AppBar extends React.Component<IAppBarBaseProps, IAppBarState> {
    constructor(props: IAppBarBaseProps) {
        super(props);

        this.state = {
            searchVisible: false,
        };
    }

    public toggleSearch = () => {
        if (!this.state.searchVisible && this.props.mobileMode && !this.props.sidebarCollapsed) {
            this.props.onToggleCollapsed();
        }

        this.setState({
            searchVisible: !this.state.searchVisible
        });
    };

    public setLang(lang: string) {
        // this.props.changeLocales([lang], GlobalOptions.supportedLanguages);
    }

    public render() {
        const userSettingsMenu = (
            <Menu>
                <Menu.Item key="settings">
                    <Icon className="dropdown-menu-icon" type="setting" />
                </Menu.Item>
                <Menu.Item key="help">
                    <Icon className="dropdown-menu-icon" type="question-circle-o" />
                </Menu.Item>
                <Menu.Item key="signout">
                    <a href="/id/Account/Logout">
                        <Icon className="dropdown-menu-icon" type="logout" />
                    </a>
                </Menu.Item>
            </Menu>
        );

        const langMenu = (
            <Menu>
                <Menu.Item key="en-US" onClick={this.setLang.bind(this, "en-US")}>
                    <Icon className="dropdown-menu-icon" type="setting" />
                </Menu.Item>
                <Menu.Item key="pl-PL" onClick={this.setLang.bind(this, "pl")}>
                    <Icon className="dropdown-menu-icon" type="setting" />
                </Menu.Item>
            </Menu>
        );

        const searchIcon = this.state.searchVisible ? null :
            <Icon
                className="header-icon right-header-icon"
                type="search"
                onClick={this.toggleSearch}
            />;

        const searchBox = this.state.searchVisible ?
            <div className="header-search-box">
                <Input.Search
                    placeholder="Search..." // i18n
                    style={{ width: 250 }}
                    size="large"
                    autoFocus={true}
                    onBlur={this.toggleSearch}
                />
            </div> : null;

        return (
            <div className="layout-header-app-bar">
                <Icon
                    className="header-icon menu-trigger"
                    type={this.props.sidebarCollapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.onToggleCollapsed}
                />
                <span className="layout-header-title">{this.props.mobileMode && this.state.searchVisible ? null : this.props.pageTitle}</span>
                {searchBox}
                {searchIcon}
                <Dropdown overlay={userSettingsMenu} trigger={['click']} placement="bottomCenter">
                    <Icon
                        className="header-icon right-header-icon"
                        type="user"
                    />
                </Dropdown>
                <Dropdown overlay={langMenu} trigger={['click']} placement="bottomCenter">
                    <Icon
                        className="header-icon right-header-icon"
                        type="flag"
                    />
                </Dropdown>
            </div>
        );
    }
}

// const mapStateToProps = (state: IRootStoreState) => ({
//     currentLocales: state.locale.currentLocales,
//     isFetching: state.locale.isFetching
// });
// const mapDispatchToProps = { changeLocales };

// const AppBarConnected = connect(mapStateToProps, mapDispatchToProps)(AppBar);
export default AppBar;
