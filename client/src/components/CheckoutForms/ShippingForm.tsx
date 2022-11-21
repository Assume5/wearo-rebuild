import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IAddress, IStep } from '../../types/checkout';
import { AddressForm } from './AddressForm';
interface Props {
  address: IAddress | null;
  setAddress: React.Dispatch<React.SetStateAction<IAddress | null>>;
  step: IStep;
  setStep: React.Dispatch<React.SetStateAction<IStep>>;
}

export const ShippingForm = ({ address, setAddress, step, setStep }: Props) => {
  const onEditClick = () => {
    setStep({
      currentStep: 1,
      stepProceed: step.stepProceed,
      stepOne: { editing: true },
      stepTwo: { editing: false },
      stepThree: { editing: false },
    });
  };

  return (
    <div className="check-out-form">
      <div className="checkout-form-header">
        <h4>
          Shipping Address{' '}
          {!step.stepOne.editing && <FontAwesomeIcon onClick={onEditClick} icon={faPen} className={'clickable'} />}
        </h4>
      </div>

      {step.stepOne.editing && (
        <AddressForm
          address={address}
          setAddress={setAddress}
          step={step}
          setStep={setStep}
          hasEmail={true}
          hasPhone={true}
          formKey={'shipping-form'}
          key={'form-shipping'}
        />
      )}

      {step.stepProceed > 1 && !step.stepOne.editing && address && (
        <>
          <p>
            Email : <strong>{address.email}</strong>
          </p>
          <p>
            First Name : <strong>{address.first}</strong>
          </p>
          <p>
            Last Name : <strong>{address.last}</strong>
          </p>
          <p>
            Phone : <strong>{address.phone}</strong>
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
