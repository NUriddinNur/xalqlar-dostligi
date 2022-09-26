class ApiError extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        console.log(message)
        if(message.name.includes('Sequelize')){
            message = message.name
        }
        return new ApiError(404, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }

    static validationError(message) {
        return new ApiError(400, message)
    }
}

export default ApiError