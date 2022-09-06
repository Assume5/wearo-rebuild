export const helper = () => {};

export const trimSpace = (text: string) => {
  return text.replaceAll(' ', '-');
};

export const trimDash = (text: string) => {
  return text.replaceAll('-', ' ');
};
