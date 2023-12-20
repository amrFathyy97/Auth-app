import Ajv, {JSONSchemaType} from "ajv";
import { IUser } from "../types";

const ajv = new Ajv();




const schema: JSONSchemaType<IUser> = {
    type: "object",
    properties: {
        username: {type: "string"},
        email: {type: "string"},
        password: {type: "string", minLength: 5},
        isAdmin: {type: "boolean", default: false, nullable: true}
    },
    required: ["username", "email", "password"]
    
}

const validate = ajv.compile(schema);

export default validate