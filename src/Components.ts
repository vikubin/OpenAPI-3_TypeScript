import {PathItem} from "./Paths"


export interface Response {
    description: string                         //  REQUIRED. A short description of the response.
    headers: Map<string, (Header|Reference)>    //  Maps a header name to its definition.
    content: Map<string, MediaType>             //  A map containing descriptions of potential response payloads. The key is a media type or media type range and the value describes it.
    links: Map<string, (Link|Reference)>        //  A map of operations links that can be followed from the response. The key of the map is a short name for the link, following the naming constraints of the names for Component Objects.
}

export interface Reference {
    "$ref":string   //  REQUIRED. The reference string.
}

export interface Encoding {
    contentType: string                         //  The Content-Type for encoding a specific property.
    headers: Map<string, (Header|Reference)>    //  A map allowing additional information to be provided as headers. This property SHALL be ignored if the request body media type is not a multipart.
    style: string                               //  Describes how a specific property value will be serialized depending on its type.
    explode: boolean
    allowReserved: boolean
}

export interface MediaType {
    schema: (Schema|Reference)                  //  The schema defining the content of the request, response, or parameter.
    example: any                                //  Example of the media type. The example object SHOULD be in the correct format as specified by the media type.
    examples: Map<string, (Example|Reference)>  //  Examples of the media type. Each example object SHOULD match the media type and specified schema if present.
    encoding: Map<string, Encoding>             //  A map between a property name and its encoding information.
}

//  https://swagger.io/specification/#schema-object
//  https://tools.ietf.org/html/draft-wright-json-schema-validation-00
export interface Schema {
    title: string
    multipleOf
    maximum
    exclusiveMaximum
    minimum
    exclusiveMinimum
    maxLength
    pattern                 // https://www.ecma-international.org/ecma-262/5.1/#sec-15.10.1
    maxItems
    minItems
    uniqueItems
    maxProperties
    minProperties
    required
    enum

    // Modified to OpenAPI Spec
    type: string;
    allOf: (Schema|Reference)[]
    oneOf: (Schema|Reference)[]
    anyOf: (Schema|Reference)[]
    not: (Schema|Reference)[]
    items: (object|Schema|Reference)[]
    properties: Map<string, (Schema | Reference)>
    additionalProperties: (boolean|object|Schema|Reference)
    description: string
    format: ("int32"|"int64"|"float"|"double"|"byte"|"binary"|"date"|"date-time"|"password")
    default
    nullable
    discriminator
    readOnly
    writeOnly
    xml
    externalDocs
    example: any
    deprecated: boolean
}
function validate_schema(schema: Schema){

}

export interface Parameter {
    name: string                            //  REQUIRED. The name of the parameter. Parameter names are case sensitive.
    in: ("query"|"header"|"path"|"cookie")  //  REQUIRED. The location of the parameter. Possible values are "query", "header", "path" or "cookie".
    description: string                     //  A brief description of the parameter. This could contain examples of use.
    required: boolean                       //  Determines whether this parameter is mandatory. If the parameter location is "path", this property is REQUIRED and its value MUST be true.
    deprecated: boolean                     //  Specifies that a parameter is deprecated and SHOULD be transitioned out of usage.
    allowEmptyValue: boolean                //  Sets the ability to pass empty-valued parameters. This is valid only for query parameters and allows sending a parameter with an empty value.

    //  The rules for serialization of the parameter are specified in one of two ways. For simpler scenarios, a schema and style can describe the structure and syntax of the parameter.
    style: ("matrix"|"label"|"form"|"simple"|"spaceDelimited"|"pipeDelimited"|"deepObject")   //  Describes how the parameter value will be serialized depending on the type of the parameter value.
    explode: boolean                        //  When this is true, parameter values of type array or object generate separate parameters for each value of the array or key-value pair of the map.
    allowReserved: boolean                  //  Determines whether the parameter value SHOULD allow reserved characters, as defined by RFC3986 :/?#[]@!$&'()*+, = to be included without percent-encoding.
    schema: (Schema | Reference)            //  The schema defining the type used for the parameter.
    example: any                            //  Example of the parameter's potential value.
    examples: Map<string, (Example | Reference)>    //  Examples of the parameter's potential value.

