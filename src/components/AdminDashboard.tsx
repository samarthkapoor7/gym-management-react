import React, { useEffect, useState } from "react";
import { Button, Container, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { collection, query, where, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust the path to your `firebaseConfig` file

interface Member {
    id: string;
    name: string;
    email: string;
}

const AdminDashboard = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [newMemberName, setNewMemberName] = useState("");
    const [newMemberEmail, setNewMemberEmail] = useState("");

    useEffect(() => {
        const membersQuery = query(collection(db, "users"), where("role", "==", "member"));
        const unsubscribe = onSnapshot(membersQuery, (snapshot) => {
            const membersData = snapshot.docs.map(
                (doc) => ({ id: doc.id, ...doc.data() } as Member)
            );
            setMembers(membersData);
        });

        return () => unsubscribe();
    }, []);

    const handleAddMember = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "users"), {
                name: newMemberName,
                email: newMemberEmail,
                role: "member",
            });
            setNewMemberName("");
            setNewMemberEmail("");
        } catch (error) {
            console.log("Error adding member: ", error);
        }
    };

    return (
        <Container>
            <div className="glass-panel">
                <Typography variant="h4" style={{ marginBottom: "20px" }}>
                    Admin Dashboard
                </Typography>
                <form onSubmit={handleAddMember}>
                    <div className="form-group">
                        <TextField
                            label="Member Name"
                            value={newMemberName}
                            onChange={(e) => setNewMemberName(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <div className="line-decoration"></div>
                    </div>
                    <div className="form-group">
                        <TextField
                            label="Member Email"
                            value={newMemberEmail}
                            onChange={(e) => setNewMemberEmail(e.target.value)}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <div className="line-decoration"></div>
                    </div>
                    <Button type="submit" variant="contained" color="primary" className="action-btn">
                        Add Member
                    </Button>
                </form>
                <Typography variant="h5" style={{ margin: "20px 0" }}>
                    Members List
                </Typography>
                <List>
                    {members.map((member) => (
                        <ListItem key={member.id}>
                            <ListItemText primary={member.name} secondary={member.email} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </Container>
    );
};

export default AdminDashboard;
