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
