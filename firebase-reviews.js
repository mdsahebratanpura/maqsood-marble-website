// =====================================
// FIREBASE SDK
// =====================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// =====================================
// FIREBASE CONFIG
// =====================================

const firebaseConfig = {
    apiKey: "AIzaSyA9A2yUG77oFo-kdMRW5uDQNbg_p3nHcLI",
    authDomain: "maqsood-marble-polish.firebaseapp.com",
    projectId: "maqsood-marble-polish",
    storageBucket: "maqsood-marble-polish.firebasestorage.app",
    messagingSenderId: "492145901914",
    appId: ":492145901914:web:0fbc59efb0af06c744b363", 
    measurementId: "G-5WEJHSK2TT" 
}; 
 
 
// ===================================== 
// INITIALIZE FIREBASE 
// ===================================== 
 
const app = initializeApp(firebaseConfig); 
 
const db = getFirestore(app); 
 
 
// ===================================== 
// STAR RATING 
// ===================================== 
 
const stars = document.querySelectorAll("#starRating span"); 
const ratingInput = document.getElementById("reviewRating"); 
 
stars.forEach((star) => { 
 
    star.addEventListener("click", function () { 
 
        const selectedRating = 
            Number(this.dataset.rating); 
 
        ratingInput.value = selectedRating; 
 
        stars.forEach((item) => { 
 
            const itemRating = 
                Number(item.dataset.rating); 
 
            if (itemRating <= selectedRating) { 
                item.classList.add("active"); 
            } else { 
                item.classList.remove("active"); 
            } 
 
        }); 
 
    }); 
 
}); 
 
 
// ===================================== 
// REVIEW FORM 
// ===================================== 
 
const reviewForm = 
    document.getElementById("reviewForm"); 
 
if (reviewForm) { 
 
    reviewForm.addEventListener("submit", async function(event) { 
 
        event.preventDefault(); 
 
        const name = 
            document.getElementById("reviewName").value.trim(); 
 
        const rating = 
            Number(document.getElementById("reviewRating").value); 
 
        const message = 
            document.getElementById("reviewMessage").value.trim(); 
 
 
        // VALIDATION 
 
        if (!name) { 
            alert("Please enter your name."); 
            return; 
        } 
 
        if (!rating || rating < 1 || rating > 5) { 
            alert("Please select a star rating."); 
            return; 
        } 
 
        if (!message) { 
            alert("Please write your review."); 
            return; 
        } 
 
 
        // SAVE TO FIRESTORE 
 
        try { 
 
            console.log("Submitting review..."); 
 
            const reviewData = { 
 
                name: name, 
 
                rating: rating, 
 
                message: message, 
 
                approved: false, 
 
                createdAt: serverTimestamp() 
 
            }; 
 
 
            const docRef = await addDoc( 
                collection(db, "reviews"), 
                reviewData 
            ); 
 
 
            console.log( 
                "Review saved successfully:", 
                docRef.id 
            ); 
 
 
            alert( 
                "Thank you! Your review has been submitted for approval." 
            ); 
 
 
            // RESET FORM 
 
            reviewForm.reset(); 
 
            ratingInput.value = ""; 
 
            stars.forEach((star) => { 
                star.classList.remove("active"); 
            }); 
 
 
        } catch (error) { 
 
            console.error( 
                "Firebase review error:", 
                error 
            ); 
 
            alert( 
                "Review save nahi hua. Please try again." 
            ); 
 
        } 
 
    }); 
 
} 
 
 
// ===================================== 
// LOAD APPROVED REVIEWS 
// ===================================== 
 
async function loadApprovedReviews() { 
 
    const reviewsList = 
        document.getElementById("approvedReviewsList"); 
 
    // Agar reviews container page par nahi hai 
    if (!reviewsList) { 
        return; 
    } 
 
 
    try { 
 
        console.log("Loading approved reviews..."); 
 
 
        const approvedQuery = query( 
            collection(db, "reviews"), 
            where("approved", "==", true) 
        ); 
 
 
        const snapshot = 
            await getDocs(approvedQuery); 
 
 
        reviewsList.innerHTML = ""; 
 
 
        // No approved reviews 
 
        if (snapshot.empty) { 
 
            reviewsList.innerHTML = 
                "<p>No reviews yet.</p>"; 
 
            return; 
        } 
 
 
        // Display reviews 
 
        snapshot.forEach((reviewDoc) => { 
 
            const review = 
                reviewDoc.data(); 
 
 
            const card = 
                document.createElement("div"); 
 
            card.className = 
                "approved-review-card"; 
 
 
            const starsHTML = 
                "★".repeat(review.rating) + 
                "☆".repeat(5 - review.rating); 
 
 
            card.innerHTML = ` 
 
                <div class="approved-review-stars"> 
                    ${starsHTML} 
                </div> 
 
                <h4> 
                    ${review.name} 
                </h4> 
 
                <p> 
                    ${review.message} 
                </p> 
 
            `; 
 
 
            reviewsList.appendChild(card); 
 
        }); 
 
 
        console.log( 
            "Approved reviews loaded:", 
            snapshot.size 
        ); 
 
 
    } catch (error) { 
 
        console.error( 
            "Could not load approved reviews:", 
            error 
        ); 
 
 
        reviewsList.innerHTML = 
            "<p>Reviews could not be loaded.</p>"; 
 
    } 
 
} 
 
 
// ===================================== 
// START LOADING REVIEWS 
// ===================================== 
 
loadApprovedReviews();