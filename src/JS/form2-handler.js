// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB-0qj3ul9HlXfnfOnDpHLRy2-fQaAxVLA",
    authDomain: "shadesys-8cbc6.firebaseapp.com",
    projectId: "shadesys-8cbc6",
    storageBucket: "shadesys-8cbc6.firebasestorage.app",
    messagingSenderId: "1038194916219",
    appId: "1:1038194916219:web:1efd257b03d9dc6019dbde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

document.getElementById("input-form-2").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const encryptionMethod = document.getElementById("encryption_method").value;
    const rotation = document.getElementById("rotation").value;

    if (!encryptionMethod) {
        alert("Please select a valid encryption method.");
        return;
    }

    if (!rotation) {
        alert("Please select a rotation option.");
        return;
    }
    
    const userId = "Admin-ID"

    const formDataString = JSON.stringify({
        userId,
        encryptionMethod,
        rotation
    });

    try {
        // Save metadata to Firestore
        await addDoc(collection(db, "keyimport"), {
            userId,
            encryptionMethod,
            rotation,
            timestamp: serverTimestamp()
        });
        
        alert("Form submitted successfully!");
        window.location.href = "../index.html"; 
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while submitting the form.");
    }
});
