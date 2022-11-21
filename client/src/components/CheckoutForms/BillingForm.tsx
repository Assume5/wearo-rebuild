import { faLock, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { IAddress, IStep } from '../../types/checkout';
import { Checkbox } from '../Checkbox/Checkbox';
import { AddressForm } from './AddressForm';
interface Props {
  address: IAddress | null;
  setAddress: React.Dispatch<React.SetStateAction<IAddress | null>>;
  step: IStep;
  setStep: React.Dispatch<React.SetStateAction<IStep>>;
  shipping: IAddress | null;
}

export const BillingForm = ({ address, setAddress, step, setStep, shipping }: Props) => {
  const [status, setStatus] = useState(false);
  const onEditClick = () => {
    setStep({
      currentStep: 2,
      stepProceed: step.stepProceed,
      stepOne: { editing: false },
      stepTwo: { editing: true },
      stepThree: { editing: false },
    });
  };

  const check = (check: boolean) => {
    setStatus(!status);
    if (!status) {
      setAddress(shipping);
    } else {
      setAddress({
        address1: '',
        city: '',
        first: '',
        last: '',
        state: '',
        zip: '',
        address2: '',
      });
    }
  };

  useEffect(() => {
    if (status) {
      setAddress(shipping);
    }
  }, [status, step]);

  return (
    <div className="check-out-form">
      <div className="checkout-form-header">
        <h4>
          Billing Address{' '}
          {step.stepProceed <= 1 ? (
            <FontAwesomeIcon icon={faLock} />
          ) : (
            !step.stepTwo.editing && <FontAwesomeIcon onClick={onEditClick} icon={faPen} className={'clickable'} />
          )}
        </h4>
      </div>

      {step.stepProceed > 1 && step.stepTwo.editing && (
        <>
          <Checkbox name="Same as Shipping?" cb={check} root="" status={status} />

          <AddressForm
            address={address}
            setAddress={setAddress}
            step={step}
            setStep={setStep}
            formKey={'billing-form'}
            key={'form-billing'}
          />
        </>
      )}

      {step.stepProceed > 2 && !step.stepTwo.editing && address && (
        <>
          <p>
            First Name : <strong>{address.first}</strong>
          </p>
          <p>
            Last Name : <strong>{address.last}</strong>
          </p>
          <p>
            Address 1 : <strong>{address.address1}</strong>
          </p>
          {address.address2 && (
            <p>
              Address 2 : <strong>{address.address2}</strong>
            </p>
          )}
          <p>
            City : <strong>{address.city}</strong>
          </p>
          <p>
            State : <strong>{address.state}</strong>
          </p>
          <p>
            Zip Code : <strong>{address.zip}</strong>
          </p>
        </>
      )}
    </div>
  );
};
