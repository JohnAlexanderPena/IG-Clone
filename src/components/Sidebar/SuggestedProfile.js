import PropTypes from 'prop-types';

export default function SuggestedProfile({
  username,
  userDocId,
  profileId,
  userId
}) {
  return <p>I am a siggested profile of {username} </p>;
}

SuggestedProfile.propTypes = {
  username: PropTypes.string.isRequired,
  userDocId: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
};
