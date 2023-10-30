// Function that takes a status code, and error message and returns an error object with the two values
exports.handleError = (status, message) => {
    const error = new Error();
    error.status = status;
    error.message = message;
    return error
}