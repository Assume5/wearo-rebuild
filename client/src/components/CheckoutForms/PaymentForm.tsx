import { faCircleNotch, faLock, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FormEvent, useState } from 'react';
import { IAccount } from '../../types/account';
import { IPayment, IStep } from '../../types/checkout';
import { IPayment as IPaymentAccount } from '../../types/account';
import { timeout } from '../../utils/constants';
interface Props {
  payment: IPayment | null;
  setPayment: React.Dispatch<React.SetStateAction<IPayment | null>>;
  step: IStep;
  setStep: React.Dispatch<React.SetStateAction<IStep>>;
  data: IAccount | null;
}
export const PaymentForm = ({ payment, setPayment, step, setStep, data }: Props) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onEditClick = () => {
    setStep({
      currentStep: 3,
      stepProceed: step.stepProceed,
      stepOne: { editing: false },
      stepTwo: { editing: false },
      stepThree: { editing: true },
    });
  };

  const onDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 2) {
      e.target.value += '/';
    }
  };

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cc = document.querySelector('input[name="card"]');
    const expDate = document.querySelector('input[name="date"]');

    cc?.classList.remove('error');
    expDate?.classList.remove('error');

    const target = e.target as HTMLFormElement & {
      fName: { value: string };
      lName: { value: string };
      card: { value: string };
      date: { value: string };
      sn: { value: string };
    };

    const { fName, lName, card, date, sn } = target;

    if (card.value.length !== 16) {
      setLoading(false);
      cc?.classList.add('error');
      return;
    }

    if (date.value.length !== 5) {
      setLoading(false);
      expDate?.classList.add('error');
      return;
    }

    setTimeout(() => {
      setLoading(false);
      setPayment({
        card: card.value,
        first: fName.value,
        last: lName.value,
        ed: date.value,
        sn: sn.value,
      });

      setStep({
        ...step,
        stepThree: {
          editing: false,
        },
        stepProceed: 4,
        currentStep: 4,
      });
    }, timeout);
  };

  const onExistPaymentClick = (payment: IPaymentAccount) => {
    setPayment({
      card: `XXXXXXXXXXXX${payment.card_number}`,
      ed: payment.card_exp_date,
      first: payment.card_first_name,
      last: payment.card_last_name,
      sn: '',
    });
  };

  return (
    <div className="check-out-form">
      <div className="checkout-form-header">
        <h4>
          Payment Information{' '}
          {step.stepProceed <= 2 ? (
            <FontAwesomeIcon icon={faLock} />
          ) : (
            !step.stepThree.editing && <FontAwesomeIcon onClick={onEditClick} icon={faPen} className={'clickable'} />
          )}
        </h4>
      </div>
      {step.stepProceed > 2 && step.stepThree.editing && (
        <div className="address-form fadeIn" key={'payment-form'}>
          <form onSubmit={onFormSubmit}>
            <div className="input fName">
              <label htmlFor="fName">First Name</label>
              <input
                type="text"
                name="fName"
                placeholder="Card Holder First Name"
                defaultValue={payment?.first}
                key={payment?.first}
                required
              />
            </div>
            <div className="input lName">
              <label htmlFor="lName">Last Name</label>
              <input
                type="text"
                name="lName"
                placeholder="Card Holder Last Name"
                defaultValue={payment?.last}
                key={payment?.last}
                required
              />
            </div>
            <div className="input card-information">
              <label htmlFor="card">Card Number</label>
              <input
                type="text"
                maxLength={16}
                name="card"
                placeholder="Card Number"
                defaultValue={payment?.card}
                key={payment?.card}
                required
              />
              <label htmlFor="date">Expire Date</label>
              <input
                type="text"
                maxLength={5}
                name="date"
                defaultValue={payment?.ed}
                key={payment?.ed}
                onChange={(e) => onDateInputChange(e)}
                placeholder="XX/XX"
                required
              />
              <label htmlFor="date">Security Number</label>
              <input
                type="text"
                maxLength={5}
                name="sn"
                placeholder="XXX"
                defaultValue={payment?.sn}
                key={payment?.sn}
                required
              />
            </div>
            {data && data.payment.length && (
              <>
                <p className="select-exist-payment">Select a existing payment method: </p>
                {data.payment.map((key) => {
                  return (
                    <div key={key.id} className="card-container" onClick={() => onExistPaymentClick(key)}>
                      <div className="card-number">
                        <p className="sm">Card Number</p>
                        <p>XXXX {key.card_number.slice(-4)}</p>
                      </div>
                      <div className="holder-date">
                        <div className="content">
                          <p className="sm">Card Holder</p>
                          <p>{`${key.card_first_name} ${key.card_last_name}`}</p>
                        </div>
                        <div className="content">
                          <p className="sm">Expiration</p>
                          <p>{key.card_exp_date}</p>
                        </div>
                      </div>
                      <div className="card-address">
                        <p className="sm">Address</p>
                        <p>{key.billing_address1}</p>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
            <button disabled={loading}>
              Next Step {loading && <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />}
            </button>
          </form>
        </div>
      )}

      {step.stepProceed > 3 && !step.stepThree.editing && payment && (
        <>
          <p>
            First Name : <strong>{payment.first}</strong>
          </p>
          <p>
            Last Name : <strong>{payment.last}</strong>
          </p>

          <p>
            Card Number : <strong>{payment.card}</strong>
          </p>
          <p>
            Expiration Dates : <strong>{payment.ed}</strong>
          </p>
        </>
      )}
    </div>
  );
};
