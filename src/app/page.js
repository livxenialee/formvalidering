"use client";

import Head from "next/head";
import styles from "./page.module.css";
import { Form, useForm } from "react-hook-form";
import { Container, Row, Col, FormGroup, FormText } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Home() {

  const schema = yup.object().shape({
    firstName: yup
    .string()
    .required("Skriv dit navn"),

    age: yup
    .number("Skal være et nummer")
    .typeError("Det skal være et nummer")
    // .required("Skal udfyldes")
    .positive()
    .integer()
    .min(18, "Du skal være over 18")
    .max(99, "Du skal være under 99"),
  }) 
  
  const { 
    register, 
    handleSubmit, 
    formState: {errors} 
  } = useForm({
    resolver: yupResolver(schema),
  });
  
  const onSubmit = (data) => console.log(data);



  return (

    <div className={styles.formContainer}>

      <form onSubmit={handleSubmit(onSubmit)}>

        <Row className="mb-3">
          <FormGroup>
            <Col>
            <label>Fornavn</label>
            </Col>
            <Col>
            <input id="firstName" type="text" className="form-control" {...register("firstName")}></input>
            <FormText color="muted">
              {errors.firstName?.message}
            </FormText>
            </Col>
          </FormGroup>
        </Row>

        <Row className="mb-3">
          <FormGroup>
            <Col>
            <label>Alder</label>
            </Col>
            <Col>
            <input id="age" type="number" className="form-control" {...register("age")}></input>
            <FormText color="muted">
              {errors.age?.message}
            </FormText>
            </Col>
          </FormGroup>
        </Row>

        <Row>
          <FormGroup>
            <Col>
            <button className="float-end btn btn-secondary">Submit</button>
            </Col>
          </FormGroup>
        </Row>

        {/* <label>FirstName</label>
        <input id="firstName" type="text"></input>

        <label>Age</label>
        <input id="age" type="number"></input>

        <button>Submit</button> */}

      </form>

    </div>

  );
}
