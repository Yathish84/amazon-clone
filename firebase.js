import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyD2M38zb4k5fWoNLyxlaY4w4We55bngZwU",
    authDomain: "amzn-clone-c7457.firebaseapp.com",
    projectId: "amzn-clone-c7457",
    storageBucket: "amzn-clone-c7457.appspot.com",
    messagingSenderId: "411953528602",
    appId: "1:411953528602:web:b6bcf71adf80352ead36a3"
  };    

  const app =!firebase.apps.length ? firebase.initializeApp(firebaseConfig)
  :firebase.app()
  const db = app.firestore();
  export default db;