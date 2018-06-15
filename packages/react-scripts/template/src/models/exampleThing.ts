export interface IExampleThing {
    id?: string;
    name: string;
}

export interface IExampleThingMap {
    [id: string]: IExampleThing;
}