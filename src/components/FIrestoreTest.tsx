import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const FirestoreTest: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(documents);
        console.log("Firestore data fetched successfully:", documents);
      } catch (err) {
        console.error("Error fetching Firestore data:", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Firestore Data:</h2>
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map(item => (
            <li key={item.id}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FirestoreTest;
