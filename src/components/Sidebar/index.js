import useUser from '../../hooks/use-user';
import User from './User';
import Suggestions from './Suggestions';
export default function Sidebar() {
  const {
    user: { fullname, username, userId }
  } = useUser();

  console.log(useUser());

  console.log('fullName, username, userId', fullname, username, userId);
  return (
    <div className="p-4">
      <User />
      <Suggestions />
    </div>
  );
}
