import { faCircleNotch, faLock, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { IAddress, IPayment, IStep } from '../../types/checkout';

interface Props {
  step: IStep;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  cb: () => {};
}

export const Overview = ({ step, cb, error, setError }: Props) => {
  const [loading, setLoading] = useState(false);

  const onCheckoutClick = () => {
    setError('');
    setLoading(true);
    cb();
  };

  return (
    <div className="check-out-form overview">
      <div className="checkout-form-header">
        <h4>Summary {step.stepProceed !== 4 && <FontAwesomeIcon icon={faLock} />}</h4>
      </div>

      {step.stepProceed === 4 && (
        <>
          <p>Review Your Information Before Checkout</p>
          {error && <p className="error-message">{error}</p>}
          <button onClick={onCheckoutClick} disabled={loading}>
            Checkout {loading && <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />}
          </button>
        </>
      )}
    </div>
  );
};
