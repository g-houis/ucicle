import { Rider } from './CyclingTypes';

export type GameParticipation = {
  rider: Rider,
  date: string, // YYYYMMDD
  guesses: Rider[],
  success: boolean
};

export type GameSession = {
  date: string, // YYYYMMDD
  rider: Rider,
};
