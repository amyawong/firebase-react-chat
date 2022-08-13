// Project public-facing name
// project-571580705504

import React from 'react';
import './App.css';

import firebase from 'firebase/app'; // firebase sdk
import 'firebase/firestore'; // for database
import 'firebase/auth' // for user authentication

// hooks to make it easier to work with react
import { useAuthState } from 'react-firebase-hooks/auth' // checks if a user is signed in or not
import { useCollectionData } from 'react-firebase-hooks/firestore'


// to identify our project
firebase.initializeApp({
  apiKey: "AIzaSyBI5UVCJTfYYlmBmaYLGpjd4KprddoMTmM",
  authDomain: "fir-react-chat-7427f.firebaseapp.com",
  projectId: "fir-react-chat-7427f",
  storageBucket: "fir-react-chat-7427f.appspot.com",
  messagingSenderId: "571580705504",
  appId: "1:571580705504:web:1463a414e6eeb991b5be85",
  measurementId: "G-EBPTVWD3JT",
})


// make references to auth and firestore sdks as global variables
const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  const [user] = useAuthState(auth); // checks if a user is signed in
    // if a user is signed in, it returns user as an object; if a user is not signed in, it returns user as null

  return (
    <div className="App">
      <header className="App-header">

      </header>
      <section>
        { user ? <ChatRoom /> : <SignIn /> }
      </section>
    </div>
  );
}

// What allows a user to sign into their Google account
function SignIn () {
  const signInWithGoogle = () => {
    // instantiate a provider called GoogleAuthprovider which we pass into the sign in popup method
    const provider = new firebase.auth.GoogleAuthProvider();
    
    // triggers a popup window when the user clicks on the button
    auth.signInWithPopup(provider)
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

// Check to see if there is a current user and if there is, return a button that triggers the sign out method
function SignOut () {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

// Build a chat room
function ChatRoom () {
  const messagesRef = firestore.collection('messages')
  // make a reference to a firestore collection/to a point in database

  const query = messagesRef.orderBy('createdAt').limit(25)
  // make a query for a subset of documents in a collection which we want ordered by time stamp and limited to a number of 25

  const [messages] = useCollectionData(query, { idField: 'id' });
  // make this query and lsiten to the data and any updates to the data in real time with useCollectionData hook
  // returns an array of objects where each object is a chat message in the database
  // any time the data changes, react will rerender to changes with the latest data in realtime

  return (
    <>
    <div>
      { messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
    </div>

    <div>

    </div>
    </>
  )
  // map over the array of messages and for each message, use <ChatMessage /> component that has key prop of msg.id and passes document data as msg prop
}

// Define the ChatMessage child component
function ChatMessage(props) {
  const { text, uid } = props.message;
  return <p>{text}</p>
  // show the actual text by accessing it from the props.message
}

export default App;
