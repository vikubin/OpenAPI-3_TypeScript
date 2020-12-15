
import Info from "./Info"
import Server from "./Server"
import {PathItem} from "./Paths"
import Components from "./Components"
import Tag from "./Tag"
import ExternalDocumentation from "./ExternalDocumentation"

// https://swagger.io/specification/
// 3.0.3
interface OpenAPI {
    openapi: string                         // 	REQUIRED. This string MUST be the semantic version number of the OpenAPI Specification version that the OpenAPI document uses.
    info: Info                              //  REQUIRED. Provides metadata about the API. The metadata MAY be used by tooling as required.
    servers?: Server[]                      //  An array of Server Objects, which provide connectivity information to a target server.
    paths: Map<string, PathItem>            //  REQUIRED. The available paths and operations for the API.
    components?: Components                 //	An element to hold various schemas for the specification.
    security?: Map<string, string[]>        //  A declaration of which security mechanisms can be used across the API.
    tags?: Tag[]                            //  A list of tags used by the specification with additional metadata.
    externalDocs?: ExternalDocumentation    //  Additional external documentation.
}



