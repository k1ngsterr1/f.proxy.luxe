const WEBMONEY_URL = "https://merchant.webmoney.com/lmi/payment_utf.asp";

export const submitWebMoneyForm = (fields: Record<string, string>) => {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = WEBMONEY_URL;
  form.acceptCharset = "UTF-8";
  form.style.display = "none";

  Object.entries(fields).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};
