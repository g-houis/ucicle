import { RaceType } from '../types/CyclingTypes';

export type Translation = {
  app: {
    name: string,
    description: string,
  },
  entities: {
    rider: {
      name: string,
      age: string,
      weight: string,
      height: string,
      country: string,
      team: string,
    },
  },
  snacks: {
    copied: string,
  },
  cards: {
    riderSelect: {
      count: (guesses: number, maxGuess: number) => string,
    },
    hint: {
      hintText: string,
      reccurence: string,
      rank: (rank: number) => string,
      raceType: (raceType: RaceType) => string,
      of: string,
      in: string,
      and: string,
    },
    result: {
      share: string
      success: {
        title: string,
        guessRider: string,
        guessCount: {
          start: string,
          end: (tries: number) => string,
        },
      },
      failure: {
        title: string,
        guessRider: string,
      }
    },
  },
  modals: {
    stats: {
      title: string,
      gamesPlayed: (games: number) => string,
      gamesSucceed: (success: number) => string,
      successRate: string,
      statsSection: {
        title: string,
      },
      historicSection: {
        title: string,
        rider: string,
        guess: string,
        result: string,
      },
    },
    info: {
      title: string,
      purpose: {
        title: string,
        description: string
      },
      hint: {
        title: string,
        description: string,
        indications: string[]
      }
    }
  }
};
