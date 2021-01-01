/*
 * OpenAPI_Spec 3.0.3 in TS
 * UNOFFICIAL
 *
 * compiled from Swagger Specs by Phil Kubin (philku)
 */

// OpenAPI Object
// https://swagger.io/specification/
export default interface OpenAPIInterface {
  // 	REQUIRED. This string MUST be the semantic version number of the OpenAPI_Spec Specification version that the
  // 	OpenAPI_Spec document uses.
  openapi: string;

  //  REQUIRED. Provides metadata about the OpenAPI. The metadata MAY be used by tooling as required.
  info: InfoInterface;

  //  An array of Server Objects, which provide connectivity information to a target server.
  servers?: ServerInterface[];

  //  REQUIRED. The available paths and operations for the OpenAPI.
  paths: Record<string, PathItemInterface>;

  //	An element to hold various schemas for the specification.
  components?: ComponentsInterface;

  //  A declaration of which security mechanisms can be used across the OpenAPI. Each name MUST correspond to a
  //  security scheme which is declared in the Security Schemes under the Components Object.
  security?: Record<string, string[]>;

  //  A list of tags used by the specification with additional metadata.
  tags?: TagInterface[];

  //  Additional external documentation.
  externalDocs?: ExternalDocumentationInterface;
}

// Info Object
// https://swagger.io/specification/#info-object
export interface InfoInterface {
  // 	REQUIRED. The title of the API.
  title: string;

  //  A short description of the API.
  description?: string;

  //  A URL to the Terms of Service for the OpenAPI. MUST be in the format of a URL.
  termsOfService?: string;

  //  The contact information for the exposed OpenAPI.
  contact?: ContactInterface;

  //  The license information for the exposed OpenAPI.
  license?: LicenseInterface;

  //  REQUIRED. The version of the OpenAPI_Spec document.
  version: string;
}

// Contact Object
// https://swagger.io/specification/#contact-object
export interface ContactInterface {
  //  The identifying name of the contact person/organization.
  name?: string;

  //  The URL pointing to the contact information. MUST be in the format of a URL.
  url?: string;

  //  The email address of the contact person/organization. MUST be in the format of an email address.
  email?: string;
}

// License Object
// https://swagger.io/specification/#license-object
export interface LicenseInterface {
  //  REQUIRED. The license name used for the OpenAPI.
  name: string;

  //  A URL to the license used for the OpenAPI. MUST be in the format of a URL.
  url?: string;
}

// Server Object
// https://swagger.io/specification/#server-object
export interface ServerInterface {
  //  REQUIRED. A URL to the target host.
  url: string;

  //  An optional string describing the host designated by the URL.
  destination?: string;

  //  A map between a variable name and its value.
  variables?: Record<string, ServerVariableInterface>;
}

// Server Variable Object
// https://swagger.io/specification/#server-variable-object
export interface ServerVariableInterface {
  //  An enumeration of string values to be used if the substitution options are from a limited set. The array
  //  SHOULD NOT be empty.
  enum?: string[];

  //  REQUIRED. The default value to use for substitution, which SHALL be sent if an alternate value is not supplied.
  default: string;

  //  An optional description for the server variable.
  description?: string;
}

// Components Object
// https://swagger.io/specification/#components-object
export interface ComponentsInterface {
  //  An object to hold reusable Schema Objects.
  schemas: Record<string, SchemaInterface | ReferenceInterface>;

  //  An object to hold reusable Response Objects.
  responses: Record<string, ResponseInterface | ReferenceInterface>;

  //  An object to hold reusable Parameter Objects.
  parameters: Record<string, ParameterInterface | ReferenceInterface>;

  //  An object to hold reusable Example Objects.
  examples: Record<string, ExampleInterface | ReferenceInterface>;

  //  An object to hold reusable Request Body Objects.
  requestBodies: Record<string, RequestBodyInterface | ReferenceInterface>;

  //  An object to hold reusable Header Objects.
  headers: Record<string, HeaderInterface | ReferenceInterface>;

