export type Rank = {
    rank: string,
    riderLink: string,
    team: string,
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
    height: number,
    bestResult: BestResult,
    team: string
}


/**
 * @param race Race's title
 * @param position Ranking of the rider for teh race
 * @param raceType Define the type of the race
 * @param recurrence Defines the number of times the rider has obtained this result
 */
export type BestResult = {
    race: string,
    rank: number,
    raceType: RaceType,
    recurrence: number,
    years: number[]
}

export type RaceType = 'GC' | 'Point GC' | 'KOM' | 'stage' | 'race';
