/*
 * OpenAPI_Spec 3.0.3 in TS
 * UNOFFICIAL
 *
 * compiled from Swagger Specs by Phil Kubin (philku)
 */

interface ExternalDocumentation {
  description?: string; //  A short description of the target documentation.
  url: string; //  REQUIRED. The URL for the target documentation. Value MUST be in the format of a URL.
}

interface Tag {
  name: string; //  REQUIRED. The name of the tag.
  description?: string; //  A short description for the tag.
  externalDocs?: ExternalDocumentation; //  Additional external documentation for this tag.
}

export interface Response {
  description: string; //  REQUIRED. A short description of the response.
  headers: Map<string, Header | Reference>; //  Maps a header name to its definition.
  content: Map<string, MediaType>; //  A map containing descriptions of potential response payloads. The
  // key is a media type or media type range and the value describes it.
  links: Map<string, Link | Reference>; //  A map of operations links that can be followed from the response.
  // The key of the map is a short name for the link, following the
  // naming constraints of the names for Component Objects.
}

export interface Reference {
  $ref: string; //  REQUIRED. The reference string.
}

export interface Encoding {
  contentType: string; //  The Content-Type for encoding a specific property.
  headers: Map<string, Header | Reference>; //  A map allowing additional information to be provided as headers.
  // This property SHALL be ignored if the request body media type is
  // not a multipart.
  style: string; //  Describes how a specific property value will be serialized
  // depending on its type.

  explode: boolean;
  allowReserved: boolean;
}

export interface MediaType {
  schema: Schema | Reference; //  The schema defining the content of the request, response, or
  // parameter.
  example: MediaType; //  Example of the media type. The example object SHOULD be in the
  // correct format as specified by the media type.
  examples: Map<string, Example | Reference>; //  Examples of the media type. Each example object SHOULD match the
  // media type and specified schema if present.
  encoding: Map<string, Encoding>; //  A map between a property name and its encoding information.
}


//  https://swagger.io/docs/specification/data-models/representing-xml/
export interface Xml {

  // Overide the schema name 'wrapped' must be set to true
  name?: string;

  // Absolute URI of the namespace definition.
  namespace?: string;
  prefix?: string;
  attribute?: boolean; // converts property => attribute
  wrapped?: boolean;  // Adds a wrapping element to an array definition
}


//  https://swagger.io/specification/#schema-object
//  https://tools.ietf.org/html/draft-wright-json-schema-validation-00
export interface Schema {
  title?: string;
  multipleOf?: number; //  type: number|integer   Numbers can be restricted to a multiple of a given number, using the
  // multipleOf keyword

  maximum?: number; //  type: number|integer               x <= maximum
  exclusiveMaximum?: boolean; // type: number|integer      x <  exclusiveMaximum
  minimum?: number; // type: number|integer                x >= maximum
  exclusiveMinimum?: boolean; // type: number|integer      x >  exclusiveMaximum
  minLength?: number; // type: string
  maxLength?: number; // type: string
  pattern?: string; // type: string  https://www.ecma-international.org/ecma-262/5.1/#sec-15.10.1
  maxItems?: number; // type: array   Maximum length of array
  minItems?: number; // type: array   Min len of array
  uniqueItems?: boolean;   // type: array   Specify if all items in the array must be unique
  maxProperties?: number; // type: object
  minProperties?: number;
  required?: string[];  // type: object   All object properties are optional. You can specify the required
  // properties here

  enum?: string[];  //  An enumeration of string values to be used if options are from a limited set.

  // Modified to OpenAPI_Spec Spec
  type: "string" | "number" | "integer" | "boolean" | "array" | "object"; // Type of value. (Null can be set for
  // any if 'nullable' is true

  discriminator?: Record<string, string | Record<string, unknown>>; // key to determine the field that holds the
  // Type Name
  /*
   discriminator:
   propertyName: objectType
   mapping:
   obj1: '#/components/schemas/Object1'
   obj2: '#/components/schemas/Object2'
   system: 'sysObject.json#/sysObject'
   */

  oneOf?: (Schema | Reference)[]; // validates the value against exactly one of the subschemas
  anyOf?: (Schema | Reference)[]; //  validates the value against any (one or more) of the subschemas
  not?: (Schema | Reference)[];
  allOf?: (Schema | Reference)[]; // validates the value against all the subschemas
  items?: (Schema | Reference)[];
  properties?: Map<string, Schema | Reference>;
  additionalProperties?: boolean | Schema | Reference;
  description?: string;

