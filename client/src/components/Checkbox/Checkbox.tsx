import React, { useState } from 'react';

interface Props {
  name: string;
  root: string;
  onChange: (name: string, root: string, status: boolean) => void;
}

export const Checkbox = ({ name, root, onChange }: Props) => {
  const [check, setCheck] = useState(false);

  const onClick = () => {
    setCheck(!check);
    onChange(name === 'One Size' ? 'onesize' : name, root, !check);
  };

  return (
    <>
      <label
        onClick={() => {
          onClick();
        }}
        className={check ? 'active' : ''}
      >
        <span className="checkmark"></span>
        {name}
      </label>
    </>
  );
};
