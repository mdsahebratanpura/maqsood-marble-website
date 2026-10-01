// ========================================
// MAQSOOD MARBLE POLISH CONTRACTOR
// ========================================
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


async function loadApprovedReviews() {

    const reviewsList =
        document.getElementById("approvedReviewsList");

    if (!reviewsList) return;

    try {

        const q = query(
            collection(db, "reviews"),
            where("approved", "==", true)
        );

        const snapshot = await getDocs(q);

        reviewsList.innerHTML = "";

        if (snapshot.empty) {

            reviewsList.innerHTML =
                "<p>No reviews yet.</p>";

            return;
        }

        snapshot.forEach((reviewDoc) => {

            const review = reviewDoc.data();

            const card = document.createElement("div");

            card.className = "approved-review-card";

            card.innerHTML = `
                <div class="approved-review-stars">
                    ${"★".repeat(review.rating)}
                    ${"☆".repeat(5 - review.rating)}
                </div>

                <h4>${review.name}</h4>

                <p>${review.message}</p>
            `;

            reviewsList.appendChild(card);

        });

    } catch (error) {

        console.error("Could not load approved reviews:", error);

        reviewsList.innerHTML =
            "<p>Reviews could not be loaded.</p>";
    }
}

loadApprovedReviews();

// ========================================
// WEBSITE LOADED
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    console.log(
        "Maqsood Alam Marble Polish Contractor website loaded successfully."
    );


// ========================================
// NAVIGATION
// ========================================

    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    navItems.forEach(function (link) {

        link.addEventListener("click", function () {

            navItems.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

            // Mobile menu close
            navLinks.classList.remove("active");

        });

    });


// ========================================
// SIMPLE SCROLL EFFECT
// ========================================

    window.addEventListener("scroll", function () {

        const header = document.querySelector("header");

        if (window.scrollY > 50) {

            header.style.background = "rgba(5, 5, 5, 0.98)";

        } else {

            header.style.background = "rgba(10, 10, 10, 0.92)";

        }

    });


// ========================================
// PROFESSIONAL GALLERY
// ========================================

    const galleryImages =
        document.querySelectorAll(".gallery-grid img");

    const modal =
        document.getElementById("imageModal");

    const modalImage =
        document.getElementById("modalImage");

    const modalCaption =
        document.getElementById("imageCaption");

    const closeButton =
        document.querySelector(".close");

    const previousButton =
        document.getElementById("galleryPrev");

    const nextButton =
        document.getElementById("galleryNext");

    let currentImageIndex = 0;


// ========================================
// OPEN GALLERY
// ========================================

    function openGallery(index) {

        currentImageIndex = index;

        modal.style.display = "flex";

        updateGallery();

    }


// ========================================
// UPDATE GALLERY
// ========================================

    function updateGallery() {

        const image =
            galleryImages[currentImageIndex];

        modalImage.src = image.src;

        modalCaption.textContent =
            image.alt;

    }


// ========================================
// CLICK GALLERY IMAGE
// ========================================

    galleryImages.forEach(function (image, index) {

    image.style.cursor = "pointer";

    image.addEventListener("click", function () {

        currentImageIndex = index;

        modal.style.display = "flex";

        modalImage.src = image.src;

        modalCaption.textContent = image.alt;

    });

});


// ========================================
// PREVIOUS IMAGE
// ========================================

    previousButton.addEventListener("click", function (event) {

        event.stopPropagation();

        currentImageIndex--;

        if (currentImageIndex < 0) {

            currentImageIndex =
                galleryImages.length - 1;

        }

        updateGallery();

    });


// ========================================
// NEXT IMAGE
// ========================================

    nextButton.addEventListener("click", function (event) {

        event.stopPropagation();

        currentImageIndex++;

        if (
            currentImageIndex >=
            galleryImages.length
        ) {

            currentImageIndex = 0;

        }

        updateGallery();

    });


    // ========================================
// MOBILE IMAGE → FULLSCREEN
// ========================================

mobileGalleryImage.addEventListener("click", function () {

    currentImageIndex = mobileCurrentImage;

    modal.style.display = "flex";

    modalImage.src = mobileGalleryImages[mobileCurrentImage];

    modalCaption.textContent = "Marble Work";

});

