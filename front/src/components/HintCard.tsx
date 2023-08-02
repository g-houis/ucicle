import React from 'react';
import useWording from '../i18n/useWording';
import { BestResult } from '../types/CyclingTypes';

type Props = {
  bestResult: BestResult
};

export default function HintCard({ bestResult }: Props) {
  const { wording } = useWording();

  const years = bestResult.years.reduce((acc, element, index) => {
    if (bestResult.years.length === 1) return <span className="highlight">{element}</span>;
    if (index === bestResult.years.length - 1) {
      return <>{acc} {wording.cards.hint.and} <span className="highlight">{element}</span></>;
    }
    return <>{acc}, <span className="highlight">{element}</span></>;
  }, <></>);

  return (
    <div className="hint-card">
      <div className="title">
        {wording.cards.hint.hintText}
      </div>
      <hr/>
      <div className="hint">
        {
          bestResult.recurrence > 1 && (
            <>
              <span className="highlight">{bestResult.recurrence}</span>
              {wording.cards.hint.reccurence}
            </>
          )
        }
        <span className="highlight">{wording.cards.hint.rank(bestResult.rank)}</span>
        {wording.cards.hint.of}
        {bestResult.raceType !== 'race'
            && <>
                <span className="highlight">{wording.cards.hint.raceType(bestResult.raceType)}</span>
                {wording.cards.hint.of}
            </>
        }
        <span className="highlight">{bestResult.race}</span>
        {wording.cards.hint.in}
        {years}
      </div>
    </div>
  );
}
