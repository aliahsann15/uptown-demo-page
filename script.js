const galleryImages = [
    {
        src: "assets/gallery1.jpg",
        alt: "Mercedes GLC 300 gallery image 1"
    },
    {
        src: "assets/gallery2.jpg",
        alt: "Mercedes GLC 300 gallery image 2"
    },
    {
        src: "assets/gallery3.jpg",
        alt: "Mercedes GLC 300 gallery image 3"
    },
    {
        src: "assets/gallery4.jpg",
        alt: "Mercedes GLC 300 gallery image 4"
    },
    {
        src: "assets/gallery5.jpg",
        alt: "Mercedes GLC 300 gallery image 5"
    }
];

let activeGalleryIndex = 0;

const galleryImage = document.querySelector("#gallery-image");
const galleryPreviewButtons = document.querySelectorAll("[data-gallery-preview]");
const previousGalleryButton = document.querySelector("[data-gallery-prev]");
const nextGalleryButton = document.querySelector("[data-gallery-next]");
const bookingSection = document.querySelector("#booking");
const availabilityForm = document.querySelector("#availability-form");
const successModal = document.querySelector("#success-modal");
const resetFormButton = document.querySelector("[data-reset-form]");
const whatsappModal = document.querySelector("#whatsapp-modal");
const whatsappForm = document.querySelector("#whatsapp-form");
const openWhatsappFormButtons = document.querySelectorAll("[data-open-whatsapp-form]");
const closeWhatsappFormButton = document.querySelector("[data-close-whatsapp-form]");
const customSelect = document.querySelector("[data-custom-select]");
const headerMenu = document.querySelector("[data-header-menu]");
const menuBackdrop = document.querySelector("[data-menu-backdrop]");
const openMenuButton = document.querySelector("[data-open-menu]");
const closeMenuButton = document.querySelector("[data-close-menu]");
const whatsappNumber = "971586877777";

function updateGalleryImage() {
    const currentImage = galleryImages[activeGalleryIndex];

    galleryImage.src = currentImage.src;
    galleryImage.alt = currentImage.alt;

    galleryPreviewButtons.forEach((button, index) => {
        button.classList.toggle("active", index === activeGalleryIndex);
    });
}

function showGalleryImage(direction) {
    activeGalleryIndex =
        (activeGalleryIndex + direction + galleryImages.length) % galleryImages.length;

    updateGalleryImage();
}

function closeCustomSelect() {
    const selectButton = customSelect.querySelector(".custom-select-button");
    const selectList = customSelect.querySelector(".custom-select-list");

    customSelect.classList.remove("open");
    selectButton.setAttribute("aria-expanded", "false");
    selectList.hidden = true;
}

function setupCustomSelect() {
    const selectInput = customSelect.querySelector("input[type='hidden']");
    const selectButton = customSelect.querySelector(".custom-select-button");
    const selectButtonText = selectButton.querySelector("span");
    const selectList = customSelect.querySelector(".custom-select-list");
    const selectOptions = customSelect.querySelectorAll(".custom-select-option");

    selectButton.addEventListener("click", () => {
        const willOpen = selectList.hidden;

        customSelect.classList.toggle("open", willOpen);
        selectButton.setAttribute("aria-expanded", String(willOpen));
        selectList.hidden = !willOpen;
    });

    selectOptions.forEach((option) => {
        option.addEventListener("click", () => {
            const selectedValue = option.dataset.value;

            selectInput.value = selectedValue;
            selectButtonText.textContent = selectedValue;

            selectOptions.forEach((currentOption) => {
                const isSelected = currentOption === option;

                currentOption.classList.toggle("active", isSelected);
                currentOption.setAttribute("aria-selected", String(isSelected));
            });

            closeCustomSelect();
        });
    });
}

function resetCustomSelect() {
    const firstOption = customSelect.querySelector(".custom-select-option");

    firstOption.click();
}

function openMenu() {
    headerMenu.classList.add("open");
    menuBackdrop.hidden = false;
    document.body.classList.add("menu-open");
    openMenuButton.setAttribute("aria-expanded", "true");
}

function closeMenu() {
    headerMenu.classList.remove("open");
    menuBackdrop.hidden = true;
    document.body.classList.remove("menu-open");
    openMenuButton.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
    if (headerMenu.classList.contains("open")) {
        closeMenu();
        return;
    }

    openMenu();
}

setupCustomSelect();

openMenuButton.addEventListener("click", toggleMenu);
closeMenuButton.addEventListener("click", closeMenu);
menuBackdrop.addEventListener("click", closeMenu);

headerMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.querySelectorAll("[data-scroll-to-booking]").forEach((button) => {
    button.addEventListener("click", () => {
        bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

previousGalleryButton.addEventListener("click", () => showGalleryImage(-1));
nextGalleryButton.addEventListener("click", () => showGalleryImage(1));

galleryPreviewButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        activeGalleryIndex = index;
        updateGalleryImage();
    });
});

availabilityForm.addEventListener("submit", (event) => {
    event.preventDefault();

    availabilityForm.reset();
    successModal.hidden = false;
});

resetFormButton.addEventListener("click", () => {
    successModal.hidden = true;
});

openWhatsappFormButtons.forEach((button) => {
    button.addEventListener("click", () => {
        whatsappModal.hidden = false;
    });
});

closeWhatsappFormButton.addEventListener("click", () => {
    whatsappModal.hidden = true;
});

whatsappForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(whatsappForm);
    const messageLines = [
        "Hi Uptown, I want to ask about the Mercedes-Benz GLC 300.",
        "",
        "Car: Mercedes-Benz GLC 300"
    ];

    const fullName = formData.get("full_name").trim();
    const pickupDate = formData.get("pickup_date");
    const returnDate = formData.get("return_date");
    const deliveryLocation = formData.get("delivery_location").trim();
    const driverStatus = formData.get("driver_status");
    const question = formData.get("question").trim();

    if (fullName) {
        messageLines.push(`Name: ${fullName}`);
    }

    if (pickupDate) {
        messageLines.push(`Pickup date: ${pickupDate}`);
    }

    if (returnDate) {
        messageLines.push(`Return date: ${returnDate}`);
    }

    if (deliveryLocation) {
        messageLines.push(`Delivery location: ${deliveryLocation}`);
    }

    if (driverStatus) {
        messageLines.push(`Driver status: ${driverStatus}`);
    }

    if (question) {
        messageLines.push("", `Question: ${question}`);
    } else {
        messageLines.push("", "Question: Please confirm availability, total price, deposit, documents, delivery, insurance and mileage details.");
    }

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageLines.join("\n"))}`;

    whatsappForm.reset();
    resetCustomSelect();
    whatsappModal.hidden = true;
    window.open(whatsappUrl, "_blank", "noopener");
});

successModal.addEventListener("click", (event) => {
    if (event.target === successModal) {
        successModal.hidden = true;
    }
});

whatsappModal.addEventListener("click", (event) => {
    if (event.target === whatsappModal) {
        whatsappModal.hidden = true;
    }
});

document.addEventListener("click", (event) => {
    if (!customSelect.contains(event.target)) {
        closeCustomSelect();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 1025) {
        closeMenu();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        successModal.hidden = true;
        whatsappModal.hidden = true;
        closeCustomSelect();
        closeMenu();
    }
});
