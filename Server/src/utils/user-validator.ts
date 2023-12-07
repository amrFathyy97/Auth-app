import Ajv, {JSONSchemaType} from "ajv";

const ajv = new Ajv();

export interface IUser {
    username: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}


const schema: JSONSchemaType<IUser> = {
    type: "object",
    properties: {
        username: {type: "string"},
        email: {type: "string"},
        password: {type: "string", minLength: 5},
        isAdmin: {type: "boolean", default: false}
    },
    required: ["username", "email", "password"]
    
}

const validate = ajv.compile(schema);

export default validate