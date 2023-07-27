import React, { Dispatch } from 'react';
import ContentModal from '../theme/ContentModal';
import useWording from '../../i18n/useWording';

type Props = {
  open: boolean;
  setOpen: Dispatch<boolean>
};

export default function InfoModal({ open, setOpen }: Props) {
  const { wording } = useWording();

  return (
    <ContentModal open={open} setOpen={setOpen} title={wording.modals.info.title} className="info-modal">
      <>
        <div className="modal-section">
          <h3 className="modal-section-title">{wording.modals.info.purpose.title}</h3>
          <div className="modal-section-description">
            {wording.modals.info.purpose.description}
          </div>
        </div>
        <div className="modal-section">
          <h3 className="modal-section-title">{wording.modals.info.hint.title}</h3>
          <div className="modal-section-description">
            <div>{wording.modals.info.hint.description}</div>
            <ul>
              {wording.modals.info.hint.indications.map((indication) => (<li key={indication}>{indication}</li>))}
            </ul>
          </div>
        </div>
      </>
    </ContentModal>
  );
}
