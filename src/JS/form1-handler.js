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


document.getElementById("input-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const sla = document.getElementById("sla").value;
    const containerImageInput = document.getElementById("container_image");
    const network = document.getElementById("network").value;
    const secrets = document.getElementById("secrets").value.trim();

    // Validate inputs
    if (sla < 0 || sla > 7) {
        alert("SLA value must be between 0 and 7.");
        return;
    }

    const containerImageFile = containerImageInput.files[0];
    if (!containerImageFile) {
        alert("Please select a container image file.");
        return;
    }

    const fileName = containerImageFile.name;
    if (!fileName.endsWith(".docker")) {
        alert("The container image must be a .docker file.");
        return;
    }

    if (!network) {
        alert("Please select a valid network.");
        return;
    }

    if (!secrets) {
        alert("Secrets field cannot be empty.");
        return;
    }

    const encryptionKey = "ZHVtZHVt"; // Replace with a secure key
    const encryptedSecrets = CryptoJS.AES.encrypt(secrets, encryptionKey).toString();

    const user = "Admin-ID"

    const formDataString = JSON.stringify({
        user,
        sla,
        containerImage: fileName,
        network,
        encryptedSecrets,
    });

    const CID = CryptoJS.SHA256(formDataString).toString(CryptoJS.enc.Hex);

    try {
        // Save metadata to Firestore

        // Add a new document in collection "cities"
        await addDoc(collection(db, "deployments"), {
            userID: user,
            sla: parseInt(sla),
            network: network,
            secrets: encryptedSecrets,
            containerID: CID,
            timestamp: serverTimestamp()
        });
        
        alert("Form submitted successfully!");
        window.location.href="../index.html"; 
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while submitting the form.");
    }
});