    //  For more complex scenarios, the content property can define the media type and schema of the parameter. A parameter MUST contain either a schema property, or a content property, but not both.
    content: Map<string, MediaType>     //  A map containing the representations for the parameter. The key is the media type and the value describes it. The map MUST only contain one entry.
}
function validate_parameter_style(parameter : Parameter): boolean {
    switch (parameter.in) {
        case "query":
            return !!(parameter.style.match(/^("form"|"spaceDelimited"|"pipeDelimited"|"deepObject")$/))
        case "header":
            return (parameter.style === "simple")
        case "path":
            return !!(parameter.style.match(/^("matrix"|"label"|"simple")$/))
        case "cookie":
            return (parameter.style === "form")
    }
}

//  https://swagger.io/specification/#example-object
export interface Example {
    summary: string         //  Short description for the example.
    description: string     //  Long description for the example.
    value: any              //  Embedded literal example. The value field and externalValue field are mutually exclusive.
    externalValue: string   //  A URL that points to the literal example. This provides the capability to reference examples that cannot easily be included in JSON or YAML documents.
}

export interface RequestBody {
    description: string                     //  A brief description of the request body. This could contain examples of use.
    content: Map<string, MediaType>         //  REQUIRED. The content of the request body. The key is a media type or media type range and the value describes it. For requests that match multiple keys, only the most specific key is applicable. e.g. text/plain overrides text/*
    required: boolean                       //  Determines if the request body is required in the request. Defaults to false.
}

//  https://swagger.io/specification/#header-object
export interface Header {
    // TODO
}

export interface OAuthFlow {
    authorizationUrl: string    // oauth2 ("implicit", "authorizationCode")                         REQUIRED. The authorization URL to be used for this flow.
    tokenUrl: string            // oauth2 ("password", "clientCredentials", "authorizationCode")    REQUIRED. The token URL to be used for this flow.
    refreshUrl: string          // oauth2           The URL to be used for obtaining refresh tokens.
    scopes: Map<string, string> // oauth2           REQUIRED. The available scopes for the OAuth2 security scheme. A map between the scope name and a short description for it. The map MAY be empty.
}


export interface OAuthFlows {
    implicit: OAuthFlow
    password: OAuthFlow
    clientCredentials: OAuthFlow
    authorizationCode: OAuthFlow
}

export interface SecurityScheme {
    type: ("apiKey"|"http"|"oauth2"|"openIdConnect")    // Any      REQUIRED. The type of the security scheme.
    description: string                                 // Any      A short description for security scheme.
    name: string                                        // apiKey   REQUIRED. The name of the header, query or cookie parameter to be used.
    in: string                                          // apiKey   REQUIRED. The location of the API key. Valid values are "query", "header" or "cookie".
    scheme: string                                      // http     REQUIRED. The name of the HTTP Authorization scheme to be used in the Authorization header as defined in RFC7235. The values used SHOULD be registered in the IANA Authentication Scheme registry.
    bearerFormat: string                        // http("bearer")   A hint to the client to identify how the bearer token is formatted.
    flows: OAuthFlows                                   // oauth2   REQUIRED. An object containing configuration information for the flow types supported.
    openIdConnectUrl: string                    // openIdConnect    REQUIRED. OpenId Connect URL to discover OAuth2 configuration values. This MUST be in the form of a URL.
}
function validate_SecurityScheme(scheme: SecurityScheme){
    switch (scheme.type){
        case "apiKey":
            return !!(scheme.name && scheme.in);
        case "http":
            return !!(scheme.scheme);
        case "oauth2":
            return !!(scheme.flows);
        case "openIdConnect":
            return !!(scheme.openIdConnectUrl);
        default:
            return false
    }
}

//  https://swagger.io/specification/#link-object
export interface Link {
    operationRef: string
    operationId: string
    parameters: Map<string, PathItem>     //  The key that identifies the Path Item Object is a runtime expression
}

//  https://swagger.io/specification/#callback-object
export interface Callback {
    //  TODO: https://swagger.io/specification/#callback-object
}



export interface Components {
    schemas: Map<string, (Schema|Reference)>            //  An object to hold reusable Schema Objects.
    responses: Map<string, (Response|Reference)>       //  An object to hold reusable Response Objects.
    parameters: Map<string, (Parameter|Reference)>
    examples: Map<string, (Example|Reference)>
    requestBodies: Map<string, (RequestBody|Reference)>
    headers: Map<string, (Header|Reference)>
    securitySchemes: Map<string, (SecurityScheme|Reference)>
    links: Map<string, (Link|Reference)>
    callbacks: Map<string, (Callback|Reference)>
}
export default Components 