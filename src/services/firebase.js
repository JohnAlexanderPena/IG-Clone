import { firebase, FieldValue } from '../lib/firebase';

export async function doesUserNameExist(username) {
  const result = await firebase
    .firestore() //Go into firebase store
    .collection('users') // Into collection of users in Firestore
    .where('username', '==', username) // Check where username === passed in username
    .get(); //fetch data

  console.log(result);

  //Check if there is any data and return it
  return result.docs.map((user) => user.data().length > 0);
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
  console.log(following);
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
