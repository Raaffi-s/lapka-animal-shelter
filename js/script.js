const filterButtons = document.querySelectorAll(".filter-button");
const animalCards = document.querySelectorAll(".animal-card");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedType = button.dataset.filter;

        filterButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        animalCards.forEach((card) => {

            const animalType = card.dataset.type;

            if (
                selectedType === "all" ||
                animalType === selectedType
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

});