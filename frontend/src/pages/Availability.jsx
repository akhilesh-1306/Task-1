import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Badge } from 'react-bootstrap';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';
import {Link} from "react-router-dom"

const UserAvailabilityDisplay = () => {
  const [availabilities, setAvailabilities] = useState([]);

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  const fetchAvailabilities = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('/api/get-availabilities', {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch availabilities');
      }

      const data = await response.json();
      setAvailabilities(data.availabilities);
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching availabilities:', error);
      // setError('Failed to load availabilities. Please try again later.');
      // setLoading(false);
    }
  };

  const getRandomColor = () => {
    const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">Availability Scheduler</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              &nbsp;
              <Link to="/landing" >
                <Button variant="outline-light">Back</Button>
            </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    <Container className="my-4">
        
      <h2 className="text-center mb-4">Your Availability Schedule</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {availabilities.map((availability) => (
          <Col key={availability.id}>
            <Card className="h-100 shadow-sm hover-shadow">
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <span>{format(parseISO(availability.date), 'EEEE')}</span>
                  <Badge bg={getRandomColor()}>
                    {format(parseISO(availability.date), 'MMM d, yyyy')}
                  </Badge>
                </Card.Title>
                <Card.Text className="mt-3">
                  <i className="bi bi-clock me-2"></i>
                  {availability.startTime} - {availability.endTime}
                </Card.Text>
                <div className="mt-3 text-center">
                  <div className="progress" style={{ height: '5px' }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: '100%' }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <small className="text-muted">
                    {Math.round(
                      (parseFloat(availability.endTime) - parseFloat(availability.startTime)) * 60
                    )}{' '}
                    minutes available
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
};

export default UserAvailabilityDisplay;