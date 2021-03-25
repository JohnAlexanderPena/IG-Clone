import useUser from '../../hooks/use-user';
import User from './User';
import Suggestions from './Suggestions';
export default function Sidebar() {
  const {
    user: { fullName, username, userId, following, docId }
  } = useUser();

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
