import { Translation } from './Translation';
import { RaceType } from '../types/CyclingTypes';

const fr: Translation = {
  app: {
    name: 'Ucicle',
    description: 'Le jeu du coureur mystère',
  },
  entities: {
    rider: {
      name: 'Nom',
      age: 'Age',
      weight: 'Poids',
      height: 'Taille',
      country: 'Pays',
      team: 'Equipe',
    },
  },
  snacks: {
    copied: 'Copié !',
  },
  cards: {
    riderSelect: {
      count: (guesses: number, maxGuess: number) => `Tentative ${guesses + 1} sur ${maxGuess} ...`,
    },
    hint: {
      hintText: 'Indice sur le coureur à deviner',
      reccurence: ' fois ',
      rank: (rank: number) => {
        switch (rank) {
          case 1: return '1er';
          case 2: return '2dn';
          default: return `${rank}ème`;
        }
      },
      raceType: (raceType: RaceType) => {
        switch (raceType) {
          case 'GC': return 'classement général';
          case 'race': return '';
          case 'KOM': return 'classement de la montagne';
          case 'stage': return 'classement d\'une étape';
          case 'Point GC': return 'classement du sprint';
          default: return '';
        }
      },
      of: ' du ',
      in: ' en ',
      and: ' et ',
    },
    result: {
      share: 'Partager',
      success: {
        title: '🎉 Bravo 🎉',
        guessRider: 'Tu as deviné ',
        guessCount: {
          start: 'en ',
          end: (tries: number) => (tries > 1 ? ' essais' : ' essai'),
        },
      },
      failure: {
        title: 'Perdu',
        guessRider: 'Tu n\'as pas trouvé ',
      },
    },
  },
  modals: {
    stats: {
      title: 'Statistiques',
      gamesPlayed: (games: number) => (games > 1 ? 'Parties jouées' : 'Partie jouée'),
      gamesSucceed: (games: number) => (games > 1 ? 'Parties gagnées' : 'Partie gagnée'),
      successRate: 'Taux de victoire',
      statsSection: {
        title: 'Statistiques de jeu',
      },
      historicSection: {
        title: 'Historique de jeu',
        rider: 'Coureur',
        guess: 'Tentatives',
        result: 'Résultat',
      },
    },
    info: {
      title: 'Informations',
      purpose: {
        title: 'But du jeu',
        description: 'Le but est de trouver le coureur secret du jour. 5 essais sont disponibles. '
          + 'Tous les coureurs UCI sont disponibles.',
      },
      hint: {
        title: 'Indices',
        description: 'Afin de deviner le coureur, tu dispose d\'un de ses résultats.'
          + 'Pour chaque essai, tu auras des indications par rapport au coureur secret',
        indications: [
          'Un champ vert indique que le coureur secret partage cette propriétée ',
          'Un champ rouge indique que la valeure ne correspond pas à celle du coureur secret',
        ],
      },
    },
  },
};

export default fr;
