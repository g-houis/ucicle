import React from 'react';
import { Icon } from '@mui/material';
import { Rider } from '../types/CyclingTypes';
import { compareNumbers, ComparisionResult } from '../utils/numberUtils';

type Props = {
  guess: Rider,
  reference: Rider,
};

export default function GuessCard({ guess, reference }: Props) {
  const ageComparision = compareNumbers(guess.age, reference.age);
  const heightComparision = compareNumbers(guess.height, reference.height);
  const weightComparision = compareNumbers(guess.weight, reference.weight);
  const countryEquals = guess.country === reference.country;
  const teamEquals = guess.team === reference.team;

  const getComparisionClassName = (equality: boolean) => {
    if (equality) return 'equals';
    return 'not-equals';
  };

  const getIcon = (comparision: ComparisionResult) => {
    switch (comparision) {
      case 'equals':
        return <span className="equals" style={{ marginLeft: '8px' }}>=</span>;
      case 'higher':
        return <Icon className="higher">arrow_downward</Icon>;
      case 'lower':
        return <Icon className="lower">arrow_upward</Icon>;
      default:
        return null;
    }
  };

  return (
    <tr className="guess-card">
      <td>
        <div><span className="highlight">{guess.name}</span></div>
      </td>
      <td>
        <div><span>{guess.age}</span>{getIcon(ageComparision)}</div>
      </td>
      <td>
        <div><span>{guess.height}</span>{getIcon(heightComparision)}</div>
      </td>
      <td>
        <div><span>{guess.weight}</span>{getIcon(weightComparision)}</div>
      </td>
      <td className={getComparisionClassName(countryEquals)}>
        <div><span style={{ textTransform: 'capitalize' }}>{guess.country}</span></div>
      </td>
      <td className={getComparisionClassName(teamEquals)}>
        <div><span>{guess.team}</span></div>
      </td>
    </tr>
  );
}
