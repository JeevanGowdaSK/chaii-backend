// we have defined a file , that solves , the kind of API errors possible

class ApiError extends Error{
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        statck =""
    ){

        // over riding inside he constructor
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        thiis.success = false;
        this.errors = errors

        if(statck){
            this.stack = statck
        }else
        {
            Error.captureStackTrace(this , this.constructor)
        }

    }

    
}

export {ApiError}
