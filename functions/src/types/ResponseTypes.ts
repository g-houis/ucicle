/**
 * @property body The human readable body return by the function
 * @property body The http status code corresponding to the response
 */
export type HandlerResponse = {
    body: string,
    statusCode: number
}
