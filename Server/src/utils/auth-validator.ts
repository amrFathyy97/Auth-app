import Ajv, {JSONSchemaType} from "ajv";

const ajv = new Ajv();

interface IUser {
    email: string;
    password: string;
}


const schema: JSONSchemaType<IUser> = {
    type: "object",
    properties: {
        email: {type: "string"},
        password: {type: "string", minLength: 5}
    },
    required: ["email", "password"]
    
}

const validate = ajv.compile(schema);

export default validate