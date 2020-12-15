//  https://swagger.io/specification/#tag-object
import ExternalDocumentation from "./ExternalDocumentation";

interface Tag {
    name: string                         //  REQUIRED. The name of the tag.
    description?: string                 //  A short description for the tag.
    externalDocs?: ExternalDocumentation //  Additional external documentation for this tag.
}
export default Tag