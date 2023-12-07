export class CustomError extends Error {
    constructor(public message: string, public statusCode: number, public status: string ){
        super(message);
    }
}