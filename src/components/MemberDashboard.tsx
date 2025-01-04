import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import { jsPDF } from "jspdf";

interface Receipt {
  date: string;
  amount: number;
}

const MemberDashboard: React.FC = () => {
  const dummyReceipts: Receipt[] = [
    { date: '2023-07-01', amount: 50 },
    { date: '2023-06-01', amount: 50 },
    { date: '2023-05-01', amount: 50 }
  ];

  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFont("helvetica");
    
    doc.setFontSize(22);
    doc.text("ELITE GYM", 105, 20, { align:"center" });
    
    doc.setFontSize(16);
    doc.text("Payment Receipt", 105, 40, { align: "center" });
    
    doc.setFontSize(12);
    doc.text("Member Name: John Doe", 20, 60);
    doc.text("Member ID: EG001", 20, 70);
    doc.text("Payment Date: " + new Date().toLocaleDateString(), 20, 80);
    doc.text("Amount Paid: $50.00", 20, 90);
    doc.text("Payment Method: Credit Card", 20, 100);
    
    doc.setFontSize(10);
    doc.text("Thank you for being a valued member of Elite Gym!", 105, 280, { align: "center" });
    
    doc.save("EliteGym_Receipt.pdf");
  };

  return (
    <Container>
      <div className="glass-panel">
        <Typography variant="h4" style={{ marginBottom: '20px' }}>Member Dashboard</Typography>
        <Typography variant="h5" style={{ margin: '20px 0' }}>Payment History</Typography>
        <List>
          {dummyReceipts.map((receipt, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Date: ${receipt.date}`} secondary={`Amount: $${receipt.amount.toFixed(2)}`} />
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="primary" onClick={generatePDF} className="action-btn">
          Download Latest Receipt
        </Button>
      </div>
    </Container>
  );
}

export default MemberDashboard;