  //  Format of type
  format:
    | "int32" // type: integer
    | "int64" // type: integer
    | "float" // type: number
    | "double" // type: number
    | "byte" // type: string  (files)
    | "binary" // type: string  (files)
    | "date" // type: string
    | "date-time" // type: string
    | "password"// type: string
    | string;   // Format is technically open.
  default?: any; // Default value
  nullable?: boolean; // can the value be null
  readOnly?: boolean;  // Value sent in responses, NOT requests. Relevant only for Schema "properties" definitions.
  writeOnly?: boolean;  // Value sent in requests, NOT responses. Relevant only for Schema "properties" definitions.
  xml?: Xml;  // Adds additional metadata to describe the XML representation of this property.
  externalDocs?: ExternalDocumentation;
  example?: any;  // A free-form property to include an example of an instance for this schema.
  deprecated?: boolean; // Specifies that a schema is deprecated and SHOULD be transitioned out of usage.
}

export function valid_schema(schema: Schema): boolean {

  // All types must use
  const g_required_fields: Array<keyof Schema> = ["type"];

  const valid_string = (s: Schema) => {

    // Must Use
    const required_fields: Array<keyof Schema> = [];
    [...g_required_fields, ...required_fields].forEach(field_name => {
      if (s[field_name] === undefined) {
        return false;
      }
    });

    // Can't use
    const prohibited_fields: Array<keyof Schema> = [];
    [...prohibited_fields].forEach(field_name => {
      if (s[field_name] !== undefined) {
        return false;
      }
    });

    return true;
  };

  const valid_number = ({format}: Schema) => {
    if (format) {
      if (!/^("float"|"double")$/.test(format)) {
        console.warn(Error("Invalid number."));
        return false;
      }
    }

    return true;
  };

  const valid_integer = ({format}: Schema) => {
    if (format) {
      if (!/^("int32"|"int64")$/.test(format)) {
        console.warn(Error("Invalid integer."));
        return false;
      }
    }

    return true;
  };

  const valid_boolean = (s: Schema) => {
    return !!s; //TODO: Build this out
  };

  const valid_array = (s: Schema) => {
    return !!s; //TODO: Build this out
  };

  const valid_object = (s: Schema) => {
    return !!s; //TODO: Build this out
  };

  switch (schema.type) {
    case "string":
      return valid_string(schema);
    case "number":
      return valid_number(schema);
    case "integer":
      return valid_integer(schema);
    case "boolean":
      return valid_boolean(schema);
    case "array":
      return valid_array(schema);
    case "object":
      return valid_object(schema);
    default:
      console.warn(`Invalid schema.type: `, schema.type);
      return false;
  }
}


/**
 * Header
 * https://swagger.io/specification/#header-object
 */
export interface Header {

  //  A brief description of the parameter. This could contain samples of use.
  description: string;

  //  Determines whether this parameter is mandatory. If the parameter location is "path", this property is REQUIRED
  //  and its value MUST be true
  required: boolean;

  deprecated: boolean; //  Specifies that a parameter is deprecated and SHOULD be transitioned out
  // of usage.
  allowEmptyValue: boolean; //  Sets the ability to pass empty-valued parameters. This is valid only
  // for query parameters and allows sending a parameter with an empty value.

  //  The rules for serialization of the parameter are specified in one of two ways. For simpler scenarios, a schema
  // and style can describe the structure and syntax of the parameter.

  style:
    | "matrix"
    | "label"
    | "form"
    | "simple"
    | "spaceDelimited"
    | "pipeDelimited"
    | "deepObject"; //  Describes
  // how the
  // parameter
  // value will
  // be
  // serialized
  // depending
  // on the
  // type of
  // the
  // parameter
  // value.

  explode: boolean; //  When this is true, parameter values of type array or object generate
  // separate parameters for each value of the array or key-value pair of the
  // map.

  allowReserved: boolean; //  Determines whether the parameter value SHOULD allow reserved
  // characters, as defined by RFC3986 :/?#[]@!$&'()*+, = to be included
  // without percent-encoding.

  schema: Schema | Reference; //  The schema defining the type used for the parameter.

  example: any; //  Example of the parameter's potential value.

  examples: Map<string, Example | Reference>; //  Examples of the parameter's potential value.
  //  For more complex scenarios, the content property can define the media type and schema of the parameter. A
  // parameter MUST contain either a schema property, or a content property, but not both.

  content: Map<string, MediaType>; //  A map containing the representations for the parameter. The key is the
  // media type and the value describes it. The map MUST only contain one entry.
}


