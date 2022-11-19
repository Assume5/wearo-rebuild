import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { IAccount } from '../../types/account';
import { serverUrl, timeout } from '../../utils/constants';
import { generateGuestCookie, headerOptionForToken } from '../../utils/function';
import { EditAddress } from './EditAddress';
import { EditPassword } from './EditPassword';
import { EditPayment } from './EditPayment';
import { EditPersonalDetails } from './EditPersonalDetails';

interface Props {
  data: IAccount;
  setData: React.Dispatch<React.SetStateAction<IAccount | null>>;
}

export const Settings = ({ data, setData }: Props) => {
  const [editPersonal, setEditPersonal] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editPayment, setEditPayment] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const userCtx = useContext(UserContext);

  const onPaymentDeleteClick = async (id: string) => {
    if (!id) return;
    setLoading(true);

    const res = await fetch(`${serverUrl}/account/edit/payment/${id}`, {
      method: 'DELETE',
      headers: headerOptionForToken(),
    });

    const response = await res.json();


    if (!res.ok && res.status === 500) {
      console.error(`Error on Deleting Payment: ${response}`);
      return;
    }

    if (!response.success) {
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      await generateGuestCookie();
      userCtx.setUser({ isLogin: false, checked: true });
    } else {
      if (response.accessToken) {
        Cookies.set('access_token', response.accessToken, { expires: 7, secure: true });
      }
      const temp = [...data.payment];
      const i = temp.findIndex((item) => item.id === id);
      temp.splice(i, 1);

      setTimeout(() => {
        setData({ ...data, payment: temp });
        setLoading(false);
      }, timeout);
    }
  };

  return (
    <div className="account-settings fadeIn">
      <div className="setting-box">
        <div className="setting-header">
          <h4>Personal Details</h4>
          <p className="animate-bottom" onClick={() => setEditPersonal(!editPersonal)}>
            {!editPersonal ? 'Edit' : 'Back'}
          </p>
        </div>
        <div className="content">
          {!editPersonal ? (
            <div className="content-container fadeIn" key="personal-content">
              <p className="sm">Email</p>
              <p>{data.email}</p>
              <p className="sm">First Name</p>
              <p>{data.first_name}</p>
              <p className="sm">Last Name</p>
              <p>{data.last_name}</p>
              {data.phone && (
                <>
                  <p className="sm">Phone</p>
                  <p>{data.phone}</p>
                </>
              )}
            </div>
          ) : (
            <div className="form-container fadeIn" key="personal-form">
              <EditPersonalDetails data={data} setData={setData} setEditPersonal={setEditPersonal} />
            </div>
          )}
        </div>
      </div>

      <div className="setting-box fadeIn">
        <div className="setting-header">
          <h4>Address Details</h4>
          <p className="animate-bottom" onClick={() => setEditAddress(!editAddress)}>
            {!editAddress ? 'Edit' : 'Back'}
          </p>
        </div>
        <div className="content">
          {!editAddress ? (
            <div className="content-container fadeIn" key="address-content">
              {data.shipping_first_name && data.shipping_last_name ? (
                <div className="content-container fadeIn" key="personal-content">
                  <p className="sm">Shipping First Name</p>
                  <p>{data.shipping_first_name}</p>
                  <p className="sm">Shipping Last Name</p>
                  <p>{data.shipping_last_name}</p>
                  <p className="sm">Shipping Address 1</p>
                  <p>{data.address1}</p>
                  {data.address2 && (
                    <>
                      <p className="sm">Shipping Address 2</p>
                      <p>{data.address2}</p>
                    </>
                  )}
                  <p className="sm">Shipping City</p>
                  <p>{data.city}</p>
                  <p className="sm">Shipping State</p>
                  <p>{data.state}</p>
                  <p className="sm">Shipping Zip Code</p>
                  <p>{data.zip}</p>
                </div>
              ) : (
                <div className="content-container fadeIn" key="personal-content">
                  <p>No Address Found</p>
                </div>
              )}
            </div>
          ) : (
            <div className="form-container fadeIn" key="address-form">
              <EditAddress data={data} setData={setData} setEditAddress={setEditAddress} />
            </div>
          )}
        </div>
      </div>

      <div className="setting-box fadeIn">
        <div className="setting-header">
          <h4>Payment Details</h4>
          <p className="animate-bottom" onClick={() => setEditPayment(!editPayment)}>
            {!editPayment ? 'Add New' : 'Back'}
          </p>
        </div>
        <div className="content card-content">
          {!editPayment ? (
            <div className="content-container fadeIn" key="personal-form">
              {data.payment.length ? (
                <>
                  {data.payment.map((key) => {
                    return (
                      <div key={key.id} className="card-container">
                        <p className="animate-bottom" onClick={() => onPaymentDeleteClick(key.id)}>
                          {loading ? <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" /> : 'Delete'}
                        </p>
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
              ) : (
                <>
                  <p>No Payment Method Found</p>
                </>
              )}
            </div>
          ) : (
            <div className="form-container fadeIn">
              <EditPayment data={data} setData={setData} setEditPayment={setEditPayment} />
            </div>
          )}
        </div>
      </div>

      <div className="setting-box">
        <div className="setting-header">
          <h4>Password Setting</h4>
          <p className="animate-bottom" onClick={() => setEditPassword(!editPassword)}>
            {!editPassword ? 'Edit' : 'Back'}
          </p>
        </div>
        <div className="content">
          {editPassword && (
            <div className="form-container fadeIn" key="password-form">
              <EditPassword setEditPassword={setEditPassword} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
