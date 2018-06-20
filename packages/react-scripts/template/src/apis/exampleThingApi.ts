import axios, { AxiosResponse } from "axios"
import { successResponse } from "vendeq-ui-common";
import { IExampleThing } from "../models/exampleThing"


let idSequence = 0;
const mockRepo: IExampleThing[] = [{
    id: "" + ++idSequence,
    name: "Example thing " + idSequence
}, {
    id: "" + ++idSequence,
    name: "Example thing " + idSequence
}, {
    id: "" + ++idSequence,
    name: "Example thing " + idSequence
}];

class ExampleThingApi {
	private apiRoot: string;

	constructor(apiUrl: string) {
		this.apiRoot = apiUrl + '/globalapps/';
    }
    
    public getExampleThings(search?: string, skip?: number, take?: number): Promise<AxiosResponse<IExampleThing[]>> {
        return new Promise<AxiosResponse<IExampleThing[]>>((resolve, reject) => {
            resolve(successResponse(mockRepo));
        });
    }

	public getExampleThing(appId: string): Promise<AxiosResponse<IExampleThing>> {
		return axios.get(this.apiRoot + appId, { withCredentials: true});
    }
    
    public createExampleThing(app: IExampleThing): Promise<AxiosResponse<IExampleThing>> {
		return axios.post(this.apiRoot, app, { withCredentials: true});
    }
    
    public updateExampleThing(appId: string, app: IExampleThing): Promise<AxiosResponse<IExampleThing>> {
		return axios.post(this.apiRoot + appId, app, { withCredentials: true});
    }
    
    public deleteExampleThing(appId: string): Promise<AxiosResponse> {
		return axios.delete(this.apiRoot + appId, { withCredentials: true});
	}
}

let url = "";
if (process.env.NODE_ENV === "development") {
	url = "http://localhost:500X/ExampleThingApi"; // local
} else {
	url = "/ExampleThingApi"; // live
}

export default new ExampleThingApi(url);
