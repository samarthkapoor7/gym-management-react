import { useEffect, useState } from "react"
import { firestore } from "../firebase";

interface Member {
    id: string;
    name: string;
    email: string;
}

export const AdminDashboard = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [newMemberName, setNewMemberName] = useState('');
    const [newMemberEmail, setNewMemberEmail] = useState('');

    useEffect(() => {
        const unsubscribe = firestore.collection('users').where('role', '==', 'member')
          .onSnapshot(snapshot => {
            const membersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Member));
            setMembers(membersData);
          });
        
        return () => unsubscribe();
    }, []);
}