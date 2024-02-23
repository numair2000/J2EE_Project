
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './css/CoachLogin.css';

const CoachLogin = () => {
  const [coachFormData, setcoachFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleCoachChange = (fieldName, value) => {
    setcoachFormData({
      ...coachFormData,
      [fieldName]: value,
    });
  };

  const handleLoginResponse = (response) => {
    console.log('Handle Login Response:', response);
    if (response.data.status) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      navigate('/coachpage');
    } else {
      setError('Invalid email or password');
      alert('Invalid email or password. Please try again.');
    }
  };

  const handleCoachSubmit = async (e) => {
    e.preventDefault();

    if (!coachFormData.email || !coachFormData.password) {
      setError('Please enter both email and password for coach login.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4568/coach/login', coachFormData);
      handleLoginResponse(response);
    } catch (error) {
      console.error('Coach login error:', error);
      setError('An error occurred during Coach login');
    }
  };

  return (
    <div className="coachloginpage">
      <Container>
        <Row>
          <Col lg="12" className="mt-4">
            <h2 className="coach-login-h2">Coach Login</h2>
          </Col>
        </Row>

        <Form onSubmit={handleCoachSubmit}>
          <Row>
            <Col lg="6">
              <Form.Group className="mt-4 coach-login-form-group coach-password-field">
                <Form.Label>Email</Form.Label>
                <Form.Control className="coach-login-form-control"
                  type="email"
                  placeholder="name@example.com"
                  value={coachFormData.email}
                  onChange={(e) => handleCoachChange('email', e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <Form.Group className="mt-4 coach-password-field">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={coachFormData.password}
                  onChange={(e) => handleCoachChange('password', e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg="12" className="mt-4">
              <Button type="submit" className="coach-login-button">Login</Button>
            </Col>
          </Row>
        </Form>

        {error && <p>{error}</p>}
      </Container>
    </div>
  );
};

export default CoachLogin;