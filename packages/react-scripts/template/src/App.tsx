import * as React from 'react';
import { Provider, Store } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderRoutes from "./common/RenderRoutes";
// import { GlobalOptions } from "./globalOptions";
// import { AppLocalizationProvider } from './i18n/AppLocalizationProvider';
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
                <BrowserRouter>
                    {renderRoutes(localRoutes)}
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
