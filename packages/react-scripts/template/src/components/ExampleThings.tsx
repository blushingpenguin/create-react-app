import { Affix, Col, Input, Row } from "antd";
import * as React from "react";
import { connect, Dispatch, MapDispatchToPropsFunction } from "react-redux";
import { AnyAction, bindActionCreators } from "redux";
import { IRootStoreState } from "../models/state";
import { exampleThingActions, exampleThingActionTypes } from "../redux/exampleThings";
import ExampleThing from "./ExampleThing";

interface IExampleThingsStoreProps {
    loaded: boolean;
    exampleThingIds: string[];
}

interface IExampleThingsActionProps {
    getExampleThings: typeof exampleThingActions.getExampleThings;
}

type IExampleThingsProps = IExampleThingsStoreProps & IExampleThingsActionProps;

interface IExampleThingsState {
    search: string;
}

class ExampleThings extends React.Component<IExampleThingsProps, IExampleThingsState> {

    constructor (props: IExampleThingsProps) {
        super(props);

        this.state = {
            search: ""
        }
    }

    public componentDidMount() {
        if (!this.props.loaded) {
            this.onSearch("");
        }
    }

    private onSearch = (value: string) => {
        this.setState({
            search: value
        })
        this.props.getExampleThings(value);
    }

    public render() {
        const { loaded, exampleThingIds } = this.props;

        if (!loaded) {
            return null;
        }

        const exampleThings = exampleThingIds.map((exampleThingId: string) => (
            <Col key={"exampleThing_" + exampleThingId} span={8} style={{ minWidth: "300px" }}><ExampleThing exampleThingId={exampleThingId} /></Col>
        ));

        return (
            <div>
                <Affix>
                    <Input.Search placeholder="Find a thing..." enterButton="Search" size="large" onSearch={this.onSearch} />
                </Affix>
                <Row style={{ maxWidth: "1500px", margin: "auto" }}>
                    {exampleThings}
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state: IRootStoreState, ownProps: any): IExampleThingsStoreProps => ({
    loaded: state.exampleApp.pageSettings.loadedRequests[exampleThingActionTypes.GET_EXAMPLE_THINGS],
    exampleThingIds: state.exampleApp.exampleThings.allIds
});

const mapActionsToProps = (dispatch: Dispatch<AnyAction>): IExampleThingsActionProps => {
    return bindActionCreators({ getExampleThings: exampleThingActions.getExampleThings}, dispatch);
}

export default connect<IExampleThingsStoreProps, IExampleThingsActionProps, any>(mapStateToProps, mapActionsToProps)(ExampleThings);


