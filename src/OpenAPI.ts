import OpenAPI_Spec, { } from "./interfaces/OpenAPI_Spec"






export default class OpenAPI {
    api: OpenAPI_Spec;

    constructor(api: OpenAPI_Spec) {
        this.api = api;
    }

    validate() {
        console.log(Object.keys(this.api));


        return true;
    }








}
