import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Badge, Modal, Form, Button } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';
import { Link } from "react-router-dom";

const UserAvailabilityDisplay = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAvailability, setEditingAvailability] = useState({});

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  const fetchAvailabilities = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = "http://localhost:8080/avail/get-availabilities";
      const response = await fetch(url, {
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
    } catch (error) {
      console.error('Error fetching availabilities:', error);
    }
  };

  const handleEdit = (availability) => {
    console.log(availability);
    setEditingAvailability(availability);
    setShowEditModal(true);
  };

  const handleDelete = async (availabilityToDelete) => {
    if (window.confirm("Are you sure you want to delete this availability?")) {
      try {
        const token = localStorage.getItem("token");
        const url = `http://localhost:8080/avail/delete-availability/${availabilityToDelete.id}`;
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(editingAvailability)
        });

        if (!response.ok) {
          throw new Error('Failed to delete availability');
        }

        setAvailabilities(availabilities.filter(a => a.id !== availabilityToDelete.id));
      } catch (error) {
        console.error('Error deleting availability:', error);
      }
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    console.log(editingAvailability._id);
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:8080/avail/update-availability/${editingAvailability._id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingAvailability)
      });

      if (!response.ok) {
        throw new Error('Failed to update availability');
      }

      setAvailabilities(availabilities.map(a => 
        a.id === editingAvailability.id ? editingAvailability : a
      ));
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating availability:', error);
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
              <Link to="/landing">
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
            <Col key={availability._id}>
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
                  <div className="mt-3 d-flex justify-content-between">
                    <Button variant="outline-primary" size="sm" onClick={() => handleEdit(availability)}>
                      Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(availability)}>
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Availability</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveEdit}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={editingAvailability?.date}
                onChange={(e) => setEditingAvailability({...editingAvailability, date: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                value={editingAvailability?.startTime}
                onChange={(e) => setEditingAvailability({...editingAvailability, startTime: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                value={editingAvailability?.endTime}
                onChange={(e) => setEditingAvailability({...editingAvailability, endTime: e.target.value})}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserAvailabilityDisplay;







// import React, { useState, useEffect } from 'react';
// import { Container, Card, Row, Col, Badge, Modal, Form, Button } from 'react-bootstrap';
// import { Navbar, Nav } from 'react-bootstrap';
// import { format, parseISO } from 'date-fns';
// import { Link } from "react-router-dom";

// const UserAvailabilityDisplay = () => {
//   const [availabilities, setAvailabilities] = useState([]);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editingAvailability, setEditingAvailability] = useState({});

//   useEffect(() => {
//     fetchAvailabilities();
//   }, []);

//   const fetchAvailabilities = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const url = "http://localhost:8080/avail/get-availabilities";
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Authorization': token,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch availabilities');
//       }

//       const data = await response.json();
//       setAvailabilities(data.availabilities);
//     } catch (error) {
//       console.error('Error fetching availabilities:', error);
//     }
//   };

//   const handleEdit = (availability) => {
//     console.log(availability);
//     setEditingAvailability(availability);
//     setShowEditModal(true);
//   };

//   const handleDelete = async (availabilityToDelete) => {
//     if (window.confirm("Are you sure you want to delete this availability?")) {
//       try {
//         const token = localStorage.getItem("token");
//         const url = `http://localhost:8080/avail/delete-availability/${availabilityToDelete._id}`;
//         const response = await fetch(url, {
//           method: 'DELETE',
//           headers: {
//             'Authorization': token,
//             'Content-Type': 'application/json'
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Failed to delete availability');
//         }

//         setAvailabilities(availabilities.filter(a => a._id !== availabilityToDelete._id));
//       } catch (error) {
//         console.error('Error deleting availability:', error);
//       }
//     }
//   };

//   const handleSaveEdit = async (e) => {
//     e.preventDefault();
//     console.log(editingAvailability._id);
//     try {
//       const token = localStorage.getItem("token");
//       const url = `http://localhost:8080/avail/update-availability/${editingAvailability._id}`;
//       const response = await fetch(url, {
//         method: 'PUT',
//         headers: {
//           'Authorization': token,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(editingAvailability)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update availability');
//       }

//       setAvailabilities(availabilities.map(a => 
//         a._id === editingAvailability._id ? editingAvailability : a
//       ));
//       setShowEditModal(false);
//     } catch (error) {
//       console.error('Error updating availability:', error);
//     }
//   };

//   const getRandomColor = () => {
//     const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
//     return colors[Math.floor(Math.random() * colors.length)];
//   };

//   return (
//     <>
//       {/* Navbar code remains the same */}
//       <Container className="my-4">
//         <h2 className="text-center mb-4">Your Availability Schedule</h2>
//         <Row xs={1} md={2} lg={3} className="g-4">
//           {availabilities.map((availability) => (
//             <Col key={availability._id}>
//               <Card className="h-100 shadow-sm hover-shadow">
//                 <Card.Body>
//                   {/* Card content remains the same */}
//                   <div className="mt-3 d-flex justify-content-between">
//                     <Button variant="outline-primary" size="sm" onClick={() => handleEdit(availability)}>
//                       Edit
//                     </Button>
//                     <Button variant="outline-danger" size="sm" onClick={() => handleDelete(availability)}>
//                       Delete
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>

//       {/* Modal code remains the same */}
//     </>
//   );
// };

// export default UserAvailabilityDisplay;