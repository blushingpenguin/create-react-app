import { Affix, Col, Input, Row } from "antd";
import * as React from "react";
import { connect } from "react-redux";
import { AnyAction, bindActionCreators, Dispatch } from "redux";
import { LocalizedComponent } from "vendeq-locale";
import { IRootStoreState } from "../models/state";
import { exampleThingActions, exampleThingActionTypes } from "../redux/exampleThings";
import ExampleThing from "./ExampleThing";

interface IExampleThingsProps {
    loaded: boolean;
    exampleThingIds: string[];
    getExampleThings: typeof exampleThingActions.getExampleThings;
}

interface IExampleThingsState {
    search: string;
}

class ExampleThings extends LocalizedComponent<IExampleThingsProps, IExampleThingsState> {

    constructor (props: IExampleThingsProps, context: any) {
        super(props, context);

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
                    <Input.Search placeholder={this.getString("search_placeholder")} enterButton={this.getString("search_button")} size="large" onSearch={this.onSearch} />
                </Affix>
                <Row style={{ maxWidth: "1500px", margin: "auto" }}>
                    {exampleThings}
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state: IRootStoreState) => ({
    loaded: state.pageSettings.loadedRequests[exampleThingActionTypes.GET_EXAMPLE_THINGS],
    exampleThingIds: state.exampleApp.exampleThings.allIds
});

const mapActionsToProps = (dispatch: Dispatch<AnyAction>) => {
    return bindActionCreators({ getExampleThings: exampleThingActions.getExampleThings}, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(ExampleThings);
