export type Rank = {
    rank: string,
    riderLink: string
}

/**
 * @param rank The UCI rank of the rider
 * @param name The name of the rider
 * @param country The country of the rider
 * @param age The age of the rider
 * @param weight Rider's weight (in kg)
 * @param height Rider's height (in meter)
 */
export type Rider = {
    rank: number,
    name: string,
    country: string,
    age: number,
    weight: number,
    height: number
}
