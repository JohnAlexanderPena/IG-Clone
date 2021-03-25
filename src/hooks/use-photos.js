import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId, getPhotos } from '../services/firebase';

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);

  const {
    user: { uid: userId = '' }
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimeLinePhotos() {
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPhotos = [];

      //Check if user follows people
      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }
    }
    getTimeLinePhotos();
  }, []);
  return { photos };
}
