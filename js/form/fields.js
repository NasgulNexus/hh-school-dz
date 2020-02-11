
export function validateEmpty(field) {
  if (!field.trim()) {
    return "empty";
  }
}

function validateEmail(field) {
  const match = field.match(/@/);
  if (!match) {
    return "incorrect character";
  }
}

export default function fields(form) {

  const name = form.querySelector(selectorsData.name);
  const email = form.querySelector(selectorsData.email);
  const address = form.querySelector(selectorsData.address);

  let nameError = false;
  let emailError = false;
  let addressError = false;
  let value = {
    name: name.value,
    email: email.value,
    address: address.value,
  };

  let subscribers = [];
  function subscribe(callback) {
    subscribers.push(callback);
    return () => {
      subscribers = subscribers.filter(item => item !== callback);
    };
  }

  function notify() {
    subscribers.forEach(callback => {
      callback({
        nameError,
        emailError,
        addressError,
        value,
        fields: { name, email, address }
      });
    });
  }

  name.addEventListener("blur", () => {
    nameError = validateEmpty(name.value);
    value.name = name.value;
    notify();
  });

  email.addEventListener("blur", () => {
    emailError = validateEmpty(email.value) || validateEmail(email.value);
    value.email = email.value;
    notify();
  });

  address.addEventListener("blur", () => {
    addressError = validateEmpty(address.value);
    value.address = address.value;
    notify();
  });

  return {
    subscribe,
    nameError,
    emailError,
    addressError,
    value,
    validateFields: () => {
      nameError = validateEmpty(name.value);
      emailError = validateEmpty(email.value) || validateEmail(email.value);
      addressError = validateEmpty(address.value);
      return {
        nameError,
        emailError,
        addressError,
        value,
        fields: { name, email, address }
      };
    },
    fields: { name, email, address }
  };
} 