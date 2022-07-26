export function errorHandlerMiddleware(error, req, res, next) {
    if (error.type === "error_not_found")
        return res.status(404).send(error.message);
    if (error.type === "error_conflict")
        return res.status(409).send(error.message);
    if (error.type === "error_bad_request")
        return res.status(400).send(error.message);
    if (error.type === "error_unprocessable_entity")
        return res.status(422).send(error.message);
    if (error.type === "error_unauthorized")
        return res.status(401).send(error.message);
    return res.sendStatus(500);
}
