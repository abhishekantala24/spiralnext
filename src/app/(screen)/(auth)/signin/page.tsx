'use client'
'use client'
import { AxiosBasicCredentials } from "axios";
import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import * as yup from "yup"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useFormik } from "formik"
import { useRouter } from 'next/navigation'
import Logo from "@/assets/img/cropped-final-logo-footer.png"

import TextInput from "@/component/TextInput/TextInput";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { createAccountAction } from "@/redux/auth/middleware";
import { authSelector } from "@/redux/auth/authSlice";
import { ToastOptions, toast } from "react-toastify";


const initialFormData: any = {
  email: "",
  password: "",
  username: "",
}

const SignInPage = () => {
  const [passwordToggle, setPasswordToggle] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter();

  const loginCustomerIdValidation = () =>
    yup.object().shape({
      password: yup
        .string()
        .required("Please Enter Password"),
      email: yup
        .string()
        .required("Please Enter email"),
      username: yup
        .string()
        .required("Please Enter username"),
    })

  const { handleChange, handleSubmit, handleBlur, values, touched, errors } = useFormik({
    initialValues: initialFormData,
    validationSchema: loginCustomerIdValidation,
    onSubmit: async (val: any) => {
      dispatch(createAccountAction(val))
        .then((res) => {
          if (res?.payload?.accessToken) {
            router.push('/login')
          }
        })
        .catch((res) => {
          if (res?.error?.message === '"Rejected"') {
            router.push('/login')
          }
        })
    },
  })

  return (
    <>
      <div>
        <Container>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              <div className="border border-3"></div>
              <Card className="shadow">
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <div className="d-flex align-items-center">
                      <Image
                        className="mb-2"

                        src={Logo}
                        width={100}
                        height={100}
                        alt="logo"
                      />
                      <h2 className="ml-2" style={{ marginLeft: '10px' }}>Spiral Technolabs</h2>
                    </div>
                    <p>Please enter your login and password!</p>
                    <div className="mb-3">
                      <Form noValidate onSubmit={handleSubmit} >
                        <TextInput
                          controlId="usernameGroup"
                          label={"username"}
                          value={values?.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          touched={touched?.username}
                          errors={errors?.username}
                          formGroupClassName="mb-4 pt-3"
                          placeholder="Enter username"
                          type="text"
                          name="username"
                          maxLength={50}
                          restProps={{ "aria-describedby": "User Name" }}
                        />
                        <TextInput
                          controlId="emailGroup"
                          label={"email"}
                          value={values?.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          touched={touched?.email}
                          errors={errors?.email}
                          formGroupClassName="mb-4"
                          placeholder="Enter email"
                          type="text"
                          name="email"
                          maxLength={50}
                          restProps={{ "aria-describedby": "User Name" }}
                        />

                        <TextInput
                          controlId="passwordGroup"
                          label={"Password"}
                          value={values?.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          touched={touched?.password}
                          errors={errors?.password}
                          formGroupClassName="mb-4"
                          placeholder={"Enter Password"}
                          type={passwordToggle ? "text" : "password"}
                          name="password"
                          inputClassName="placeholder-no-fix input-password text-box single-line password"
                          restProps={{ "aria-describedby": "Password field" }}
                          rightIcon={{
                            onRightIconPress: () => {
                              setPasswordToggle(!passwordToggle)
                            },
                            toggleOff: <FaEyeSlash />,
                            toggleON: <FaEye />,
                            state: passwordToggle,
                          }}
                        />

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"

                        >
                          <p className="small">
                            <span className="text-success">
                              Forgot password?
                            </span>
                          </p>
                        </Form.Group>
                        <div className="d-grid">
                          <Button type="submit" className="text-dark font-weight-bold" style={{ backgroundColor: 'rgba(136, 196, 255, 0.5)', borderColor: 'black' }}>
                            Create Your Account
                          </Button>
                        </div>
                      </Form>
                      <div className="mt-3">
                        <p className="mb-0  text-center">
                          Already Registered User? Click here to{" "}
                          <span className="text-success fw-bold" onClick={() => router.push('/login')}>
                            login
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SignInPage;
