
// Validator object
function Validator(options) {
    function validate(inputElement, rule) {
        var parentElement = inputElement.parentElement;
        var errorMessage = rule.test(inputElement.value);
        var formMessage = inputElement.parentElement.querySelector(".form-message");
        if (errorMessage) {
            formMessage.innerText = errorMessage;
            parentElement.classList.add("invalid");
        } else {
            formMessage.innerText = "";
            parentElement.classList.remove("invalid");
        }
    }

    var formElement = document.querySelector(options.form);
    // console.log(formElement);
    // console.log(options.rules);
    if (formElement) {
        options.rules.forEach(
            (rule) => {
                var inputElement = document.querySelector(rule.selector);
                if (inputElement) {
                    inputElement.onblur = () => {
                        validate(inputElement, rule);
                    }
                }
            }
        );
    }
}

Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : "Vui long nhap truong nay";
        }
    }
}

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : "Vui long nhap truong nay";
        }
    }
}