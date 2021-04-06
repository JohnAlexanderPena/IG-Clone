import { firebase, FieldValue } from '../lib/firebase';

export async function doesUserNameExist(username) {
  const result = await firebase
    .firestore() //Go into firebase store
    .collection('users') // Into collection of users in Firestore
    .where('username', '==', username) // Check where username === passed in username
    .get(); //fetch data

  //Check if there is any data and return it
  return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUsername(username) {
  const result = await firebase
    .firestore() //Go into firebase store
    .collection('users') // Into collection of users in Firestore
    .where('username', '==', username) // Check where username === passed in username
    .get(); //fetch data

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

export async function getUserByUserId(userId) {
  const results = await firebase
    .firestore() //Go into firebase store
    .collection('users') // Into collection of users in Firestore
    .where('userId', '==', userId) // Check where userId === passed in userId
    .get(); //fetch data

  const user = results.docs.map((item) => ({
    ...item.data(), //Spread users information since we are mapping
    docId: item.id //For future use
  }));

  //Return matching user

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const results = await firebase
    .firestore() //Go into firebase store
    .collection('users') // Into collection of users in Firestore
    .limit(10)
    .get(); //fetch data

  return results.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId) //Don't show profiles we are already following
    );
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId, //Currently Logged in userId
  profileId, //user that we will request to follow
  isFollowingProfile // true/false am I currently following this person
) {
  return firebase
    .firestore() //Go into firebase store
    .collection('users') // Into collection of users in Firestore
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId)
    });
}

export async function updateFollowedUserFollowers(
  suggestedProfileDocId,
  loggedInUserDocId,
  isFollowingProfile
) {
  return firebase
    .firestore() //Go into firebase store
    .collection('users') // Into collection of users in Firestore
    .doc(suggestedProfileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId)
    });
}

//getPhotos

export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .get();

  const userFollowedPhotots = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotots.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      //photo.userId = 2
      const user = await getUserByUserId(photo.userId); // Gets users photos
      const { username } = user[0];

      return { username, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
}

// export async function getUserIdByUsername(username){
// }
export async function getUserPhotosByUserName(username) {
  const [user] = await getUserByUsername(username);

  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', user.userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
}

export async function isUserFollowingProfile(
  loggedInUserUsername,
  profileUserId
) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername) // Active logged in user
    .where('following', 'array-contains', profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  console.log(response.userId);
  return response.userId;
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  //Update the users following data
  await updateLoggedInUserFollowing(
    activeUserDocId, //Current User Doc ID
    profileUserId, // User we want to follow
    isFollowingProfile //Is the user following the profile?
  );

  await updateFollowedUserFollowers(
    profileDocId, //Current user ID
    followingUserId, // User we are following ID
    isFollowingProfile //Is current user following user
  );
}
