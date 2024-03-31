import { Container, Paper } from "@mui/material";
import { useEffect, useState } from "react";

export const DisplayStudents = () => {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [students, setStudents] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);
  return (
    <Container>
      <Paper>
        <h1>Students</h1>
        <Paper elevation={3} style={paperStyle}>
          {students.map((student) => (
            <Paper
              elevation={6}
              style={{ margin: "10px", padding: "15px", textAlign: "left" }}
              key={student.id}
            >
              Id:{student.id}
              <br />
              Name:{student.name}
              <br />
              Address:{student.address}
              <br />
            </Paper>
          ))}
        </Paper>
      </Paper>
    </Container>
  );
};
