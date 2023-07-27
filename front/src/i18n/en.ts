import { Translation } from './Translation';
import { RaceType } from '../types/CyclingTypes';

const en: Translation = {
  app: {
    name: 'Ucicle',
    description: 'The mistery rider game',
  },
  entities: {
    rider: {
      name: 'Name',
      age: 'Age',
      weight: 'Weight',
      height: 'Height',
      country: 'Country',
      team: 'Team',
    },
  },
  snacks: {
    copied: 'Copied !',
  },
  cards: {
    riderSelect: {
      count: (guesses: number, maxGuess: number) => `Guess ${guesses + 1} of ${maxGuess} ...`,
    },
    hint: {
      hintText: 'Rider\'s hint',
      reccurence: ' times ',
      rank: (rank: number) => {
        const stringRank = rank?.toString() ?? '';
        switch (stringRank[stringRank.length]) {
          case '1': return '1st';
          case '2': return '2dn';
          case '3': return '2rd';
          default: return `${rank}th`;
        }
      },
      raceType: (raceType: RaceType) => {
        switch (raceType) {
          case 'GC': return 'General classification';
          case 'race': return '';
          case 'KOM': return 'Mountain classification';
          case 'stage': return 'Stage classification';
          case 'Point GC': return 'Sprint classification';
          default: return '';
        }
      },
      of: ' of the ',
      in: ' in ',
      and: ' and ',
    },
    result: {
      share: 'Share',
      success: {
        title: '🎉 You won 🎉',
        guessRider: 'You guessed ',
        guessCount: {
          start: 'in ',
          end: (tries: number) => (tries > 1 ? ' tries' : ' try'),
        },
      },
      failure: {
        title: 'Game over',
        guessRider: 'You failed to guess ',
      },
    },
  },
  modals: {
    stats: {
      title: 'Statistics',
      gamesPlayed: (games: number) => (games > 1 ? 'Games played' : 'Game played'),
      gamesSucceed: (games: number) => (games > 1 ? 'Games succeed' : 'Game succeed'),
      successRate: 'Success rate',
      statsSection: {
        title: 'Game stats',
      },
      historicSection: {
        title: 'Game history',
        rider: 'Rider',
        guess: 'Guesses',
        result: 'Result',
      },
    },
    info: {
      title: 'Informations',
      purpose: {
        title: 'Purpose of the game',
        description: 'You have to guess a secret UCI rider. Five guesses are allowed, try any current UCI riders !',
      },
      hint: {
        title: 'Indices',
        description: 'In order to guess the secret runner, you have one of his results at your disposal.'
          + ' For each guess, you get indications regarding your try.',
        indications: [
          'Green field indicates the value is correct for the secret rider !',
          'Red field indicates you\'re wrong !',
        ],
      },
    },
  },
};

export default en;
