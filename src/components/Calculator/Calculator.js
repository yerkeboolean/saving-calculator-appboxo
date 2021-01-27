import React from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Calculator.module.css";
import { Card, Button, Form, InputGroup, FormControl } from "react-bootstrap";
import {
  methodSwitch,
  handleAmount,
  addOneMonth,
  subtractOneMonth,
} from "../../store/calculator";

const Calculator = () => {
  const dispatch = useDispatch();
  const { calculator } = useSelector((state) => state);

  return (
    <div className={classes.Calculator}>
      <div className={classes.heading}>Saving calculator</div>
      <Form>
        <Form.Check
          type="switch"
          id="custom-switch"
          className={classes.formItem}
          label={
            calculator.isByAmount
              ? "Calculate by total amount"
              : "Calculate by monthly saving"
          }
          initialValue={calculator.isByAmount}
          onChange={() => {
            dispatch(methodSwitch());
          }}
        />
        <label className={classes.label}>
          {calculator.isByAmount ? "Total amount" : "Monthly amount"}
        </label>
        <InputGroup className="mb-3">
          <InputGroup.Prepend className={classes.prepend}>
            <InputGroup.Text id="amount">$</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={calculator.amount && calculator.amount}
            aria-label="Amount (to the nearest dollar)"
            className={classes.inputAmount}
            onChange={(e) => {
              dispatch(handleAmount(e));
            }}
          />
        </InputGroup>
        <label className={classes.label}>
          {calculator.isByAmount ? "Reach goal by" : "Save until"}
        </label>
        <InputGroup className="mb-6">
          <InputGroup.Prepend
            className={classes.prepend}
            onClick={() => dispatch(subtractOneMonth())}
          >
            <InputGroup.Text>&#60;</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={calculator.finishDate}
            aria-label="Amount (to the nearest dollar)"
            className={classes.inputDate}
          />
          <InputGroup.Append
            className={classes.append}
            onClick={() => dispatch(addOneMonth())}
          >
            <InputGroup.Text>&#62;</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        <Card className={classes.card}>
          <Card.Body className={classes.cardBody}>
            <div className={classes.cardHeading}>
              {calculator.isByAmount ? "Total amount" : "Monthly amount"}
            </div>
            <div className={classes.cardSum}>
              {parseFloat(calculator.total).toLocaleString("en", {
                style: "currency",
                currency: "USD",
              })}
            </div>
          </Card.Body>
          <Card.Footer className={classes.footer}>
            {calculator.isByAmount ? (
              <>
                You are planning <b>{calculator.months} monthly </b> deposits to
                reach your
                <b>
                  {" "}
                  {calculator.amount
                    ? parseFloat(calculator.amount).toLocaleString("en", {
                        style: "currency",
                        currency: "USD",
                      })
                    : "$0"}
                </b>{" "}
                goal by <b>{calculator.finishDate}</b>.
              </>
            ) : (
              <>
                You are saving
                <b>
                  {" "}
                  {calculator.amount
                    ? parseFloat(calculator.amount).toLocaleString("en", {
                        style: "currency",
                        currency: "USD",
                      })
                    : "$0"}
                </b>{" "}
                monthly to save
                <b>
                  {" "}
                  {calculator.amount
                    ? parseFloat(calculator.amount).toLocaleString("en", {
                        style: "currency",
                        currency: "USD",
                      })
                    : "$0"}
                </b>{" "}
                by <b>{calculator.finishDate}</b>.
              </>
            )}
          </Card.Footer>
        </Card>
        <Button variant="primary" size="lg" block className={classes.button}>
          Finish
        </Button>
      </Form>
    </div>
  );
};

export default Calculator;
