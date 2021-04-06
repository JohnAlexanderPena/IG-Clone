// Pull information from firebase

import { useEffect, useState } from 'react';
import { getUserByUserId } from '../services/firebase';

export default function useUser(userId) {
  const [activeUser, setActiveUser] = useState({});

  //Pull in user from context

  useEffect(() => {
    async function getUserObjByUserId() {
      //Destructure response array
      const [user] = await getUserByUserId(userId);

      setActiveUser(user || {});
    }

    //If user ID is found
    if (userId) {
      getUserObjByUserId(userId);
    }
  }, [userId]);

  return { user: activeUser };
}