export interface Parameter extends Header {
  name: string; //  REQUIRED. The name of the parameter. Parameter names are case sensitive.

  in: "query" | "header" | "path" | "cookie"; //  REQUIRED. The location of the parameter. Possible values are
  // "query", "header", "path" or "cookie".
}

export function valid_parameter(parameter: Parameter): boolean {
  switch (parameter.in) {
    case "query":
      return !!parameter.style.match(
        /^("form"|"spaceDelimited"|"pipeDelimited"|"deepObject")$/
      );
    case "header":
      return parameter.style === "simple";
    case "path":
      return !!parameter.style.match(/^("matrix"|"label"|"simple")$/);
    case "cookie":
      return parameter.style === "form";
  }
}

//  https://swagger.io/specification/#example-object

export interface Example {
  summary: string; //  Short description for the example.
  description: string; //  Long description for the example.
  value: any; //  Embedded literal example. The value field and externalValue field are mutually
  // exclusive.
  externalValue: string; //  A URL that points to the literal example. This provides the capability to reference
  // samples that cannot easily be included in JSON or YAML documents.
}

export interface RequestBody {
  description: string; //  A brief description of the request body. This could contain samples of
  // use.
  content: Map<string, MediaType>; //  REQUIRED. The content of the request body. The key is a media type or
  // media type range and the value describes it. For requests that match
  // multiple keys, only the most specific key is applicable. e.g. text/plain
  // overrides text/*
  required: boolean; //  Determines if the request body is required in the request. Defaults to
  // false.
}

export interface OAuthFlow {
  authorizationUrl: string; // oauth2 ("implicit", "authorizationCode")                         REQUIRED. The
  // authorization URL to be used for this flow.
  tokenUrl: string; // oauth2 ("password", "clientCredentials", "authorizationCode")    REQUIRED. The token
  // URL to be used for this flow.
  refreshUrl: string; // oauth2           The URL to be used for obtaining refresh tokens.
  scopes: Map<string, string>; // oauth2           REQUIRED. The available scopes for the OAuth2 security scheme. A
  // map between the scope name and a short description for it. The map MAY be empty.
}

export interface OAuthFlows {
  implicit: OAuthFlow;
  password: OAuthFlow;
  clientCredentials: OAuthFlow;
  authorizationCode: OAuthFlow;
}

export interface SecurityScheme {
  type: "apiKey" | "http" | "oauth2" | "openIdConnect"; // Any      REQUIRED. The type of the security scheme.
  description: string; // Any      A short description for security scheme.
  name: string; // apiKey   REQUIRED. The name of the header, query or cookie
  // parameter to be used.
  in: string; // apiKey   REQUIRED. The location of the OpenAPI key. Valid values
  // are "query", "header" or "cookie".
  scheme: string; // http     REQUIRED. The name of the HTTP Authorization scheme
  // to be used in the Authorization header as defined in
  // RFC7235. The values used SHOULD be registered in the IANA
  // Authentication Scheme registry.
  bearerFormat: string; // http("bearer")   A hint to the client to identify how the bearer
  // token is formatted.
  flows: OAuthFlows; // oauth2   REQUIRED. An object containing configuration
  // information for the flow types supported.
  openIdConnectUrl: string; // openIdConnect    REQUIRED. OpenId Connect URL to discover OAuth2
  // configuration values. This MUST be in the form of a URL.
}

export function valid_SecurityScheme(scheme: SecurityScheme): boolean {
  switch (scheme.type) {
    case "apiKey":
      return !!(scheme.name && scheme.in);
    case "http":
      return !!scheme.scheme;
    case "oauth2":
      return !!scheme.flows;
    case "openIdConnect":
      return !!scheme.openIdConnectUrl;
    default:
      return false;
  }
}

//  https://swagger.io/specification/#link-object

export interface Link {
  operationRef: string;
  operationId: string;
  parameters: Map<string, PathItem>; //  The key that identifies the Path Item Object is a runtime expression
}


/**
 * Callback
 *
 * A map of possible out-of band callbacks related to the parent operation.
 * https://swagger.io/specification/#callback-object
 */
export type Callback = Map<string, PathItem | PathItem[]>;

export interface Components {
  schemas: Map<string, Schema | Reference>; //  An object to hold reusable Schema Objects.
  responses: Map<string, Response | Reference>; //  An object to hold reusable Response Objects.
  parameters: Map<string, Parameter | Reference>;
  examples: Map<string, Example | Reference>;
  requestBodies: Map<string, RequestBody | Reference>;
  headers: Map<string, Header | Reference>;
  securitySchemes: Map<string, SecurityScheme | Reference>;
  links: Map<string, Link | Reference>;
  callbacks: Map<string, Callback | Reference>;
}

