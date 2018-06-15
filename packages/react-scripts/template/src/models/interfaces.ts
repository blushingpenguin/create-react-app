import { AxiosPromise } from "axios";

// shared interfaces
export interface IAction<T> {
	type: string;
	payload: T;
}

export function SimpleActionCreator(type: string): () => IAction<any> {
	return (): IAction<any> => ({
		type,
		payload: null
	});
};

export function PayloadActionCreator<T>(type: string): (payload: T) => IAction<T> {
	return (payload: T): IAction<T> => ({
		type,
		payload
	});
};

export interface IAxiosPromise<T = any> {
	promise: AxiosPromise<T>;
}
