// import Skeleton from 'react-loading-skeleton';
// import usePhotos from '../hooks/use-photos';
// import Post from './Post';
// export default function Timeline() {
//   const { photos } = usePhotos();

//   return (
//     <div className="container col-span-2">
//       {!photos ? (
//         <Skeleton count={4} width={640} height={500} className="mb-5" />
//       ) : photos?.length > 0 ? (
//         photos.map((content) => (
//           <Post key={content.docId} content={content}></Post>
//         ))
//       ) : (
//         <p className="text-center text-2xl">
//           Follow people to see what they're doing
//         </p>
//       )}
//     </div>
//   );
// }

import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import LoggedInUserContext from '../context/user';
import usePhotos from '../hooks/use-photos';
import Post from './Post';

export default function Timeline() {
  const { user } = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);

  console.log(user);
  return (
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : (
        photos.map((content) => <Post key={content.docId} content={content} />)
      )}
    </div>
  );
}
