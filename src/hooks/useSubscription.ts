import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export const useSubscription = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>('free');
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
      if (doc.exists()) {
        setSubscriptionStatus(doc.data().subscriptionStatus || 'free');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { subscriptionStatus, loading };
};
