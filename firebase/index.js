// Import Firebase App and Database SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  push,
  set,
  onValue,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7PM4xS7isZsrdfzokPacQpB0BF-qdvfo",
  authDomain: "humber-demo-15.firebaseapp.com",
  projectId: "humber-demo-15",
  storageBucket: "humber-demo-15.firebasestorage.app",
  messagingSenderId: "714875390233",
  appId: "1:714875390233:web:c2a16ba6c01039466fdd88"
};

// Initialize Firebase and Database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const ul = document.getElementById("messages");

// Reference to the messages node
const messages = ref(database, "/message");

// Read data and update HTML
onValue(messages, (snapshot) => {
  ul.innerHTML = ""; 

  snapshot.forEach((childSnapshot) => {
    
    const childKey = childSnapshot.key;

    
    const childData = childSnapshot.val();

    console.log(childKey);
    console.log(childData);

    
    ul.innerHTML += "<li>" + childData.message + " ~ " + childData.name + "</li>";
  });
});

let add = document.getElementById("add");

add.addEventListener("click", function () {
  const name = document.getElementById("name");
  const message = document.getElementById("message");

  const newMessage = push(messages);

  set(newMessage, {
    name: name.value,
    message: message.value,
    createdate: serverTimestamp(),
  });
});