  //  An object to hold reusable Security Scheme Objects.
  securitySchemes: Record<string, SecuritySchemeInterface | ReferenceInterface>;

  //  An object to hold reusable Link Objects.
  links: Record<string, LinkInterface | ReferenceInterface>;

  //  An object to hold reusable Callback Objects.
  callbacks: Record<string, CallbackType | ReferenceInterface>;
}

// Path Item Object
// https://swagger.io/specification/#path-item-object
export interface PathItemInterface {
  //  Allows for an external definition of this path item. The referenced structure MUST be a Path Item Object.
  $ref?: string;

  //  An optional, string summary, intended to apply to all operations in this path.
  summary?: string;

  //  An optional, string description, intended to apply to all operations in this path.
  description?: string;

  //  A definition of a GET operation on this path.
  get?: OperationInterface;

  //  A definition of a PUT operation on this path.
  put?: OperationInterface;

  //  A definition of a POST operation on this path.
  post?: OperationInterface;

  //  A definition of a DELETE operation on this path.
  delete?: OperationInterface;

  //  A definition of a OPTIONS operation on this path.
  options?: OperationInterface;

  //  A definition of a HEAD operation on this path.
  head?: OperationInterface;

  //  A definition of a PATCH operation on this path.
  patch?: OperationInterface;

  //  A definition of a TRACE operation on this path.
  trace?: OperationInterface;

  //  An alternative server array to service all operations in this path
  servers?: ServerInterface[];

  //  A list of parameters that are applicable for all the operations described under this path.
  parameters?: (OperationInterface | ParameterInterface)[];
}

//  Operation Object
//  https://swagger.io/specification/#operation-object
export interface OperationInterface {
  //  A list of tags for OpenAPI documentation control.
  tags?: string[];

  //  A short summary of what the operation does.
  summary?: string;

  //  A verbose explanation of the operation behavior.
  description?: string;

  //  Additional external documentation for this operation.
  externalDocs?: ExternalDocumentationInterface;

  //  Unique string used to identify the operation.
  operationId?: string;

  //  A list of parameters that are applicable for this operation.
  parameters?: (OperationInterface | ParameterInterface)[];

  //  The request body applicable for this operation.
  requestBody?: RequestBodyInterface | ReferenceInterface;

  //  REQUIRED. The list of possible responses as they are returned from executing this operation.
  responses: Record<string, ResponseInterface>;

  //  A map of possible out-of band callbacks related to the parent operation.
  callback?: Record<string, CallbackType | ReferenceInterface>;

  //  Declares this operation to be deprecated.
  deprecated?: boolean;

  //  A declaration of which security mechanisms can be used for this operation. To make security optional, an empty
  //  security requirement ({}) can be included in the array.
  security?: Record<string, string[]>;

  //  An alternative server array to service this operation.
  servers?: ServerInterface[];
}

// External Documentation Object
// https://swagger.io/specification/#external-documentation-object
export interface ExternalDocumentationInterface {
  //  REQUIRED. The URL for the target documentation. Value MUST be in the format of a URL.
  url: string;

  //  A short description of the target documentation.
  description?: string;
}

// Parameter Object
// https://swagger.io/specification/#parameter-object
export interface ParameterInterface extends HeaderInterface {
  //  REQUIRED. The name of the parameter. Parameter names are case sensitive.
  name: string;

  //  REQUIRED. The location of the parameter. Possible values are "query", "header", "path" or "cookie".
  in: 'query' | 'header' | 'path' | 'cookie';
}

// Request Body Object
// https://swagger.io/specification/#request-body-object
export interface RequestBodyInterface {
  //  REQUIRED. The content of the request body. The key is a media type or media type range and the value describes
  //  it. For requests that match multiple keys, only the most specific key is applicable. e.g. text/plain overrides
  //  text
  content: Record<string, MediaTypeInterface>;

  //  A brief description of the request body. This could contain samples of use.
  description?: string;

  //  Determines if the request body is required in the request. Defaults to false.
  required?: boolean;
}

//  Media Type Object
//  https://swagger.io/specification/#media-type-object
export interface MediaTypeInterface {
  //  The schema defining the content of the request, response, or parameter.
  schema: SchemaInterface | ReferenceInterface;

