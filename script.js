/* =========================================================
   DELICIOUS BITES — MASTER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const loadingScreen = document.getElementById("loading-screen");
    const header = document.getElementById("main-header");
    const scrollProgress = document.getElementById("scroll-progress");

    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");
    const navLinks = document.querySelectorAll("#main-nav .nav-link");

    const orderForm = document.getElementById("order-form");
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const mealSelect = document.getElementById("meal");
    const quantityInput = document.getElementById("quantity");
    const addressInput = document.getElementById("address");

    const decreaseQuantity =
        document.getElementById("decrease-quantity");

    const increaseQuantity =
        document.getElementById("increase-quantity");

    const totalPrice =
        document.getElementById("total-price");

    const summaryMeal =
        document.getElementById("summary-meal");

    const summaryQuantity =
        document.getElementById("summary-quantity");

    const summaryTotal =
        document.getElementById("summary-total");

    const orderSuccess =
        document.getElementById("order-success");

    const successMessage =
        document.getElementById("success-message");

    const whatsappOrderButton =
        document.getElementById("whatsapp-order-btn");

    const newOrderButton =
        document.getElementById("new-order-btn");

    const backToTop =
        document.getElementById("back-to-top");


    /* =====================================================
       LOADING SCREEN
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loadingScreen) {
                loadingScreen.classList.add("loaded");
            }

        }, 700);

    });


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    function updateScrollProgress() {

        if (!scrollProgress) return;

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        if (documentHeight <= 0) {
            scrollProgress.style.width = "0%";
            return;
        }

        const percentage =
            (scrollTop / documentHeight) * 100;

        scrollProgress.style.width =
            `${percentage}%`;

    }


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mainNav.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation"
                    : "Open navigation"
            );

            menuToggle.textContent =
                isOpen ? "✕" : "☰";

        });


        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

                menuToggle.textContent = "☰";

            });

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    function updateActiveNavigation() {

        const scrollPosition =
            window.scrollY + 150;

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                currentSection =
                    section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       ORDER PRICE CALCULATION
    ===================================================== */

    function getSelectedPrice() {

        if (!mealSelect) return 0;

        const selectedOption =
            mealSelect.options[
                mealSelect.selectedIndex
            ];

        if (!selectedOption) return 0;

        const price =
            parseFloat(
                selectedOption.dataset.price
            );

        return isNaN(price) ? 0 : price;

    }


    function getQuantity() {

        if (!quantityInput) return 1;

        let quantity =
            parseInt(quantityInput.value, 10);

        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
        }

        return quantity;

    }


    function updateOrderTotal() {

        if (!mealSelect || !quantityInput) return;

        const meal =
            mealSelect.value;

        const price =
            getSelectedPrice();

        const quantity =
            getQuantity();

        const total =
            price * quantity;


        /* Main total */

        if (totalPrice) {

            totalPrice.textContent =
                `GH₵${total.toFixed(2)}`;

        }


        /* Live summary */

        if (summaryMeal) {

            summaryMeal.textContent =
                meal || "Not selected";

        }


        if (summaryQuantity) {

            summaryQuantity.textContent =
                quantity;

        }


        if (summaryTotal) {

            summaryTotal.textContent =
                `GH₵${total.toFixed(2)}`;

        }

    }


    /* =====================================================
       MEAL CHANGE
    ===================================================== */

    if (mealSelect) {

        mealSelect.addEventListener(
            "change",
            updateOrderTotal
        );

    }


    /* =====================================================
       QUANTITY — INCREASE
    ===================================================== */

    if (increaseQuantity) {

        increaseQuantity.addEventListener(
            "click",
            () => {

                const current =
                    getQuantity();

                quantityInput.value =
                    current + 1;

                updateOrderTotal();

            }
        );

    }


    /* =====================================================
       QUANTITY — DECREASE
    ===================================================== */

    if (decreaseQuantity) {

        decreaseQuantity.addEventListener(
            "click",
            () => {

                const current =
                    getQuantity();

                if (current > 1) {

                    quantityInput.value =
                        current - 1;

                } else {

                    quantityInput.value = 1;

                }

                updateOrderTotal();

            }
        );

    }


    /* =====================================================
       MANUAL QUANTITY INPUT
    ===================================================== */

    if (quantityInput) {

        quantityInput.addEventListener(
            "input",
            () => {

                if (
                    quantityInput.value === "" ||
                    parseInt(quantityInput.value, 10) < 1
                ) {
                    quantityInput.value = 1;
                }

                updateOrderTotal();

            }
        );

    }


    /* =====================================================
       MENU ORDER NOW BUTTONS
    ===================================================== */

    const menuOrderButtons =
        document.querySelectorAll(
            ".menu-order-btn"
        );


    menuOrderButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const selectedMeal =
                    button.dataset.meal;

                if (mealSelect && selectedMeal) {

                    mealSelect.value =
                        selectedMeal;

                    updateOrderTotal();

                }

                const orderSection =
                    document.getElementById("order");

                if (orderSection) {

                    orderSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


    /* =====================================================
       ORDER FORM SUBMISSION
    ===================================================== */

    if (orderForm) {

        orderForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                /* -----------------------------
                   GET FORM VALUES
                ----------------------------- */

                const name =
                    nameInput.value.trim();

                const phone =
                    phoneInput.value.trim();

                const meal =
                    mealSelect.value;

                const quantity =
                    getQuantity();

                const address =
                    addressInput.value.trim();

                const price =
                    getSelectedPrice();

                const total =
                    price * quantity;

/* -----------------------------
   PROFESSIONAL VALIDATION
----------------------------- */

if (!name) {
    alert("Please enter your full name.");
    nameInput.focus();
    return;
}

if (name.length < 2) {
    alert("Please enter a valid name.");
    nameInput.focus();
    return;
}

if (!phone) {
    alert("Please enter your phone number.");
    phoneInput.focus();
    return;
}

/* Remove spaces, brackets and hyphens */
const cleanPhone = phone.replace(/[\s\-()]/g, "");

/* Ghana/international phone validation */
const phonePattern = /^(?:\+233|233|0)\d{9}$/;

if (!phonePattern.test(cleanPhone)) {
    alert(
        "Please enter a valid Ghana phone number.\n\n" +
        "Example: 0244567744 or +233244567744"
    );

    phoneInput.focus();
    return;
}

if (!meal) {
    alert("Please select a meal.");
    mealSelect.focus();
    return;
}

if (quantity < 1) {
    alert("Quantity must be at least 1.");
    quantityInput.focus();
    return;
}

if (!address) {
    alert("Please enter your delivery address.");
    addressInput.focus();
    return;
}

if (address.length < 5) {
    alert("Please enter a more complete delivery address.");
    addressInput.focus();
    return;
}


                /* -----------------------------
                   SUCCESS MESSAGE
                ----------------------------- */

                successMessage.innerHTML =

                    `Thank you, <strong>${escapeHTML(name)}</strong>!<br><br>` +

                    `Your order: <strong>${quantity} × ${escapeHTML(meal)}</strong><br>` +

                    `<strong>Total: GH₵${total.toFixed(2)}</strong><br><br>` +

                    `We will contact you at <strong>${escapeHTML(phone)}</strong> to confirm your order.`;


                /* -----------------------------
                   WHATSAPP
                ----------------------------- */

                const whatsappNumber =
                    "233503580562";

                    const whatsappMessage =

    `🍽️ *DELICIOUS BITES*%0A` +
    `━━━━━━━━━━━━━━━━%0A%0A` +

    `📋 *NEW ORDER*%0A%0A` +

    `👤 *Customer:* ${encodeURIComponent(name)}%0A` +
    `📞 *Phone:* ${encodeURIComponent(phone)}%0A%0A` +

    `🍴 *ORDER DETAILS*%0A` +
    `Meal: ${encodeURIComponent(meal)}%0A` +
    `Quantity: ${quantity}%0A` +
    `💰 *Total: GH₵${total.toFixed(2)}*%0A%0A` +

    `📍 *DELIVERY ADDRESS*%0A` +
    `${encodeURIComponent(address)}%0A%0A` +

    `Thank you! 🙏`;
    


                if (whatsappOrderButton) {

                    whatsappOrderButton.href =
                        `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

                }


                /* -----------------------------
                   HIDE FORM
                ----------------------------- */

                orderForm.style.display =
                    "none";


                /* -----------------------------
                   SHOW SUCCESS
                ----------------------------- */

                orderSuccess.style.display =
                    "block";


                /* Scroll to confirmation */

                setTimeout(() => {

                    orderSuccess.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }, 100);

            }
        );

    }


    /* =====================================================
       PLACE ANOTHER ORDER
    ===================================================== */

    if (newOrderButton) {

        newOrderButton.addEventListener(
            "click",
            () => {

                /* Hide success box */

                if (orderSuccess) {

                    orderSuccess.style.display =
                        "none";

                }


                /* Show form */

                if (orderForm) {

                    orderForm.style.display =
                        "";

                }


                /* Reset form */

                if (orderForm) {

                    orderForm.reset();

                }


                /* Reset quantity */

                if (quantityInput) {

                    quantityInput.value = 1;

                }


                /* Reset totals */

                updateOrderTotal();


                /* Reset WhatsApp */

                if (whatsappOrderButton) {

                    whatsappOrderButton.href =
                        "#";

                }


                /* Return to order form */

                if (orderForm) {

                    setTimeout(() => {

                        orderForm.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }, 100);

                }

            }
        );

    }


    /* =====================================================
       GALLERY LIGHTBOX
    ===================================================== */

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );

    const lightbox =
        document.getElementById(
            "gallery-lightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightbox-image"
        );

    const lightboxClose =
        document.getElementById(
            "lightbox-close"
        );


    function openLightbox(image) {

        if (!lightbox || !lightboxImage) {
            return;
        }

        lightboxImage.src =
            image.src;

        lightboxImage.alt =
            image.alt || "Food image";

        lightbox.classList.add("active");

        document.body.style.overflow =
            "hidden";

    }


    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }


    galleryItems.forEach(item => {

        const image =
            item.querySelector("img");

        if (!image) return;

        image.style.cursor =
            "pointer";

        image.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                openLightbox(image);

            }
        );

    });


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       ESC KEY — CLOSE LIGHTBOX
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                lightbox &&
                lightbox.classList.contains("active")
            ) {

                closeLightbox();

            }

        }
    );


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       WINDOW SCROLL
    ===================================================== */

    window.addEventListener(
        "scroll",
        () => {

            updateHeader();

            updateScrollProgress();

            updateActiveNavigation();

        },
        { passive: true }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateHeader();

    updateScrollProgress();

    updateActiveNavigation();

    updateOrderTotal();


    /* =====================================================
       SECURITY HELPER
    ===================================================== */

    function escapeHTML(value) {

        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

});