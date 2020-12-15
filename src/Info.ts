interface Contact {
    name?: string    //  The identifying name of the contact person/organization.
    url?: string     //  The URL pointing to the contact information. MUST be in the format of a URL.
    email?: string   //  The email address of the contact person/organization. MUST be in the format of an email address.
}

interface License {
    name: string    //  REQUIRED. The license name used for the API.
    url?: string    //  A URL to the license used for the API. MUST be in the format of a URL.
}

interface Info {
    title: string               // 	REQUIRED. The title of the API.
    description?: string        //  A short description of the API.
    termsOfService?: string     //  A URL to the Terms of Service for the API. MUST be in the format of a URL.
    contact?: Contact           //  The contact information for the exposed API.
    license?: License           //  The license information for the exposed API.
    version: string             //  REQUIRED. The version of the OpenAPI document.
}
export default Info 