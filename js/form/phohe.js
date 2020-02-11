

export default function field(form) {
  const number = form.querySelector(selectorsData.number);
  const code = form.querySelector(selectorsData.code);
  const country = form.querySelector(selectorsData.country);

  // общие в field.js и специфические правила можно прокидывать в field
  function validate(field) {
    // required
    if (!field.value.trim()) {
      return "empty";
    }
    // => описывается специфическим правилом
    const match = field.value.match(/[0-9\s]+/);
    if (!match) {
      return "incorrect character";
    }
    if (match[0] === field.value) {
      return false;
    }
    return "incorrect character";
  }

  // => field.js
  let numberError = validate(number);
  let codeError = validate(code);
  let error = numberError || codeError;
  let touched = false;
  let value = {
    number: number.value,
    code: code.value
  };

  // простейший PubSub паттерн, можно унести в field.js
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
        error,
        touched,
        value,
        fields: { number, code, country }
      });
    });
  }

  // сохраняем изменения пользователя
  number.addEventListener("keyup", () => {
    touched = true;
    numberError = validate(number);
    error = numberError || codeError;
    value.number = number.value;
    notify();
  });
  code.addEventListener("keyup", () => {
    touched = true;
    codeError = validate(code);
    error = numberError || codeError;
    value.code = code.value;
    notify();
  });

  return {
    subscribe,
    error,
    touched,
    value,
    validate: () => {
      numberError = validate(number);
      codeError = validate(code);
      error = numberError || codeError;
      return {
        error,
        touched,
        value,
        fields: { number, code, country }
      };
    },
    prepareToSubmit: () => {
      touched = true;
    },
    fields: { number, code, country }
  };
}
