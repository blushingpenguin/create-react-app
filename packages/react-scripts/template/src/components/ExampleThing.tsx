import * as React from "react";
import { connect } from "react-redux";

import { Card } from "antd";
import { IExampleThing } from "../models/exampleThing";
import { IRootStoreState } from "../models/state";

interface IAppBaseProps {
    exampleThingId: string;
}

interface IAppStoreProps {
    exampleThing: IExampleThing;
}


type IAppProps = IAppBaseProps & IAppStoreProps;

class App extends React.Component<IAppProps> {
    public render() {
        const { exampleThing } = this.props;

        if (!exampleThing) {
            return null;
        }

        return (
            <Card title={exampleThing.name} style={{margin: "20px", height: "200px"}}>
                <div>Some content</div>
            </Card>
        );
    }
}

const mapStateToProps = (state: IRootStoreState, ownProps: IAppBaseProps): IAppStoreProps => ({
    exampleThing: state.exampleApp.exampleThings.byId[ownProps.exampleThingId]
});

export default connect<IAppStoreProps, any, IAppBaseProps>(mapStateToProps)(App);
