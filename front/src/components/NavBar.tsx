import React, { useContext, useState } from 'react';
import {
  Icon, IconButton, Menu, MenuItem,
} from '@mui/material';
import useWording from '../i18n/useWording';
import InfoModal from './modals/InfoModal';
import StatModal from './modals/StatModal';
import { GameParticipation } from '../types/GameType';
import {
  I18nContext, Language, languageReferentials, LanguageReferential,
} from '../i18n/I18nProvider';

type Props = {
  gameHistory: GameParticipation[]
};

export default function NavBar({ gameHistory }: Props) {
  const { wording } = useWording();

  const i18n = useContext(I18nContext);
  const selectedLanguageReferential: LanguageReferential = languageReferentials
    .filter((languageReferential) => languageReferential.language === i18n.language)?.[0];

  const [openStats, setOpenStats] = useState<boolean>(false);
  const [openInfo, setOpenInfo] = useState<boolean>(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectLanguage = (language: Language) => {
    i18n.setLanguage(language);
    handleClose();
  };

  return (
    <header>
      <div className="content">
        <StatModal open={openStats} setOpen={setOpenStats} gameHistory={gameHistory}/>
        <InfoModal open={openInfo} setOpen={setOpenInfo} />
        <div className="title">
          <h1>{wording.app.name}</h1>
          <h2>{wording.app.description}</h2>
        </div>
        <IconButton onClick={() => setOpenInfo(true)}>
          <Icon>help_outlined</Icon>
        </IconButton>
        <IconButton onClick={() => setOpenStats(true)}>
          <Icon>bar_chart</Icon>
        </IconButton>
        <div>
          <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <span className="flag">{selectedLanguageReferential.tag}</span>
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {languageReferentials.map((languageReferential) => (
              <MenuItem
                onClick={() => handleSelectLanguage(languageReferential.language)}
                key={languageReferential.language}
              >
                {languageReferential.label}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
    </header>
  );
}
