export const sendMessage = (textMessage: string, phone: string) => {
  const message = encodeURIComponent(textMessage);

  window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${message}`);
};