  //  Example of the media type. The example object SHOULD be in the correct format as specified by the media type.
  example?: MediaTypeInterface;

  //  Examples of the media type. Each example object SHOULD match the media type and specified schema if present.
  examples?: Record<string, ExampleInterface | ReferenceInterface>;

  //  A map between a property name and its encoding information.
  encoding?: Record<string, EncodingInterface>;
}

// Encoding Object
// https://swagger.io/specification/#encoding-object
export interface EncodingInterface {
  //  The Content-Type for encoding a specific property.
  contentType?: string;

  //  A map allowing additional information to be provided as headers. This property SHALL be ignored if the request
  //  body media type is not a multipart.
  headers?: Record<string, HeaderInterface | ReferenceInterface>;

  //  Describes how a specific property value will be serialized depending on its type.
  style?: string;

  //  Property values of type array or object generate separate parameters for each value
  explode?: boolean;

  //  Determines whether the parameter value SHOULD allow reserved characters, as defined by RFC3986
  //  :/?#[]@!$&'()*+,;= to be included without percent-encoding.
  //  The default value is false.
  allowReserved?: boolean;
}

// Response Object
// https://swagger.io/specification/#response-object
export interface ResponseInterface {
  //  REQUIRED. A short description of the response.
  description: string;

  //  Maps a header name to its definition.
  headers?: Record<string, HeaderInterface | ReferenceInterface>;

  //  A map containing descriptions of potential response payloads. The key is a media type or media type range and
  //  the value describes it.
  content?: Record<string, MediaTypeInterface>;

  //  A map of operations links that can be followed from the response. The key of the map is a short name for the
  //  link, following the naming constraints of the names for Component Objects.
  links?: Record<string, LinkInterface | ReferenceInterface>;
}

//  Callback Object
//  https://swagger.io/specification/#callback-object
export type CallbackType = Record<
  string,
  PathItemInterface | PathItemInterface[]
>;

//  Example Object
//  https://swagger.io/specification/#example-object
export interface ExampleInterface {
  //  Short description for the example.
  summary?: string;

  //  Long description for the example.
  description?: string;

  //  Embedded literal example. The value field and externalValue field are mutually exclusive.
  value?: any;

  //  A URL that points to the literal example. This provides the capability to reference samples that cannot easily
  //  be included in JSON or YAML documents.
  externalValue?: string;
}

//  Link Object
//  https://swagger.io/specification/#link-object
export interface LinkInterface {
  //  A relative or absolute URI reference to an OAS operation. This field is mutually exclusive of the operationId
  //  field, and MUST point to an Operation Object.
  operationRef?: string;

  //  The name of an existing, resolvable OAS operation, as defined with a unique operationId.
  operationId?: string;

  //  A map representing parameters to pass to an operation as specified with operationId or identified via operationRef
  parameters?: Record<string, PathItemInterface>;

  //  A literal value or {expression} to use as a request body when calling the target operation.
  requestBody?: any;

  //  A description of the link
  description?: string;

  //  A server object to be used by the target operation.
  server?: ServerInterface;
}

//  Header Object
//  https://swagger.io/specification/#header-object
export interface HeaderInterface {
  //  A brief description of the parameter/header. This could contain samples of use.
  description?: string;

  //  Determines whether this parameter/header is mandatory. If the parameter location is "path", this property is
  // REQUIRED and its value MUST be true
  required?: boolean;

  //  Specifies that a parameter is deprecated and SHOULD be transitioned out of usage.
  deprecated?: boolean;

  //  Sets the ability to pass empty-valued parameter/headers. This is valid only for query parameters and allows
  // sending a parameter with an empty value.
  allowEmptyValue?: boolean;

  //  The rules for serialization of the parameter are specified in one of two ways. For simpler scenarios, a schema
  // and style can describe the structure and syntax of the parameter.

  //  Describes how the parameter value will be serialized depending on the type of the parameter value.
  style?:
    | 'matrix'
    | 'label'
    | 'form'
    | 'simple'
    | 'spaceDelimited'
    | 'pipeDelimited'
    | 'deepObject';

