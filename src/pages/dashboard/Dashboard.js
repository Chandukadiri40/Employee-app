import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Fixing the URL and using .json() to parse the response body
        const response = await fetch("http://localhost:8080/api/employees");
        const data = await response.json(); // Corrected here

        setEmployees(data);
      } catch (error) {
        console.log("Error fetching employees:", error.message);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete=async(EmployeeID)=>{
    try{
    const response=await fetch(`http://localhost:8080/api/employee/${EmployeeID}`,{
    method:"Delete",
  });
  if(response.ok){
    setEmployees((prevEmployees)=>{
      prevEmployees.filter((employee)=>employee.id !==EmployeeID)
    })
  }
  console.log(`Employee with ID ${EmployeeID} deleted successfully`);
}catch(error){
  console.log("Error deleting Employee:",error.message);
}
  }
  const handleUpdate=(employeesId)=>{
    navigate(`employee/${employeesId}`);
  }
  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col>
            <h1 className="center-text">Employees</h1>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.department}</td>
                    <td>
                      <Button variant="outline-secondary" onClick={()=>handleUpdate(employee.id)}>Update</Button>{" "}
                      <Button variant="outline-danger" onClick={()=>handleDelete(employee.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
