import { initializeApp } from 'firebase/app';
import { getAuth } from '@firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY_FIREBASE,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN_FIREBASE,
	projectId: process.env.REACT_APP_PROJECT_ID_FIREBASE,
	databaseURL: process.env.REACT_APP_DATABASE_URL_FIREBASE,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET_FIREBASE,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_FIREBASE,
	appId: process.env.REACT_APP_APP_ID_FIREBASE,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID_FIREBASE,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
