const inputTitle = document.querySelector("#input-title");
const inputEmail = document.querySelector("#input-Email");
const inputTextarea = document.querySelector("#input-textarea");
const form = document.querySelector('form');

const validationOkIcon = document.createElement("i");
validationOkIcon.classList.add("fas");
validationOkIcon.classList.add("fa-check");

const validRegex = {
    [inputTitle.id]:
        [
            /\S+/,
            "Message title shouldn't be empty"
        ],
    [inputEmail.id]:
        [
            /\S+@\S+.\S{2,3}/,
            "incorrect email"
        ],
    [inputTextarea.id]:
        [
            /\S+/,
            "Message text shouldn't be empty"
        ]
};

const invalidClasses = ["invalid", "invalid-text"];
const validClasses = ["valid", "valid-text"];

inputTitle.addEventListener('change', checkInputTitle);
inputEmail.addEventListener('change', checkInputEmail);
inputTextarea.addEventListener('change', checkInputTextarea);
form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkForm();
});

function checkInputTitle() {
    if (chechValid(inputTitle)) {
        return true;
    } else {
        return false;
    }
}

function checkInputEmail() {
    if (chechValid(inputEmail)) {
        return true;
    } else {
        return false;
    }
}

function checkInputTextarea() {
    if (chechValid(inputTextarea)) {
        return true;
    } else {
        return false;
    }
}

function chechValid(element) {
    let [regex, info] = validRegex[element.id];

    if (regex.test(element.value)) {
        element.classList.remove(invalidClasses[0]);
        element.classList.add(validClasses[0]);
        element.nextElementSibling.textContent = "";
        element.nextElementSibling.append(validationOkIcon);
        element.nextElementSibling.classList.replace(invalidClasses[1], validClasses[1]);
        return true;
    } else {
        element.classList.add(invalidClasses[0]);
        element.classList.remove(validClasses[0]);
        element.nextElementSibling.textContent = info;
        element.nextElementSibling.classList.replace(validClasses[1], invalidClasses[1]);
        return false;
    }
}

function checkForm() {
    if (checkInputTitle() && checkInputEmail() && checkInputTextarea()) {
        let submitBtn = document.querySelector('form button[type="submit"]');
        let spinner = document.createElement("div");
        spinner.classList.add('spinner-border');
        submitBtn.disable = true;
        submitBtn.textContent = "";
        submitBtn.append(spinner);

        setTimeout(showAfterSend, 2000);
    }
}

function showAfterSend() {
    form.hidden = true;
    let successfulSendInfo = document.createElement('div');
    successfulSendInfo.setAttribute('id', 'success');
    successfulSendInfo.textContent = "Successful send ";
    successfulSendInfo.append(validationOkIcon);
    form.parentElement.append(successfulSendInfo);
}