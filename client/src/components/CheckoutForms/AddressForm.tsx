import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useRef, useState } from 'react';
import { IAddress, IStep } from '../../types/checkout';
import { timeout } from '../../utils/constants';

interface Props {
  address: IAddress | null;
  setAddress: React.Dispatch<React.SetStateAction<IAddress | null>>;
  hasEmail?: boolean;
  hasPhone?: boolean;
  step: IStep;
  setStep?: React.Dispatch<React.SetStateAction<IStep>>;
  formKey: string;
}

export const AddressForm = ({ address, setAddress, hasEmail, hasPhone, step, setStep, formKey }: Props) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let pass = true;
    setLoading(true);
    const stateInput = formRef.current?.querySelector('input[name="state"]');
    const zipInput = formRef.current?.querySelector('input[name="zipcode"]');
    stateInput?.classList.remove('error');
    zipInput?.classList.remove('error');

    const target = e.target as HTMLFormElement & {
      fName: { value: string };
      lName: { value: string };
      address1: { value: string };
      address2: { value: string };
      city: { value: string };
      state: { value: string };
      zipcode: { value: string };
      email: { value: string };
      phone: { value: string };
    };

    const { email, phone, fName, lName, address1, address2, city, state, zipcode } = target;

    if (state.value.length !== 2) {
      stateInput?.classList.add('error');
      pass = false;
    }

    if (zipcode.value.length !== 5) {
      zipInput?.classList.add('error');
      pass = false;
    }

    if (!pass) {
      setLoading(false);
      return;
    }

    const address: IAddress = {
      address1: address1.value,
      address2: address2.value,
      city: city.value,
      first: fName.value,
      last: lName.value,
      state: state.value,
      zip: zipcode.value,
    };
    if (hasEmail) address.email = email.value;
    if (hasPhone) address.phone = phone.value;

    setTimeout(() => {
      setAddress(address);
      setLoading(false);
      if (step && setStep) {
        if (step.currentStep === 1) {
          const tempStep: IStep = {
            ...step,
            currentStep: step.currentStep + 1,
            stepProceed: step.stepProceed === step.currentStep ? step.stepProceed + 1 : step.stepProceed,
            stepOne: { editing: false },
            stepTwo: { editing: true },
          };
          setStep(tempStep);
        }

        if (step.currentStep === 2) {
          const tempStep: IStep = {
            ...step,
            currentStep: step.currentStep + 1,
            stepProceed: step.stepProceed === step.currentStep ? step.stepProceed + 1 : step.stepProceed,
            stepOne: { editing: false },
            stepTwo: { editing: false },
            stepThree: { editing: true },
          };
          setStep(tempStep);
        }
      }
    }, timeout);
  };

  return (
    <div className="address-form fadeIn" key={formKey}>
      <form onSubmit={onFormSubmit} ref={formRef}>
        {hasEmail && (
          <div className="input email">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              defaultValue={address ? address.email : ''}
              placeholder="Email Address"
              key={`${formKey}-email-${address ? address.email : ''}`}
              required
            />
          </div>
        )}

        <div className="input fName">
          <label htmlFor="fName">First Name</label>
          <input
            type="text"
            name="fName"
            placeholder="First Name"
            defaultValue={address ? address.first : ''}
            key={`${formKey}-fName-${address ? address.first : ''}`}
            required
          />
        </div>
        <div className="input lName">
          <label htmlFor="lName">Last Name</label>
          <input
            type="text"
            name="lName"
            defaultValue={address ? address.last : ''}
            key={`${formKey}-lName-${address ? address.last : ''}`}
            placeholder="Last Name"
            required
          />
        </div>

        {hasPhone && (
          <div className="input phone">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              name="phone"
              defaultValue={address ? address.phone : ''}
              key={`${formKey}-phone-${address ? address.phone : ''}`}
              placeholder="Phone Number"
              required
            />
          </div>
        )}
        <div className="input address">
          <label htmlFor="address1">Address 1</label>
          <input
            type="text"
            name="address1"
            defaultValue={address ? address.address1 : ''}
            key={`${formKey}-add1--${address ? address.address1 : ''}`}
            placeholder="Address 1"
            required
          />
          <label htmlFor="address2">Address 2 (Optional)</label>
          <input
            type="text"
            name="address2"
            defaultValue={address ? address.address2 : ''}
            key={`${formKey}-add2-${address ? address.address2 : ''}`}
            placeholder="Address 2"
          />
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            defaultValue={address ? address.city : ''}
            key={`${formKey}-city-${address ? address.city : ''}`}
            placeholder="City"
            required
          />
          <label htmlFor="state">State</label>
          <input
            type="text"
            name="state"
            defaultValue={address ? address.state : ''}
            key={`${formKey}-state-${address ? address.state : ''}`}
            placeholder="State (XX)"
            required
          />
          <label htmlFor="zipcode">Zip Code</label>
          <input
            type="text"
            name="zipcode"
            defaultValue={address ? address.zip : ''}
            key={`${formKey}-zip-${address ? address.zip : ''}`}
            placeholder="Zip Code"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button disabled={loading}>
          Next Step {loading && <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />}
        </button>
      </form>
    </div>
  );
};
