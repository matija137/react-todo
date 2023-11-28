import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  InputGroup,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import TaskList from "../components/TaskList";

const TaskForm = () => {
  const [inputTaskName, setInputTaskName] = useState("");
  // 1 - all, 2 - active, 3 - completed
  const [activeFilter, setActiveFilter] = useState(1);
  // id (UUID), name (string), done(boolean)
  const [taskList, setTaskList] = useState(() => {
    const localTaskList = localStorage.getItem("taskList");
    if (localTaskList === null) return [];
    return JSON.parse(localTaskList);
  });

  // message states
  const [showToolTip, setShowToolTip] = useState([false, ""]);

  // messages
  const newTaskCompletedViewMsg =
    "It's not possible to add new tasks in Completed view.";
  const newTaskZeroCharMsg = "Task should have at least one character.";

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  function handleSubmit(event) {
    event.preventDefault();

    if (inputTaskName.length > 0 && activeFilter !== 3) {
      setTaskList([
        ...taskList,
        { id: crypto.randomUUID(), name: inputTaskName, completed: false },
      ]);
      setInputTaskName("");
    } else if (activeFilter === 3) {
      setShowToolTip([true, newTaskCompletedViewMsg]);

      setTimeout(() => {
        setShowToolTip([false, ""]);
      }, 3000);
    } else {
      setShowToolTip([true, newTaskZeroCharMsg]);

      setTimeout(() => {
        setShowToolTip([false, ""]);
      }, 3000);
    }
  }

  function changeDone(id) {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTaskList(updatedTaskList);
  }

  function removeTask(id) {
    const newTaskList = taskList.filter((task) => task.id !== id);

    setTaskList(newTaskList);
  }

  function removeAllCompletedTasks() {
    const newTaskList = taskList.filter((task) => task.completed !== true);

    setTaskList(newTaskList);
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {showToolTip[1]}
    </Tooltip>
  );

  return (
    <>
      <h1 className="text-center">My tasks</h1>
      <Row className="text-center mt-3">
        <Col>
          <Button
            variant="outline-secondary"
            className="me-3"
            active={activeFilter == 1 ? true : false}
            onClick={() => setActiveFilter(1)}
          >
            All
          </Button>
          <Button
            variant="outline-secondary"
            className="me-3"
            active={activeFilter == 2 ? true : false}
            onClick={() => setActiveFilter(2)}
          >
            Active
          </Button>
          <Button
            variant="outline-secondary"
            active={activeFilter == 3 ? true : false}
            onClick={() => setActiveFilter(3)}
          >
            Completed
          </Button>
        </Col>
      </Row>

      <Form onSubmit={handleSubmit} className="mt-3">
        <Row className="justify-content-center">
          <Col className="col-md-6">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Add todo"
                onChange={(e) => {
                  setInputTaskName(e.target.value);
                }}
                value={inputTaskName}
              />
              <OverlayTrigger
                placement="top"
                // delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
                show={showToolTip[0]}
              >
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </OverlayTrigger>
            </InputGroup>
          </Col>
        </Row>
      </Form>

      <TaskList
        taskList={taskList}
        changeDone={changeDone}
        removeTask={removeTask}
        activeFilter={activeFilter}
        removeAllCompletedTasks={removeAllCompletedTasks}
      />
    </>
  );
};

export default TaskForm;
