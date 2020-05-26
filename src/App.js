import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Card, Row, Col } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState(null);
  const [timer, setTimer] = useState({});

  const handleCountDown = (date) => {
    let eventDate = new Date(date);
    let today = Date.now();
    let timespan = eventDate - today;
    if (timespan > 0) {
      setTimer(calculateTime(timespan));
    }
  };

  useEffect(() => {
    setInterval(() => {
      handleCountDown(selectedDate);
    }, 1000);
  });

  const calculateTime = (milliSeconds) => {
    let time = {
      days: Math.floor(milliSeconds / (1000 * 60 * 60 * 24)),
      hours: Math.floor((milliSeconds / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((milliSeconds / (1000 * 60)) % 60),
      seconds: Math.floor((milliSeconds / 1000) % 60),
    };
    return time;
  };

  return (
    <div className="row my-5 py-5">
      <div className="col-md-8 mx-auto">
        <Card className="text-center shadow">
          <Card.Header>
            <h3>Event Countdown</h3>
          </Card.Header>
          <Card.Body>
            <Form>
              <Row className="mx-auto">
                <Col sm="12" className="my-1" lg="6">
                  <Form.Control
                    name="EventName"
                    onChange={(event) => {
                      setEventName(event.target.value);
                    }}
                    placeholder="Enter Event Name"
                  />
                </Col>
                <Col sm="12" className="my-1" lg="6">
                  <ReactDatePicker
                    placeholderText="Select Event Date"
                    className="form-control"
                    name="EventDate"
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                    }}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                  />
                </Col>
              </Row>
            </Form>
            <hr />
            <Card.Title>
              <h2>{eventName}</h2>
            </Card.Title>
            <Card.Text>
              Days: {timer.days}, Hours: {timer.hours}, Minutes: {timer.minutes}
              , Seconds: {timer.seconds}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="blockquote-footer">
            Chetan Bhogade
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default App;
