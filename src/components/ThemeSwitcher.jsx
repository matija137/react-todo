import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { CiSun } from "react-icons/ci";
import { CiCloudMoon } from "react-icons/ci";

const ThemeSwitcher = ({ isDarkTheme, setIsDarkTheme }) => {
  return (
    <Row className="justify-content-center">
      <Col className="col-md-6 text-end">
        {isDarkTheme ? (
          <CiSun
            size="1.5rem"
            onClick={() => {
              setIsDarkTheme(!isDarkTheme);
            }}
            className="my-pointer"
          />
        ) : (
          <CiCloudMoon
            size="1.5rem"
            onClick={() => {
              setIsDarkTheme(!isDarkTheme);
            }}
            className="my-pointer"
          />
        )}
      </Col>
    </Row>
  );
};

export default ThemeSwitcher;