  //  When this is true, parameter/header values of type array or object generate separate parameters for each value of
  // the array or key-value pair of the map.
  explode?: boolean;

  //  Determines whether the parameter/header value SHOULD allow reserved characters, as defined by RFC3986
  //  :/?#[]@!$&'()*+, = to be included without percent-encoding.
  allowReserved?: boolean;

  //  The schema defining the type used for the parameter.
  schema?: SchemaInterface | ReferenceInterface;

  //  Example of the parameter/header's potential value.
  example?: any;

  //  Examples of the parameter/header's potential value. For more complex scenarios, the content property can define
  //  the media type and schema of the parameter. A parameter/header MUST contain either a schema property, or a content
  //  property, but not both.
  examples?: Record<string, ExampleInterface | ReferenceInterface>;

  //  A map containing the representations for the parameter/header. The key is the media type and the value
  //  describes it. The map MUST only contain one entry.
  content?: Record<string, MediaTypeInterface>;
}

//  Tag Object
//  https://swagger.io/specification/#tag-object
export interface TagInterface {
  //  REQUIRED. The name of the tag.
  name: string;

  //  A short description for the tag.
  description?: string;

  //  Additional external documentation for this tag.
  externalDocs?: ExternalDocumentationInterface;
}

//  Reference Object
//  https://swagger.io/specification/#reference-object
export interface ReferenceInterface {
  //  REQUIRED. The reference string.
  $ref: string;
}

// Schema Object
//  https://swagger.io/specification/#schema-object
//  https://tools.ietf.org/html/draft-wright-json-schema-validation-00
export interface SchemaInterface {
  title?: string;

  description?: string;

  // Type of value. (Null can be set for any if 'nullable' is true)
  type: 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object';

  //  Format of type
  format:
    | 'int32' // type: integer
    | 'int64' // type: integer
    | 'float' // type: number
    | 'double' // type: number
    | 'byte' // type: string  (files)
    | 'binary' // type: string  (files)
    | 'date' // type: string
    | 'date-time' // type: string
    | 'password' // type: string
    | string; // Format is technically open.

  // Default value
  default?: any;

  // can the value be null
  nullable?: boolean;

  // Value sent in responses, NOT requests. Relevant only for Schema "properties" definitions.
  readOnly?: boolean;

  // Value sent in requests, NOT responses. Relevant only for Schema "properties" definitions.
  writeOnly?: boolean;

  // Adds additional metadata to describe the XML representation of this property.
  xml?: XmlInterface;

  externalDocs?: ExternalDocumentationInterface;

  // A free-form property to include an example of an instance for this schema.
  example?: any;

  // Specifies that a schema is deprecated and SHOULD be transitioned out of usage.
  deprecated?: boolean;

  /* NUMBER | INTEGER */
  // type: number|integer   Numbers can be restricted to a multiple of a given number, using the multipleOf keyword
  multipleOf?: number;

  //  type: number|integer    x <= maximum
  maximum?: number;

  // Is the max exclusive. i.e. Can the number be the maximum
  exclusiveMaximum?: boolean;

  // type: number|integer                x >= maximum
  minimum?: number;

  // Is the min exclusive. i.e. Can the number be the minimum
  exclusiveMinimum?: boolean;

  /* STRING */
  // string, minimum length
  minLength?: number;

  // string, maximum length
  maxLength?: number;

  // string, regex to match https://www.ecma-international.org/ecma-262/5.1/#sec-15.10.1
  pattern?: string;

  // An enumeration of string values to be used if options are from a limited set.
  enum?: string[];

  /* ARRAY */
  // array, maximum length
  maxItems?: number;

  // array, minimum length
  minItems?: number;

  // array, do all items need to be unique?
  uniqueItems?: boolean;

  // key to determine the field that holds the Type Name
  // TODO: Verify placement and info https://swagger.io/specification/#discriminator-object
  discriminator?: Record<string, string | Record<string, unknown>>;
  /*
   discriminator:
   propertyName: objectType
   mapping:
   obj1: '#/components/schemas/Object1'
   obj2: '#/components/schemas/Object2'
   system: 'sysObject.json#/sysObject'
   */

