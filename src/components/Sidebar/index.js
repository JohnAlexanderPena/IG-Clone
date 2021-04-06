// import useUser from '../../hooks/use-user';
import { useContext } from 'react';
import User from './User';
import Suggestions from './Suggestions';
import LoggedInUserContext from '../../context/logged-in-user';
export default function Sidebar() {
  const {
    user: { fullName, username, userId, following, docId }
  } = useContext(LoggedInUserContext);

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
}
