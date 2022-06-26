const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  firebaseConfig: {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.AUTH_DOMAIN,
    projectId: import.meta.env.PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.MEASUREMENT_ID
  }
}

export default CONFIG
