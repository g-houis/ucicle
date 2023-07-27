import React, { Dispatch, ReactNode } from 'react';
import { Icon, IconButton, Modal } from '@mui/material';

type Props = {
  open: boolean;
  setOpen: Dispatch<boolean>;
  title: string;
  children: ReactNode | string;
  className?: string;
};

export default function ContentModal({
  open, setOpen, children, title, className,
}: Props) {
  return (
    <Modal
      disableEnforceFocus
      open={open}
      onClose={() => setOpen(false)}
    >
      <div className={`modal ${className}`}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <IconButton onClick={() => setOpen(false)}>
            <Icon>
              close
            </Icon>
          </IconButton>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </Modal>
  );
}