  // validates the value against exactly one of the subschemas
  oneOf?: (SchemaInterface | ReferenceInterface)[];

  //  validates the value against any (one or more) of the subschemas
  anyOf?: (SchemaInterface | ReferenceInterface)[];

  not?: (SchemaInterface | ReferenceInterface)[];

  // validates the value against all the subschemas
  allOf?: (SchemaInterface | ReferenceInterface)[];

  items?: (SchemaInterface | ReferenceInterface)[];

  /* OBJECT */
  // object, Object.keys(object).length maximum
  maxProperties?: number;

  // object, Object.keys(object).length minimum
  minProperties?: number;

  // Array of strings identifying the required fields in an object.
  required?: string[];

  // Properties of an object
  properties?: Record<string, SchemaInterface>;

  additionalProperties?: boolean | SchemaInterface | ReferenceInterface;
}

//  XML Object
//  https://swagger.io/specification/#xml-object
//  https://swagger.io/docs/specification/data-models/representing-xml/
export interface XmlInterface {
  // Overide the schema name 'wrapped' must be set to true
  name?: string;

  // Absolute URI of the namespace definition.
  namespace?: string;

  prefix?: string;

  // converts property => attribute
  attribute?: boolean;

  // Adds a wrapping element to an array definition
  wrapped?: boolean;
}

//  Security Scheme Object
//  https://swagger.io/specification/#security-scheme-object
export interface SecuritySchemeInterface {
  // Any      REQUIRED. The type of the security scheme.
  type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';

  // Any      A short description for security scheme.
  description?: string;

  // apiKey   REQUIRED. The name of the header, query or cookie parameter to be used.
  name?: string;

  // apiKey   REQUIRED. The location of the OpenAPI key. Valid values are "query", "header" or "cookie".
  in?: string;

  // http     REQUIRED. The name of the HTTP Authorization scheme to be used in the Authorization header as defined in
  // RFC7235. The values used SHOULD be registered in the IANA Authentication Scheme registry.
  scheme?: string;

  // http("bearer")   A hint to the client to identify how the bearer token is formatted.
  bearerFormat: string;

  // oauth2   REQUIRED. An object containing configuration information for the flow types supported.
  flows: OAuthFlowsInterface;

  // openIdConnect    REQUIRED. OpenId Connect URL to discover OAuth2 configuration values. This MUST be in the form
  // of a URL.
  openIdConnectUrl: string;
}

/**
 * OAuth Flows Object
 *
 * Allows configuration of the supported OAuth Flows.
 * https://swagger.io/specification/#oauth-flows-object
 */
export interface OAuthFlowsInterface {
  //  Configuration for the OAuth Implicit flow
  implicit?: OAuthFlowInterface;

  //  Configuration for the OAuth Resource Owner Password flow
  password?: OAuthFlowInterface;

  //  Configuration for the OAuth Client Credentials flow. Previously called application in OpenAPI 2.0.
  clientCredentials?: OAuthFlowInterface;

  //  Configuration for the OAuth Authorization Code flow. Previously called accessCode in OpenAPI 2.0.
  authorizationCode?: OAuthFlowInterface;
}

/**
 * OAuth Flow Object
 *
 * Configuration details for a supported OAuth Flow
 * https://swagger.io/specification/#oauth-flow-object
 */
export interface OAuthFlowInterface {
  // oauth2 ("implicit", "authorizationCode")   REQUIRED. The authorization URL to be used for this flow.
  authorizationUrl?: string;

  // oauth2 ("password", "clientCredentials", "authorizationCode")    REQUIRED. The token URL to be used for this flow.
  tokenUrl?: string;

  // oauth2   The URL to be used for obtaining refresh tokens.
  refreshUrl?: string;

  // oauth2   REQUIRED. The available scopes for the OAuth2 security scheme. A map between the scope name and a
  // short description for it. The map MAY be empty.
  scopes: Record<string, string>;
}
