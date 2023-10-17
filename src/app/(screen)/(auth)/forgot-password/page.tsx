'use client'
import { AxiosBasicCredentials } from "axios";
import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form, Modal } from "react-bootstrap";
import * as yup from "yup"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useFormik } from "formik"
import { useRouter } from 'next/navigation'
import Logo from "@/assets/img/cropped-final-logo-footer.png"
import firebase from '@/firebase'
import TextInput from "@/component/TextInput/TextInput";
import { useAppDispatch } from "@/redux/hooks";
import { loginUserByEmailAction } from "@/redux/auth/middleware";
import Image from "next/image";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const initialFormData: any = {
    email: "",
}


const Login: React.FC = (): JSX.Element => {
    const [isModal, setIsModal] = useState({
        isOpen: false,
        message: ""
    })
    const router = useRouter();
    const loginCustomerIdValidation = () =>
        yup.object().shape({
            email: yup
                .string()
                .required("Please Enter Email Address"),
        })

    const auth = getAuth(firebase);
    const { handleChange, handleSubmit, handleBlur, values, touched, errors } = useFormik({
        initialValues: initialFormData,
        validationSchema: loginCustomerIdValidation,
        onSubmit: async (val: any) => {
            sendPasswordResetEmail(auth, val.email)
                .then(() => {
                    setIsModal({
                        isOpen: true,
                        message: "Password reset email sent. Check your inbox."
                    })
                })
                .catch((error) => {
                    setIsModal({
                        isOpen: true,
                        message: "Try Again."
                    })
                });
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
                                            <Form noValidate onSubmit={handleSubmit}>
                                                <TextInput
                                                    controlId="emailGroup"
                                                    label={"Email"}
                                                    value={values?.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    touched={touched?.email}
                                                    errors={errors?.email}
                                                    formGroupClassName="mb-4 pt-3"
                                                    placeholder="Enter email"
                                                    type="text"
                                                    name="email"
                                                    maxLength={50}
                                                    restProps={{ "aria-describedby": "User Name" }}
                                                />
                                                <div className="d-grid">
                                                    <Button type="submit" className="text-dark font-weight-bold" style={{ backgroundColor: 'rgba(136, 196, 255, 0.5)', borderColor: 'black' }}>
                                                        Submit
                                                    </Button>
                                                </div>
                                            </Form>
                                            <div className="mt-3">
                                                <p className="mb-0  text-center">
                                                    Remember ?{" "}
                                                    <span style={{ cursor: 'pointer' }} className="text-success fw-bold" onClick={() => router.push('/login')}>
                                                        Login
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Modal
                        show={isModal.isOpen}
                        centered
                    >
                        <Modal.Body>
                            <div>
                                <p>{isModal.message}</p>
                                <Button type="button" className="text-dark font-weight-bold"
                                    style={{ backgroundColor: 'rgba(136, 196, 255, 0.5)', borderColor: 'black' }}
                                    onClick={() => router.push('/login')}
                                >
                                    Back
                                </Button>
                            </div>
                        </Modal.Body>
                    </Modal>
                </Container>
            </div>
        </>
    );
};

export default Login;