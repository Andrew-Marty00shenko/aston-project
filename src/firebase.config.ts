import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAy8WEFZE6H6CKcnjExr4HyeR0GEMcixEo',
	authDomain: 'aston-project-3f458.firebaseapp.com',
	projectId: 'aston-project-3f458',
	storageBucket: 'aston-project-3f458.appspot.com',
	messagingSenderId: '454305746303',
	appId: '1:454305746303:web:28fde8c0c8671855dd1e4a',
	measurementId: 'G-B5BS293F2R',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
