import './App.css';
import Layout from './layout/Layout';

import {
  ClerkProvider, SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn
} from '@clerk/clerk-react'


if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (

    <ClerkProvider publishableKey={clerkPubKey}>
      
        <Layout />
     
      
    </ClerkProvider>
  );
}

export default App;
