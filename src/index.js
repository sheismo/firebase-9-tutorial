// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, onSnapshot,
    // getDocs, 
    addDoc, deleteDoc, doc, 
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword
} from 'firebase/auth'

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT01I0wlpd_8FWg4LLFqX1Iw7G-fu1m7A",
  authDomain: "fir-tutorial-dd3a2.firebaseapp.com",
  projectId: "fir-tutorial-dd3a2",
  storageBucket: "fir-tutorial-dd3a2.appspot.com",
  messagingSenderId: "893185672072",
  appId: "1:893185672072:web:100fcf9cc545167f76b03d"
};

// Initialize Firebase App
initializeApp(firebaseConfig)

//initialize services
const db = getFirestore()
const auth = getAuth()

//collection ref 
const colRef = collection(db, 'books');

//queries
const q = query(colRef, orderBy('createdAt'))

//real time collection data
// getDocs(colRef)
//     .then((snapshot) => {
        
//     })
//     .catch((err) => {
//         console.log(err.message);
//     })

onSnapshot(q, (snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
        books.push({
            ...doc.data(), id: doc.id
        })
    });
    console.log(books);
})
    
//adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    })
    .then(() => {
        addBookForm.reset()
        console.log('book added')
    })
})

//deleting documents 
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const docRef = doc(db, 'books', deleteBookForm.id.value)
    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
            console.log('book deleted')
        })
})

//get a single document
const docRef = doc(db, 'books', 'V6U1j0nI4Qj2UQ08njLN')

getDoc(docRef)
    .then((doc) => {
        console.log(doc.data(), doc.id)
    })

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

//updating a document 
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const docRef = doc(db, 'books', updateForm.id.value)
    updateDoc(docRef, {
        title: 'the Native Son'
    })
    .then(() => {
        updateForm.reset()
    })
})

//signing up users
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user created:', cred.user)
            signupForm.reset()
        })
        .catch((err) => {
            console.log(err.message)
        })
} )

//logging user in and  out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log('the user signed out')
        })
        .catch((err) => {
            console.log(err.message)
        })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user logged in sucessfully:', cred.user)
            loginForm.reset()
        })
        .catch((err) => {
            console.log(err.message)
        })
})
