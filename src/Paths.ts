
import Server from './Server'
import ExternalDocumentation from "./ExternalDocumentation"
import {Callback, Parameter, Reference, RequestBody, Response} from "./Components"

//  https://swagger.io/specification/#operation-object
export interface Operation {
    tags: string[]                                  //  A list of tags for API documentation control.
    summary: string                                 //  A short summary of what the operation does.
    description: string                             //  A verbose explanation of the operation behavior.
    externalDocs: ExternalDocumentation             //  Additional external documentation for this operation.
    operationId: string                             //  Unique string used to identify the operation.
    parameters: (Operation | Parameter)[]           //  A list of parameters that are applicable for this operation.
    requestBody: (RequestBody | Reference)          //  The request body applicable for this operation.
    responses: Map<string, Response>                //  REQUIRED. The list of possible responses as they are returned from executing this operation.
    callback: Map<string, (Callback | Reference)>   //  A map of possible out-of band callbacks related to the parent operation.
    deprecated: boolean                             //  Declares this operation to be deprecated.
    security: Map<string, string[]>                 //  A declaration of which security mechanisms can be used for this operation. To make security optional, an empty security requirement ({}) can be included in the array.
    servers: Server[]                               //  An alternative server array to service this operation.
}



// https://swagger.io/specification/#path-item-object
export interface PathItem {
    $ref: string            //  Allows for an external definition of this path item. The referenced structure MUST be in the format of a Path Item Object.
    summary: string         //  An optional, string summary, intended to apply to all operations in this path.
    description: string     //  An optional, string description, intended to apply to all operations in this path.
    get: Operation          //  A definition of a GET operation on this path.
    put: Operation          //  A definition of a PUT operation on this path.
    post: Operation
    delete: Operation
    options: Operation
    head: Operation
    patch: Operation
    trace: Operation
    servers: Server[]       //  An alternative server array to service all operations in this path.
    parameters: (Operation | Parameter)[]   //  A list of parameters that are applicable for all the operations described under this path.
}