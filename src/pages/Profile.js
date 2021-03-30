import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';

export default function Profile() {
  const { username } = useParams();
  const history = useHistory();

  //   console.log(username);
  const [user, setUser] = useState(null);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);

      if (user.length > 0) {
        setUser(user[0]);
        setUserExists(true);
      } else {
        setUserExists(false);
        history.push(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
    console.log('user', user);
  }, [username, history]);
  return userExists ? (
    <div className="bg-gray-background">
      <div className="mx-auto max-w-screen-lg">{user.fullName}</div>
    </div>
  ) : null;
}
