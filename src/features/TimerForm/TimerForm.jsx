import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

function TimerForm(props) {
  const {
    hours,
    minutes,
    seconds,
    handleHoursChange,
    handleMinutesChange,
    handleSecondsChange,
    toggleTimer,
    isWorking,
    isPaused,
    handlePause,
  } = props;
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) return setValidated(true);

    if (form.checkValidity() === true) {
      setValidated(false);
      toggleTimer();
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="timerMinutes">
        <Form.Label>Количество часов</Form.Label>
        <Form.Control
          min={0}
          pattern="\d+"
          onChange={handleHoursChange}
          value={hours}
          type="number"
          placeholder="Введите количество часов"
        />
        <Form.Control.Feedback type="invalid">
          Часы не могут быть отрицательными, только целые числа
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="timerMinutes">
        <Form.Label>Количество минут</Form.Label>
        <Form.Control
          min={0}
          max={59}
          pattern="\d{1,2}"
          onChange={handleMinutesChange}
          value={minutes}
          type="number"
          placeholder="Введите количество минут"
        />
        <Form.Control.Feedback type="invalid">
          Минуты не могут быть отрицательными, только целые числа, от 0 до 59
          максимум
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="timerSeconds">
        <Form.Label>Количество секунд</Form.Label>
        <Form.Control
          min={0}
          max={59}
          pattern="\d{1,2}"
          onChange={handleSecondsChange}
          value={seconds}
          type="number"
          placeholder="Введите количество секунд"
        />
        <Form.Control.Feedback type="invalid">
          Секунды не могут быть отрицательными, только целые числа, от 0 до 59
          максимум
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        {isWorking ? "Сброс" : "Старт"}
      </Button>{" "}
      {isWorking && (
        <Button onClick={handlePause} variant="warning">
          {isPaused ? "Продолжить" : "Пауза"}
        </Button>
      )}
    </Form>
  );
}

TimerForm.propTypes = {
  hours: PropTypes.string,
  minutes: PropTypes.string,
  seconds: PropTypes.string,
  handleHoursChange: PropTypes.func,
  handleMinutesChange: PropTypes.func,
  handleSecondsChange: PropTypes.func,
  toggleTimer: PropTypes.func,
  isWorking: PropTypes.bool,
  isPaused: PropTypes.bool,
  handlePause: PropTypes.func,
};

export default TimerForm;
