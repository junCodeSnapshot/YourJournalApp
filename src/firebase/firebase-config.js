import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {GoogleAuthProvider} from 'firebase/auth'
import 'firebase/firestore'


const firebaseConfigTesting = {
  apiKey: process.env.REACT_APP_api_Key_TEST,
  authDomain: process.env.REACT_APP_authDomain_TEST,
  projectId: process.env.REACT_APP_project_id_TEST,
  storageBucket: process.env.REACT_APP_storage_bucket_TEST,
  messagingSenderId: process.env.REACT_APP_messaging_Sender_Id_TEST,
  appId: process.env.REACT_APP_app_Id_TEST,
};

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey_DEV,
  authDomain: process.env.REACT_APP_authDomain_DEV,
  projectId: process.env.REACT_APP_projectId_DEV,
  storageBucket: process.env.REACT_APP_storageBucket_DEV,
  messagingSenderId: process.env.REACT_APP_messagingSenderId_DEV,
  appId: process.env.REACT_APP_appId_DEV,
  measurementId: process.env.REACT_APP_measurementId_DEV,
};


if(process.env.NODE_ENV === 'test'){

  initializeApp(firebaseConfigTesting)

}else{
  //dev/prod
  initializeApp(firebaseConfig);
  
}


const db = getFirestore()
const googleAuthProvider = new GoogleAuthProvider()

export{
    db,
    googleAuthProvider,
}