import React, { Dispatch } from 'react';
import { Icon } from '@mui/material';
import ContentModal from '../theme/ContentModal';
import useWording from '../../i18n/useWording';
import { GameParticipation } from '../../types/GameType';

type Props = {
  open: boolean;
  setOpen: Dispatch<boolean>;
  gameHistory: GameParticipation[];
};

export default function StatModal({ open, setOpen, gameHistory }: Props) {
  const { wording } = useWording();

  const games = gameHistory.length;
  const success = gameHistory.filter((gameSession) => gameSession.success).length;
  const rate = games ? ((success * 100) / games) : null;

  return (
    <ContentModal open={open} setOpen={setOpen} title={wording.modals.stats.title} className="stats-modal">
      <>
        <div className="modal-section ">
          <h3 className="modal-section-title">{wording.modals.stats.statsSection.title}</h3>
          <div className="modal-section-description stats-section">
            <div className="stat-card">
              <div className="count">{games ?? 0}</div>
              <hr />
              <div className="label">{wording.modals.stats.gamesPlayed(games)}</div>
            </div>
            <div className="stat-card">
              <div className="count">{success ?? 0}</div>
              <hr />
              <div className="label">{wording.modals.stats.gamesSucceed(success)}</div>
            </div>
            <div className="stat-card">
              <div className="count">{rate ? `${rate.toFixed(0)}%` : '?'}</div>
              <hr />
              <div className="label">{wording.modals.stats.successRate}</div>
            </div>
          </div>
        </div>
        <div className="modal-section">
          <h3 className="modal-section-title">{wording.modals.stats.historicSection.title}</h3>
          <div className="modal-section-description">
            <table className="history">
              <thead>
              <tr>
                <th>{wording.modals.stats.historicSection.rider}</th>
                <th>{wording.modals.stats.historicSection.guess}</th>
                <th>{wording.modals.stats.historicSection.result}</th>
              </tr>
              </thead>
              <tbody>
                {gameHistory.map((gameSession) => (
                  <tr key={gameSession.date} className="history-card">
                    <td>{gameSession.rider.name}</td>
                    <td>{gameSession.guesses.length}</td>
                    <td className={gameSession.success ? 'success' : 'error'}>
                      {gameSession.success ? <Icon>done</Icon> : <Icon>close</Icon>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </ContentModal>
  );
}
