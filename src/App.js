import { Fragment } from "react";
import Chat from "./components/Chat";
import SignIn from "./components/SignIn";
import { auth } from "./store/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';


function App() {
  const [user] = useAuthState(auth)

  return (
    <Fragment>
      {user ? <Chat /> : <SignIn/>}
    </Fragment>
  );
}

export default App;
