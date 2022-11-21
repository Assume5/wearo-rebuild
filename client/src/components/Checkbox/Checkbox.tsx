import React, { useState } from 'react';

interface Props {
  name: string;
  root: string;
  onChange?: (name: string, root: string, status: boolean) => void;
  cb?: (status: boolean) => void;
  status?: boolean;
}

export const Checkbox = ({ name, root, onChange, cb, status = false }: Props) => {
  const [check, setCheck] = useState(status);

  const onClick = () => {
    setCheck(!check);
    onChange && onChange(name === 'One Size' ? 'onesize' : name, root, !check);
    cb && cb(!check);
  };

  return (
    <div className="custom-checkbox">
      <label
        onClick={() => {
          onClick();
        }}
        className={check ? 'active' : ''}
      >
        <span className="checkmark"></span>
        {name}
      </label>
    </div>
  );
};
