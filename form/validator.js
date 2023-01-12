
// Validator object
function Validator(options) {
    function validate(inputElement, formMessage, parentElement, rule) {
        var errorMessage = rule.test(inputElement.value);
        if (errorMessage) {
            formMessage.innerText = errorMessage;
            parentElement.classList.add(options.invalidClassName);
        } else {
            formMessage.innerText = "";
            parentElement.classList.remove(options.invalidClassName);
        }
    }

    var formElement = document.querySelector(options.form);
    // console.log(formElement);
    // console.log(options.rules);
    if (formElement) {
        options.rules.forEach(
            (rule) => {
                var inputElement = document.querySelector(rule.selector);
                var parentElement = inputElement.parentElement;
                var formMessage = inputElement.parentElement.querySelector(options.formMessageSelector);
                if (inputElement) {
                    inputElement.onblur = () => {
                        validate(inputElement, formMessage, parentElement, rule);
                    }

                    inputElement.oninput = () => {
                        formMessage.innerText = "";
                        parentElement.classList.remove(options.invalidClassName);
                    }
                }
            }
        );
    }
}

Validator.isRequired = (selector) => {
    return {
        selector: selector,
        test(value) {
            return value.trim() ? undefined : "Vui long nhap truong nay";
        }
    }
}

Validator.isEmail = (selector) => {
    return {
        selector: selector,
        test(value) {
            var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return regex.test(value.trim()) ? undefined : "Vui long nhap dung dinh dang email";
        }
    }
}
Validator.minLength = (selector, elementName, min) => {
    return {
        selector: selector,
        test(value) {
            return value.length >= min ? undefined : `${elementName} toi thieu phai co ${min} ky tu`;
        }
    }
}
Validator.isSameValue = (selector, getCompareValue) => {
    return {
        selector: selector,
        test(value) {
            return value === getCompareValue() ? undefined : "Mat khau khong khop";
        }
    }
}