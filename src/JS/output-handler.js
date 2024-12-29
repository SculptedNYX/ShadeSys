// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration (same as your input script)
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

// Function to fetch data from Firestore
async function fetchData() {
    try {
        // Reference the Firestore collection
        const querySnapshot = await getDocs(collection(db, "deployments"));
        
        // Get the table body element
        const tableBody = document.querySelector("table tbody");
        
        // Iterate through each document in the collection
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const row = document.createElement("tr");
            
            // Create table cells for each field
            row.innerHTML = `
                <td>${data.containerID}</td>
                <td>${data.userID}</td>
                <td>${data.sla}</td>
                <td>${data.network}</td>
                <td>${data.secrets}</td>
                <td>${data.timestamp?.toDate().toLocaleString() || "N/A"}</td>
                <td>${data.timestamp?.toDate().toLocaleString() || "N/A"}</td>
            `;

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Call the fetchData function when the page loads
fetchData();
