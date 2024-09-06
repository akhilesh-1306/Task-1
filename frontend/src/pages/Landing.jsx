import React, { useState,useEffect } from 'react';
import { Navbar, Container, Nav, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import  {Link} from "react-router-dom";

const Landing = () => {
  const [availability, setAvailability] = useState({
    date: '',
    startTime: '',
    endTime: ''
  });

  const navigate = useNavigate();

  const [loggedInUser,setLoggedInUser] = useState('');
  useEffect(()=>{
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    // handleSuccess(`Welcome ${loggedInUser}`);
  },[])

  const handleInputChange = (e) => {    
    const { name, value } = e.target;
    setAvailability(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {date,startTime,endTime} = availability;

    try {
      const token = localStorage.getItem("token");
      const url = "http://localhost:8080/avail/add-availability"
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          startTime,
          endTime,
          token  // Send the token as part of the request body
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to add availability');
      }
  
      const data = await response.json();
      console.log(data);
      const {success,message,error} = data;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate("/availability")
        },1000)
      }
      else if(error){
        handleError(error);
      }
      console.log(data.message);
    } 
    catch (error) {

      console.error('Error adding availability:', error);
    }
    console.log('Availability submitted:', availability);
    setAvailability({ date: '', startTime: '', endTime: '' });
  };

  const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      handleSuccess("Logged out");
    setTimeout(()=>{
        navigate("/login");
    },1000)
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">Availability Scheduler</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
              &nbsp;
              <Link to="/availability" >
                <Button variant="outline-light">Availabilities</Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="flex-grow-1">
        <Card className="shadow-sm my-5 p-5">
          <Card.Body>
            <h2 className="text-center mb-4">Set Your Availability</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={availability.date}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="time"
                  name="startTime"
                  value={availability.startTime}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  type="time"
                  name="endTime"
                  value={availability.endTime}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit" size="lg">
                  Submit Availability
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
        <ToastContainer/>
      </Container>
    

      <footer className="mt-auto py-3 bg-light">
        <Container className="text-center">
          <span className="text-muted">© 2024 Availability Scheduler</span>
        </Container>
      </footer>
    </div>
  );
};

export default Landing;




