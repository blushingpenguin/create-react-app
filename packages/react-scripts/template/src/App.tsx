import * as React from 'react';
import { Provider, Store } from "react-redux";
import { BrowserRouter } from "react-router-dom";
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
                    title="Example app">
                    <BrowserRouter>
                        {renderRoutes(makeRoutes(localRoutes))}
                    </BrowserRouter>
                </AppLocalizationProvider>
            </Provider>
        );
    }
}

export default App;
