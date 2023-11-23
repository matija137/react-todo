import React from "react";
import {
  Button,
  Col,
  Form,
  FormCheck,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import { CiTrash } from "react-icons/ci/index.esm";

const TaskList = ({
  taskList,
  changeDone,
  removeTask,
  activeFilter,
  removeAllCompletedTasks,
}) => {
  return (
    <>
      {" "}
      <ListGroup className="mt-3">
        {taskList
          .filter((task) => {
            // only active
            if (activeFilter === 2 && task.completed === false) {
              return true;
            }
            // only finished
            else if (activeFilter === 3 && task.completed === true) {
              return true;
            }
            // all
            else if (activeFilter === 1) {
              return true;
            } else {
              return false;
            }
          })
          .map((task) => (
            <Row className="justify-content-center mt-2" key={task.id}>
              <Col className="col-md-6">
                <ListGroup.Item
                  className={task.completed ? "bg-body-secondary" : null}
                >
                  <InputGroup className="d-flex justify-content-between">
                    <Form.Check type="checkbox">
                      <FormCheck.Input
                        type="checkbox"
                        onChange={(e) => changeDone(task.id)}
                        checked={task.completed}
                      />
                      <FormCheck.Label
                        className={
                          task.completed ? "text-decoration-line-through" : null
                        }
                      >
                        {task.name}
                      </FormCheck.Label>
                    </Form.Check>
                    <CiTrash
                      className="ms-3"
                      size="1.5rem"
                      onClick={(e) => removeTask(task.id)}
                    />
                  </InputGroup>
                </ListGroup.Item>
              </Col>
            </Row>
          ))}
      </ListGroup>
      {activeFilter === 2 ? null : (
        <Row className="justify-content-center mt-2">
          <Col className="col-md-6 d-flex justify-content-end ">
            <Button
              variant="outline-danger"
              onClick={(e) => removeAllCompletedTasks()}
            >
              Clear completed
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default TaskList;
