import PropTypes from 'prop-types';
import Header from './Header';
import { useReducer, useEffect } from 'react';
import {
  getUserPhotosByUserName
  //   getUserByUsername
} from '../../services/firebase';

const reducer = (state, newState) => ({ ...state, ...newState });

const initialState = {
  profile: {},
  photosCollection: [],
  followerCount: 0
};

export default function Profile({ user }) {
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      //   const [userDetails] = await getUserByUsername(user.username);
      const photos = await getUserPhotosByUserName(user.username);

      console.log(photos);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length
      });
    }

    if (user) {
      getProfileInfoAndPhotos();
    }
  }, [user.username]);

  return (
    <>
      <Header />
      <p>Hello {user.username}</p>
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullname: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired
};
