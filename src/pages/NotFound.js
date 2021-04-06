import React, { useEffect } from 'react';
import Header from '../components/Header';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found!';
  }, []);
  return (
    <div className="text-center bg-gray-background">
      <Header />
      <div className="mx-auth max-w-screen-lg">
        <p className="text-center text-2xl">Not Found!</p>
      </div>
    </div>
  );
}
