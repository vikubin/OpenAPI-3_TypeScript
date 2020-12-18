import API from "../API"
import * as path from "path"
import * as fs from "fs"
import OpenAPI from "../interfaces/OpenAPI";

const spec_example_shouldPass_folder : string = path.resolve(__dirname, './samples/shouldPass');
const shouldPass_fileNames :string[] = fs.readdirSync(spec_example_shouldPass_folder)
    .filter(file => file.endsWith(".json"));
console.log(shouldPass_fileNames);
shouldPass_fileNames.forEach(file => {

    const file_json = require(`${spec_example_shouldPass_folder}/${file}`);

    test(`Testing Passing Sample: ${file}`,() => {
        const new_API = new API(file_json);


        expect(new_API.validate()).toBe(true);
    });
});


const spec_example_shouldFail_folder : string = path.resolve(__dirname, './samples/shouldFail');
const shouldFail_fileNames :string[] = fs.readdirSync(spec_example_shouldFail_folder)
    .filter(file => file.endsWith(".json"));
console.log(shouldFail_fileNames);
shouldFail_fileNames.forEach(file => {

    const file_json = require(`${spec_example_shouldFail_folder}/${file}`);

    test(`Testing Failing Sample: ${file}`,() => {

        const new_API = new API(file_json);
        expect(()=>{ new API(file_json) }).toThrow()
    });
});


// test('OpenAPI First Test', () => {
//     const new_OpenAPI = new OpenAPI();
//     console.log(new_OpenAPI);
//
//     expect(new_OpenAPI).toBe(0);
// });