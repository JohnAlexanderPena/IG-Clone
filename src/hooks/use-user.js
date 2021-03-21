// Pull information from firebase

import { useEffect, useContext, useState } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});

  //Pull in user from context
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjByUserId() {
      //Call function from firebase services lib based on UserID and get Data

      //Destructure response array
      const [response] = await getUserByUserId(user.uid);

      setActiveUser(response);
    }

    //If user ID is found
    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return { user: activeUser };
}