// ========================================
// CLOSE GALLERY
// ========================================

    closeButton.addEventListener("click", function () {

        modal.style.display = "none";

    });


// ========================================
// CLICK OUTSIDE IMAGE
// ========================================

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {

            modal.style.display = "none";

        }

    });


// ========================================
// KEYBOARD CONTROLS
// ========================================

    document.addEventListener("keydown", function (event) {

        if (modal.style.display !== "flex") {
            return;
        }

        if (event.key === "ArrowLeft") {

            previousButton.click();

        }

        if (event.key === "ArrowRight") {

            nextButton.click();

        }

        if (event.key === "Escape") {

            modal.style.display = "none";

        }

    });


// ========================================
// MOBILE MENU
// ========================================

    const menuToggle =
        document.getElementById("menuToggle");

    if (menuToggle) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

        });

    }


// ========================================
// MOBILE PHOTO SLIDER
// ========================================

    const mobileGalleryImage =
        document.getElementById("mobileGalleryImage");

    const mobilePrev =
        document.getElementById("mobilePrev");

    const mobileNext =
        document.getElementById("mobileNext");


    const mobileGalleryImages = [

        "images/work1.jpg",
        "images/work2.jpg",
        "images/work3.jpg",
        "images/work4.jpg",
        "images/work5.jpg",
        "images/work6.jpg",
        "images/work7.jpg",
        "images/work8.jpg",
        "images/work9.jpg",
        "images/work10.jpg",
        "images/work11.jpg",
        "images/work12.jpg",
        "images/work13.jpg",
        "images/work14.jpg",
        "images/work15.jpg",
        "images/work16.jpg"

    ];


    let mobileCurrentImage = 0;


// ========================================
// SHOW MOBILE IMAGE
// ========================================

    function showMobileImage() {

        mobileGalleryImage.src =
            mobileGalleryImages[mobileCurrentImage];

    }


// ========================================
// MOBILE NEXT
// ========================================

    mobileNext.addEventListener("click", function () {

        mobileCurrentImage++;

        if (
            mobileCurrentImage >=
            mobileGalleryImages.length
        ) {

            mobileCurrentImage = 0;

        }

        showMobileImage();

    });


// ========================================
// MOBILE PREVIOUS
// ========================================

    mobilePrev.addEventListener("click", function () {

        mobileCurrentImage--;

        if (mobileCurrentImage < 0) {

            mobileCurrentImage =
                mobileGalleryImages.length - 1;

        }

        showMobileImage();

    });

});

// ========================================
// MOBILE PHOTO → FULLSCREEN
// ========================================

mobileGalleryImage.addEventListener("click", function () {

    modal.style.display = "flex";

    modalImage.src = mobileGalleryImages[mobileCurrentImage];

    modalCaption.textContent = "Marble Work";

});

// ========================================
// WHATSAPP ENQUIRY FORM
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const whatsappForm = document.getElementById("whatsappForm");

    if (!whatsappForm) {
        console.error("WhatsApp form not found!");
        return;
    }

    whatsappForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("customerName").value.trim();
        const phone = document.getElementById("customerPhone").value.trim();
        const location = document.getElementById("customerLocation").value.trim();
        const service = document.getElementById("customerService").value;
        const message = document.getElementById("customerMessage").value.trim();

        const cleanPhone = phone.replace(/\D/g, "");

        if (cleanPhone.length !== 10) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }

        if (!name || !location || !service || !message) {
            alert("Please fill all the required fields.");
            return;
        }

        const whatsappMessage =
`Hello Maqsood Alam Marble,

I would like to enquire about your marble work.

Name: ${name}
Mobile: ${cleanPhone}
Project Location: ${location}
Service: ${service}

Project Details:
${message}`;

        const whatsappURL =
            "https://wa.me/919820931003?text=" +
            encodeURIComponent(whatsappMessage);

        console.log("Opening WhatsApp:", whatsappURL);

        // Open WhatsApp
        window.location.href = whatsappURL;

    });

});
