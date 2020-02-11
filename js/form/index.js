import makePhone from './phohe';
import makeFields from './fields';

export function functionForm() {
    const form = document.querySelector(".js-order-form-wrapper");
    const submit = form.querySelector(".js-submit");
    const phone = makePhone(form);
    const fields = makeFields(form);
    const dataOrder = {};
    const invalidFields = new Set();
    const unsubscribeNumber = phone.subscribe(showValidationNumber);
    const unsubscribeFields = fields.subscribe(showValidation);


    function showValidationNumber({ error, value }) {
        dataOrder.phone = value;
        const { number, code, country } = phone.fields;
        if (error) {
            number.classList.add("input_error");
            code.classList.add("input_error");
            country.classList.add("input_error");
            invalidFields.add("phone");
            return;
        }
        number.classList.remove("input_error");
        code.classList.remove("input_error");
        country.classList.remove("input_error");
        invalidFields.delete("phone");
    }

    function showValidation({ nameError, emailError, addressError, value }) {
        dataOrder.name = value.name;
        dataOrder.email = value.email;
        dataOrder.address = value.address;
        const { name, email, address } = fields.fields;
        if (nameError) {
            name.classList.add("input_error");
            invalidFields.add("name");
        }
        else {
            name.classList.remove("input_error");
            invalidFields.delete("name");
        }
        if (emailError) {
            email.classList.add("input_error");
            invalidFields.add("email");
        }
        else {
            email.classList.remove("input_error");
            invalidFields.delete("email");
        }
        if (addressError) {
            address.classList.add("textarea_error");
            invalidFields.add("address");
        }
        else {
            address.classList.remove("textarea_error");
            invalidFields.delete("address");
        }
    }

    submit.addEventListener("click", e => {

        e.preventDefault();
        let withoutError = true;
        const stateNumber = phone.validatePhoneNumber();
        const stateFields = fields.validateFields();
        if (stateNumber.error) {
            alert("Проверьте корректность заполнения номера телефона")
            showValidationNumber(stateNumber);
            withoutError = false;
        }
        if (stateFields.nameError || stateFields.emailError || stateFields.addressError) {
            alert("Проверьте корректность заполнения всех необходимых полей: ФИО, Email, Адресс");
            showValidation(stateFields);
            withoutError = false;
        }
        if (withoutError) {
            getDataOrder();
            getDataProduct();
            console.log(dataOrder);
        }
    })
}