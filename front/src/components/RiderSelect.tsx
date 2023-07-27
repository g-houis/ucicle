import React, { SyntheticEvent, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Rider } from '../types/CyclingTypes';
import useWording from '../i18n/useWording';

type SelectOption = {
  label: string,
  rider: Rider
};

type Props = {
  addGuess: (guess: Rider) => void;
  riders: Rider[];
  guesses: number;
};

export default function RiderSelect({
  addGuess, riders, guesses,
}: Props) {
  const [selectValue, setSelectValue] = useState<SelectOption | null>(null);
  const [selectInput, setSelectInput] = useState<string>('');
  const options: SelectOption[] = riders
    .map((rider) => ({
      label: rider.name,
      rider,
    } as SelectOption));

  const { wording } = useWording();

  const handleChangeValue = (e: SyntheticEvent, v: SelectOption | string | null) => {
    if (v && typeof v !== 'string') {
      setSelectValue(null);
      setSelectInput('');
      addGuess(v.rider);
    }
  };

  const handleChangeInputValue = (e: SyntheticEvent, v: string | null) => {
    if (v) setSelectInput(v);
    else setSelectInput('');
  };

  return (
    <Autocomplete
      blurOnSelect
      options={options}
      freeSolo
      onChange={handleChangeValue}
      onInputChange={handleChangeInputValue}
      value={selectValue}
      inputValue={selectInput}
      renderInput={(params) => <TextField {...params} label={wording.cards.riderSelect.count(guesses, 5)} />}
      renderOption={(props, option) => (
        <li {...props}>
          {option.label}
        </li>
      )}
    />
  );
}
