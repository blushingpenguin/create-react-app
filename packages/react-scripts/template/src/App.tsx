import * as React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Store } from 'redux';
import { AppLocalizationProvider } from "vendeq-locale";
import { GlobalOptions, makeRoutes, renderRoutes } from "vendeq-ui-common";
import "vendeq-ui-common/styles.less";
import { IRootStoreState } from './models/state';
import { localRoutes } from "./routes";
import { configureStore } from './store';

class App extends React.Component {
    private store: Store<IRootStoreState>;

    constructor(props: any) {
        super(props);

        this.store = configureStore();
    }

    public render() {
        return (
            <Provider store={this.store}>
                <AppLocalizationProvider
                    cookie={GlobalOptions.languageCookie}
                    supportedLanguages={GlobalOptions.supportedLanguages}
                    ftlFolders={["/public"]}
                    title="Example app">
                    <BrowserRouter>
                        {renderRoutes(makeRoutes(localRoutes), ["/public"])}
                    </BrowserRouter>
                </AppLocalizationProvider>
            </Provider>
        );
    }
}

export default App;
