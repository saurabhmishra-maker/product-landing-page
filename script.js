
/* =========================
   MOBILE NAVIGATION
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("active");

});


/* Close mobile menu after clicking a link */

const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});


/* =========================
   PRODUCT DATA
========================= */

const products = {

    phone: {
        variant: "phoneVariant",
        price: "phonePrice",
        quantity: "phoneQuantity",
        total: "phoneTotal",
        quantityValue: 1
    },

    laptop: {
        variant: "laptopVariant",
        price: "laptopPrice",
        quantity: "laptopQuantity",
        total: "laptopTotal",
        quantityValue: 1
    },

    headphone: {
        variant: "headphoneVariant",
        price: "headphonePrice",
        quantity: "headphoneQuantity",
        total: "headphoneTotal",
        quantityValue: 1
    },

    grocery: {
        variant: "groceryVariant",
        price: "groceryPrice",
        quantity: "groceryQuantity",
        total: "groceryTotal",
        quantityValue: 1
    }

};


/* =========================
   PRICE UPDATE
========================= */

function updateProduct(type) {

    const product = products[type];

    const variantElement =
        document.getElementById(product.variant);

    const price =
        Number(variantElement.value);

    document.getElementById(product.price)
        .textContent = price.toLocaleString("en-IN");

    const total =
        price * product.quantityValue;

    document.getElementById(product.total)
        .textContent = total.toLocaleString("en-IN");

}


/* =========================
   QUANTITY
========================= */

function changeQuantity(type, change) {

    const product = products[type];

    product.quantityValue += change;

    /*
       Quantity cannot be less than 1
    */

    if (product.quantityValue < 1) {
        product.quantityValue = 1;
    }

    /*
       Maximum quantity = 10
    */

    if (product.quantityValue > 10) {
        product.quantityValue = 10;
    }

    document.getElementById(product.quantity)
        .textContent = product.quantityValue;

    updateProduct(type);

}


/* =========================
   VARIANT CHANGE
========================= */

Object.keys(products).forEach(function (type) {

    const product = products[type];

    const variantElement =
        document.getElementById(product.variant);

    variantElement.addEventListener(
        "change",
        function () {

            updateProduct(type);

        }
    );

});


/* =========================
   SELECT PRODUCT
========================= */

function selectProduct(productName) {

    document.getElementById("selectedProduct")
        .value = productName;

    /*
       Scroll to enquiry form
    */

    document.getElementById("contact")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================
   FORM VALIDATION
========================= */

const form =
    document.getElementById("enquiryForm");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    /*
       Get form values
    */

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const selectedProduct =
        document.getElementById("selectedProduct").value.trim();


    /*
       Error elements
    */

    const nameError =
        document.getElementById("nameError");

    const emailError =
        document.getElementById("emailError");

    const phoneError =
        document.getElementById("phoneError");


    /*
       Clear previous errors
    */

    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";


    let isValid = true;


    /* NAME VALIDATION */

    if (name === "") {

        nameError.textContent =
            "Please enter your name.";

        isValid = false;

    } else if (name.length < 3) {

        nameError.textContent =
            "Name must contain at least 3 characters.";

        isValid = false;

    }


    /* EMAIL VALIDATION */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {

        emailError.textContent =
            "Please enter your email.";

        isValid = false;

    } else if (!emailPattern.test(email)) {

        emailError.textContent =
            "Please enter a valid email.";

        isValid = false;

    }


    /* PHONE VALIDATION */

    const phonePattern =
        /^[6-9]\d{9}$/;

    if (phone === "") {

        phoneError.textContent =
            "Please enter your phone number.";

        isValid = false;

    } else if (!phonePattern.test(phone)) {

        phoneError.textContent =
            "Enter a valid 10-digit Indian mobile number.";

        isValid = false;

    }


    /* PRODUCT VALIDATION */

    if (selectedProduct === "") {

        alert("Please select a product first.");

        isValid = false;

    }


    /* =========================
       SUCCESS
    ========================= */

    if (isValid) {

        const successMessage =
            document.getElementById("successMessage");

        successMessage.style.display = "block";

        successMessage.textContent =
            "✅ Thank you! Your enquiry has been submitted successfully.";

        /*
           Reset form
        */

        form.reset();

        document.getElementById("selectedProduct")
            .value = "";

        /*
           Hide success message after 5 seconds
        */

        setTimeout(function () {

            successMessage.style.display = "none";

        }, 5000);

    }

});

