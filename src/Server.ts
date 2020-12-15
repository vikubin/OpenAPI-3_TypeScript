//  https://swagger.io/specification/#server-object

interface ServerVariable {
    enum?: string[];        //  An enumeration of string values to be used if the substitution options are from a limited set. The array SHOULD NOT be empty.
    default: string;        //  REQUIRED. The default value to use for substitution, which SHALL be sent if an alternate value is not supplied.
    description?: string;   //  An optional description for the server variable.
}

interface Server {
    url: string;            //  REQUIRED. A URL to the target host.
    destination?: string;   //  An optional string describing the host designated by the URL.
    variables?: Map<string, ServerVariable>;      //  A map between a variable name and its value.
}

export default Server;