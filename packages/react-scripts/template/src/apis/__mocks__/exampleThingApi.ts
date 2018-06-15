import { AxiosResponse } from "axios";
import { IExampleThing } from "../../models/exampleThing"

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

// Can be moved to framework library
function successResponse<T>(value: T): AxiosResponse<T> {
    return {
        config: {},
        data: value,
        headers: {},
        status: 200,
        statusText: "OK"
    };
};

class ExampleThingApi {
    public getExampleThings(search?: string, skip?: number, take?: number): Promise<AxiosResponse<IExampleThing[]>> {
        return new Promise<AxiosResponse<IExampleThing[]>>((resolve, reject) => {
            resolve(successResponse(mockRepo));
        });
    }

	public getExampleThing(appId: string): Promise<AxiosResponse<IExampleThing>> {
		return new Promise<AxiosResponse<IExampleThing>>((resolve, reject) => {
            let match: IExampleThing | null = null;
            for (const item of mockRepo) {
                if (item.id === appId) {
                    match = item;
                    break;
                }
            }
            if (match) {
                resolve(successResponse(match));
            } else {
                reject({ error: "Failed to find " + appId});
            }
        });
    }
    
    public createExampleThing(app: IExampleThing): Promise<AxiosResponse<IExampleThing>> {
		return new Promise<AxiosResponse<IExampleThing>>((resolve, reject) => {
            app.id = "" + ++idSequence;
            mockRepo.push(app);

            resolve(successResponse(app));
        });
    }
    
    public updateExampleThing(appId: string, app: IExampleThing): Promise<AxiosResponse<IExampleThing>> {
		return new Promise<AxiosResponse<IExampleThing>>((resolve, reject) => {
            for (let i = 0; i < mockRepo.length; ++i) {
                if (mockRepo[i].id === appId) {
                    mockRepo[i] = app;
                    break;
                }
            }
            
            resolve(successResponse(app));
        });
    }
    
    public deleteExampleThing(appId: string): Promise<AxiosResponse> {
		return new Promise<AxiosResponse>((resolve, reject) => {
            for (let i = 0; i < mockRepo.length; ++i) {
                if (mockRepo[i].id === appId) {
                    mockRepo.splice(i, 1);
                    break;
                }
            }

            resolve(successResponse(null));
        });
	}
}

export default new ExampleThingApi();
