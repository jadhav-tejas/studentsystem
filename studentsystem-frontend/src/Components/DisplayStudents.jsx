import { Container, Paper } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

export const DisplayStudents = () => {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [students, setStudents] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedAddress, setUpdatedAddress] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);
  const handleUpdateClick = (student) => {
    setSelectedStudent(student);
    setIsUpdateModalOpen(true);
    setUpdatedName(student.name);
    setUpdatedAddress(student.address);
  };

  const handleCloseUpdateModal = () => {
    setSelectedStudent(null);
    setIsUpdateModalOpen(false);
  };

  const updateStudent = (student) => {
    // Implement update functionality here
    // You can send a PUT request to your Spring Boot backend to update the student
    fetch(`http://localhost:8080/student/${student.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Student updated successfully");
          // Update the state or fetch students again to reflect the changes
        } else {
          console.error("Failed to update student");
        }
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      });
  };
  const handleUpdate = () => {
    const updatedStudent = {
      ...selectedStudent,
      name: updatedName,
      address: updatedAddress,
    };
    updateStudent(updatedStudent);
    // Update the student in the state or fetch students again to reflect the changes
    setIsUpdateModalOpen(false);
  };

  const handleDelete = (id) => {
    // Implement delete functionality here
    // You can send a DELETE request to your Spring Boot backend to delete the student
    fetch(`http://localhost:8080/student/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Student deleted successfully");
          // Update the state or fetch students again to reflect the changes
        } else {
          console.error("Failed to delete student");
        }
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };
  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1>Students</h1>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Actions</TableCell> {/* Added Actions column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleUpdateClick(student)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Modal open={isUpdateModalOpen} onClose={handleCloseUpdateModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <h2>Update Student</h2>
          <TextField
            label="Name"
            fullWidth
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <TextField
            label="Address"
            fullWidth
            value={updatedAddress}
            onChange={(e) => setUpdatedAddress(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="contained" onClick={handleCloseUpdateModal}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};
