import Ajv, {JSONSchemaType} from "ajv";
import { Login } from "../types";

const ajv = new Ajv();



const schema: JSONSchemaType<Login> = {
    type: "object",
    properties: {
        email: {type: "string"},
        password: {type: "string", minLength: 5}
    },
    required: ["email", "password"]
    
}

const validate = ajv.compile(schema);

export default validate