//  https://swagger.io/specification/#operation-object

export interface Operation {
  tags: string[]; //  A list of tags for OpenAPI documentation control.
  summary: string; //  A short summary of what the operation does.
  description: string; //  A verbose explanation of the operation behavior.
  externalDocs: ExternalDocumentation; //  Additional external documentation for this operation.
  operationId: string; //  Unique string used to identify the operation.
  parameters: (Operation | Parameter)[]; //  A list of parameters that are applicable for this operation.
  requestBody: RequestBody | Reference; //  The request body applicable for this operation.
  responses: Map<string, Response>; //  REQUIRED. The list of possible responses as they are returned
  // from executing this operation.
  callback: Map<string, Callback | Reference>; //  A map of possible out-of band callbacks related to the parent
  // operation.
  deprecated: boolean; //  Declares this operation to be deprecated.
  security: Map<string, string[]>; //  A declaration of which security mechanisms can be used for this
  // operation. To make security optional, an empty security
  // requirement ({}) can be included in the array.
  servers: Server[]; //  An alternative server array to service this operation.
}

// https://swagger.io/specification/#path-item-object

export interface PathItem {
  $ref: string; //  Allows for an external definition of this path item. The referenced structure MUST be
  // in the format of a Path Item Object.

  summary: string; //  An optional, string summary, intended to apply to all operations in this path.
  description: string; //  An optional, string description, intended to apply to all operations in this path.
  get: Operation; //  A definition of a GET operation on this path.
  put: Operation; //  A definition of a PUT operation on this path.
  post: Operation;
  delete: Operation;
  options: Operation;
  head: Operation;
  patch: Operation;
  trace: Operation;
  servers: Server[]; //  An alternative server array to service all operations in this path.
  parameters: (Operation | Parameter)[]; //  A list of parameters that are applicable for all the operations
  // described under this path.
}

interface Contact {
  name?: string; //  The identifying name of the contact person/organization.
  url?: string; //  The URL pointing to the contact information. MUST be in the format of a URL.
  email?: string; //  The email address of the contact person/organization. MUST be in the format of an email
  // address.
}

interface License {
  name: string; //  REQUIRED. The license name used for the OpenAPI.
  url?: string; //  A URL to the license used for the OpenAPI. MUST be in the format of a URL.
}

interface Info {
  title: string; // 	REQUIRED. The title of the OpenAPI.
  description?: string; //  A short description of the OpenAPI.
  termsOfService?: string; //  A URL to the Terms of Service for the OpenAPI. MUST be in the format of a URL.
  contact?: Contact; //  The contact information for the exposed OpenAPI.
  license?: License; //  The license information for the exposed OpenAPI.
  version: string; //  REQUIRED. The version of the OpenAPI_Spec document.
}

export interface ServerVariable {
  enum?: string[]; //  An enumeration of string values to be used if the substitution options are from a
  // limited set. The array SHOULD NOT be empty.

  default: string; //  REQUIRED. The default value to use for substitution, which SHALL be sent if an
  // alternate value is not supplied.

  description?: string; //  An optional description for the server variable.
}

export interface Server {
  url: string; //  REQUIRED. A URL to the target host.
  destination?: string; //  An optional string describing the host designated by the URL.
  variables?: Map<string, ServerVariable>; //  A map between a variable name and its value.
}

export function valid_server(server: Server): boolean {
  if (!server.url) {
    return false;
  }

  return true;
}

// https://swagger.io/specification/
export default interface OpenAPI_Spec {
  openapi: string; // 	REQUIRED. This string MUST be the semantic version number of the
  // OpenAPI_Spec Specification version that the OpenAPI_Spec document uses.
  info: Info; //  REQUIRED. Provides metadata about the OpenAPI. The metadata MAY be used by
  // tooling as required.
  servers?: Server[]; //  An array of Server Objects, which provide connectivity information to a
  // target server.
  paths: Map<string, PathItem>; //  REQUIRED. The available paths and operations for the OpenAPI.
  components?: Components; //	An element to hold various schemas for the specification.
  security?: Map<string, string[]>; //  A declaration of which security mechanisms can be used across the OpenAPI.
  // Each name MUST correspond to a security scheme which is declared in the
  // Security Schemes under the Components Object.
  tags?: Tag[]; //  A list of tags used by the specification with additional metadata.
  externalDocs?: ExternalDocumentation; //  Additional external documentation.
}