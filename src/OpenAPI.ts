import OpenAPI_Spec, {
  ParameterInterface,
  SchemaInterface,
  SecuritySchemeInterface,
} from './interfaces/OpenAPI_Spec';

// TODO: Validation and methods in this file

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

export function valid_schema(schema: SchemaInterface): boolean {
  // All types must use
  const g_required_fields: Array<keyof SchemaInterface> = ['type'];

  const valid_string = (s: SchemaInterface) => {
    // Must Use
    const required_fields: Array<keyof SchemaInterface> = [];
    [...g_required_fields, ...required_fields].forEach(field_name => {
      if (s[field_name] === undefined) {
        return false;
      }

      // TODO
    });

    // Can't use
    const prohibited_fields: Array<keyof SchemaInterface> = [];
    [...prohibited_fields].forEach(field_name => {
      if (s[field_name] !== undefined) {
        return false;
      }

      // TODO
    });

    return true;
  };

  const valid_number = ({format}: SchemaInterface) => {
    if (format) {
      if (!/^("float"|"double")$/.test(format)) {
        console.warn(Error('Invalid number.'));
        return false;
      }
    }

    return true;
  };

  const valid_integer = ({format}: SchemaInterface) => {
    if (format) {
      if (!/^("int32"|"int64")$/.test(format)) {
        console.warn(Error('Invalid integer.'));
        return false;
      }
    }

    return true;
  };

  const valid_boolean = (s: SchemaInterface) => {
    return !!s; //TODO: Build this out
  };

  const valid_array = (s: SchemaInterface) => {
    return !!s; //TODO: Build this out
  };

  const valid_object = (s: SchemaInterface) => {
    return !!s; //TODO: Build this out
  };

  switch (schema.type) {
    case 'string':
      return valid_string(schema);
    case 'number':
      return valid_number(schema);
    case 'integer':
      return valid_integer(schema);
    case 'boolean':
      return valid_boolean(schema);
    case 'array':
      return valid_array(schema);
    case 'object':
      return valid_object(schema);
    default:
      console.warn('Invalid schema.type: ', schema.type);
      return false;
  }
}

export function valid_parameter(parameter: ParameterInterface): boolean {
  switch (parameter.in) {
    case 'query':
      if (parameter.style) {
        return /^("form"|"spaceDelimited"|"pipeDelimited"|"deepObject")$/.test(
          parameter.style
        );
      } else {
        return true;
      }
    case 'header':
      return parameter.style === 'simple';
    case 'path':
      if (parameter.style) {
        return /^("matrix"|"label"|"simple")$/.test(parameter.style);
      } else {
        return true;
      }
    case 'cookie':
      return parameter.style === 'form';
  }
}

export function valid_SecurityScheme(scheme: SecuritySchemeInterface): boolean {
  switch (scheme.type) {
    case 'apiKey':
      return !!(scheme.name && scheme.in);
    case 'http':
      return !!scheme.scheme;
    case 'oauth2':
      return !!scheme.flows;
    case 'openIdConnect':
      return !!scheme.openIdConnectUrl;
    default:
      return false;
  }
}
