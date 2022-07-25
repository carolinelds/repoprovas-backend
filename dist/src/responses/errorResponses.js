export function notFound(entity) {
    throw {
        type: "error_not_found",
        message: `${entity} not found.`
    };
}
export function conflict(entity) {
    throw {
        type: "error_conflict",
        message: `${entity} already registered.`
    };
}
export function badRequest(entity) {
    throw {
        type: "error_bad_request",
        message: `${entity} is not valid, bad request.`
    };
}
export function unprocessableEntity(entity) {
    throw {
        type: "error_unprocessable_entity",
        message: `Something is wrong with ${entity}.`
    };
}
export function unauthorized(entity) {
    throw {
        type: "error_unauthorized",
        message: `${entity} unauthorized.`
    };
}
const errorResponses = {
    notFound,
    conflict,
    badRequest,
    unprocessableEntity,
    unauthorized
};
export default errorResponses;
