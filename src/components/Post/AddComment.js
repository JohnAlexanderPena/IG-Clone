import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput
}) {
  const [comment, setComment] = useState('');

  const { firebase, FieldValue } = useContext(FirebaseContext);

  const {
    user: { displayName }
  } = useContext(UserContext);

  const handleSubmitComment = (e) => {
    e.preventDefautl();

    return null;
  };

  return null;
}
