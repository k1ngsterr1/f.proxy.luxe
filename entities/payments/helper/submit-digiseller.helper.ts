const DIGISELLER_URL = "https://oplata.info/asp2/pay.asp";

export const submitDigisellerForm = (fields: Record<string, string>) => {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = DIGISELLER_URL;
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
