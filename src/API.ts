import OpenAPI_Spec, {valid_server} from "./interfaces/OpenAPI"


export default class API {
    api: OpenAPI_Spec;

    constructor(api: OpenAPI_Spec) {
        this.api = api;
    }

    validate() {
        console.log(Object.keys(this.api));


        return true;
    }
}
