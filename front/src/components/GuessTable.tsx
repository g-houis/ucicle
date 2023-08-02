import React from 'react';
import { Rider } from '../types/CyclingTypes';
import GuessCard from './GuessCard';
import useWording from '../i18n/useWording';

type Props = {
  guesses: Rider[],
  reference: Rider
};

export default function GuessTable({ guesses, reference }: Props) {
  const { wording } = useWording();
  return (
    <table className="guess-table">
      <thead>
      <tr>
        <th>{wording.entities.rider.name}</th>
        <th>{wording.entities.rider.age}</th>
        <th>{wording.entities.rider.height}</th>
        <th>{wording.entities.rider.weight}</th>
        <th>{wording.entities.rider.country}</th>
        <th>{wording.entities.rider.team}</th>
      </tr>
      </thead>
      <tbody>
      {guesses.map((guess: Rider) => (
        <GuessCard key={guess.name} guess={guess} reference={reference} />
      ))}
      </tbody>
    </table>
  );
}
