const filterButtons = document.querySelectorAll(".filter-button");
const animalCards = document.querySelectorAll(".animal-card");
const animalCount = document.querySelector("#animalCount");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        filterButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        let visibleCount = 0;

        animalCards.forEach(card => {

            const type = card.dataset.type;

            if (filter === "all" || type === filter) {
                card.style.display = "";
                visibleCount++;
            } else {
                card.style.display = "none";
            }

        });

        animalCount.textContent =
            String(visibleCount).padStart(2, "0");
    });
});


const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        faqItems.forEach(otherItem => {
            otherItem.classList.remove("active");
        });

        if (!isActive) {
            item.classList.add("active");
        }

    });

});


const helpButtons = document.querySelectorAll(".help-card-button");
const helpForm = document.querySelector("#helpForm");
const helpFormElement = document.querySelector("#helpFormElement");
const formClose = document.querySelector(".form-close");
const helpType = document.querySelector("#helpType");
const formSuccess = document.querySelector("#formSuccess");

helpButtons.forEach(button => {

    button.addEventListener("click", () => {

        const type = button.dataset.help;

        helpForm.classList.add("open");

        helpType.value = type;

        helpForm.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

});


formClose.addEventListener("click", () => {
    helpForm.classList.remove("open");
});


function showError(field, message) {

    const wrapper = field.closest(".form-field");
    const error = wrapper.querySelector(".error-message");

    wrapper.classList.add("error");
    error.textContent = message;
}


function clearError(field) {

    const wrapper = field.closest(".form-field");
    const error = wrapper.querySelector(".error-message");

    wrapper.classList.remove("error");
    error.textContent = "";
}


function validateName(field, title) {

    const value = field.value.trim();

    if (value === "") {
        showError(field, `Введите ${title}`);
        return false;
    }

    if (value.length < 2) {
        showError(field, `${title} должно содержать минимум 2 символа`);
        return false;
    }

    if (!/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(value)) {
        showError(field, `${title} может содержать только буквы`);
        return false;
    }

    clearError(field);
    return true;
}


function validateEmail(field) {

    const value = field.value.trim();

    if (value === "") {
        showError(field, "Введите email");
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        showError(field, "Введите корректный email");
        return false;
    }

    clearError(field);
    return true;
}


function validateSelect(field) {

    if (field.value === "") {
        showError(field, "Выберите вариант помощи");
        return false;
    }

    clearError(field);
    return true;
}


function validateMessage(field) {

    const value = field.value.trim();

    if (value.length > 0 && value.length < 5) {
        showError(field, "Сообщение слишком короткое");
        return false;
    }

    clearError(field);
    return true;
}


helpFormElement.addEventListener("submit", event => {

    event.preventDefault();

    const firstName = document.querySelector("#firstName");
    const lastName = document.querySelector("#lastName");
    const email = document.querySelector("#email");
    const message = document.querySelector("#message");

    const firstNameValid =
        validateName(firstName, "Имя");

    const lastNameValid =
        validateName(lastName, "Фамилия");

    const emailValid =
        validateEmail(email);

    const typeValid =
        validateSelect(helpType);

    const messageValid =
        validateMessage(message);

    if (
        !firstNameValid ||
        !lastNameValid ||
        !emailValid ||
        !typeValid ||
        !messageValid
    ) {
        return;
    }

    formSuccess.classList.add("show");

    helpFormElement.reset();

    setTimeout(() => {
        formSuccess.classList.remove("show");
    }, 5000);

});


const inputs = document.querySelectorAll(
    "#helpFormElement input, #helpFormElement textarea, #helpFormElement select"
);

inputs.forEach(input => {

    input.addEventListener("input", () => {
        clearError(input);
    });

    input.addEventListener("change", () => {
        clearError(input);
    });

});


const animalModal = document.querySelector("#animalModal");
const animalModalOverlay = document.querySelector(".animal-modal-overlay");
const animalModalClose = document.querySelector(".animal-modal-close");
const animalModalHelp = document.querySelector("#animalModalHelp");

const modalAnimalImage = document.querySelector("#modalAnimalImage");
const modalAnimalType = document.querySelector("#modalAnimalType");
const modalAnimalName = document.querySelector("#modalAnimalName");
const modalAnimalAge = document.querySelector("#modalAnimalAge");
const modalAnimalDescription = document.querySelector("#modalAnimalDescription");
const modalAnimalCharacter = document.querySelector("#modalAnimalCharacter");
const modalAnimalHistory = document.querySelector("#modalAnimalHistory");

const animalData = {
    "Луна": {
        type: "КОШКА",
        age: "1 год",
        image: "images/image3.jpg",
        description: "Ласковая и спокойная кошка, которая любит внимание и уютную домашнюю атмосферу.",
        character: "Ласковая и спокойная",
        history: "Любит тихие вечера рядом с человеком."
    },

    "Марта": {
        type: "КОШКА",
        age: "3 года",
        image: "images/image2.jpg",
        description: "Нежная и самостоятельная кошка. Ей важно спокойное знакомство и немного личного пространства.",
        character: "Нежная и самостоятельная",
        history: "Хорошо чувствует себя в спокойной домашней обстановке."
    },

    "Ричи": {
        type: "СОБАКА",
        age: "4 года",
        image: "images/image4.jpg",
        description: "Дружелюбный пёс, который любит общение, внимание человека и прогулки.",
        character: "Дружелюбный и общительный",
        history: "Особенно любит проводить время рядом с человеком."
    },

    "Макс": {
        type: "СОБАКА",
        age: "2 года",
        image: "images/image5.jpg",
        description: "Активный и жизнерадостный пёс, которому особенно понравятся долгие прогулки.",
        character: "Активный и игривый",
        history: "Обожает прогулки и игры на свежем воздухе."
    },

    "Соня": {
        type: "КОШКА",
        age: "2 года",
        image: "images/image7.jpg",
        description: "Спокойная кошка, которая постепенно привыкает к человеку и ценит заботу.",
        character: "Спокойная и ласковая",
        history: "Любит уют и спокойную атмосферу."
    },

    "Алиса": {
        type: "КОШКА",
        age: "4 года",
        image: "images/image8.jpg",
        description: "Уверенная в себе кошка с самостоятельным характером, которая умеет ценить внимание.",
        character: "Самостоятельная и умная",
        history: "Ей нравится комфорт и немного личного пространства."
    },

    "Боня": {
        type: "СОБАКА",
        age: "1 год",
        image: "images/image6.jpg",
        description: "Молодая и игривая собака, которой хочется много движения, внимания и общения.",
        character: "Игривая и энергичная",
        history: "Любит игры, прогулки и внимание человека."
    },

    "Тайсон": {
        type: "СОБАКА",
        age: "3 года",
        image: "images/image9.jpg",
        description: "Добрый и дружелюбный пёс, который будет рад активному человеку и новым прогулкам.",
        character: "Дружелюбный и добрый",
        history: "Хорошо относится к людям и любит проводить время рядом с ними."
    }
};


function openAnimalModal(name) {

    const animal = animalData[name];

    if (!animal) {
        return;
    }

    modalAnimalImage.src = animal.image;
    modalAnimalImage.alt = name;

    modalAnimalType.textContent = animal.type;
    modalAnimalName.textContent = name;
    modalAnimalAge.textContent = animal.age;

    modalAnimalDescription.textContent = animal.description;
    modalAnimalCharacter.textContent = animal.character;
    modalAnimalHistory.textContent = animal.history;

    animalModal.classList.add("open");

    document.body.style.overflow = "hidden";
}


function closeAnimalModal() {

    animalModal.classList.remove("open");

    document.body.style.overflow = "";
}


const animalArrows = document.querySelectorAll(".animal-arrow");

animalArrows.forEach(button => {

    button.addEventListener("click", event => {

        event.stopPropagation();

        const card = button.closest(".animal-card");
        const name = card.querySelector("h3").textContent.trim();

        openAnimalModal(name);
    });
});


animalModalClose.addEventListener("click", closeAnimalModal);

animalModalOverlay.addEventListener("click", closeAnimalModal);


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeAnimalModal();
    }

});


animalModalHelp.addEventListener("click", () => {

    const name = modalAnimalName.textContent;

    closeAnimalModal();

    helpForm.classList.add("open");

    helpType.value = "owner";

    const message = document.querySelector("#message");

    message.value =
        `Здравствуйте! Я хочу узнать подробнее о ${name} и возможности стать его хозяином.`;

    helpForm.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});