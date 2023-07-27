import React, { useState } from 'react';
import {
  Alert, Button, Icon, Snackbar,
} from '@mui/material';
import { GameParticipation } from '../types/GameType';
import useWording from '../i18n/useWording';
import { share } from '../services/gameService';

type Props = {
  gameParticipation: GameParticipation
};

export default function ResultCard({ gameParticipation }: Props) {
  const { wording } = useWording();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="result-card">
      <div className="result">
        {
          gameParticipation.success
            ? (
              <>
                <div>{wording.cards.result.success.title}</div>
                <div>
                  {wording.cards.result.success.guessRider}
                  <span className="highlight">{gameParticipation.rider.name}</span>
                </div>
                <div>
                  {wording.cards.result.success.guessCount.start}
                  <span className="highlight">{gameParticipation.guesses.length}</span>
                  {wording.cards.result.success.guessCount.end(gameParticipation.guesses.length)}
                </div>
              </>)
            : (<>
              <div>{wording.cards.result.failure.title}</div>
              <div>
                {wording.cards.result.failure.guessRider}
                <span className="highlight">{gameParticipation.rider.name}</span>
              </div>
            </>)
        }
      </div>
      <Button className="share" onClick={() => {
        share(gameParticipation);
        setOpen(true);
      }}>
        {wording.cards.result.share}
        <Icon>copy</Icon>
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} sx={{ width: '100%' }}>
          {wording.snacks.copied}
        </Alert>
      </Snackbar>
    </div>
  );
}
