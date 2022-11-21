export type IAddress = {
  email?: string;
  first: string;
  last: string;
  phone?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
};

export type IPayment = {
  first: string;
  last: string;
  card: string;
  ed: string;
  sn: string;
};

export type ICheckoutForms = {
  shipping: IAddress;
  billing: IAddress;
  payment: IPayment;
};

export type IStep = {
  currentStep: number;
  stepProceed: number;
  stepOne: {
    editing: boolean;
  };
  stepTwo: {
    editing: boolean;
  };
  stepThree: {
    editing: boolean;
  };
};
