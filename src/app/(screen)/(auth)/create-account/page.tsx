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
import { loginUserByEmailAction } from "@/redux/auth/middleware";
import Image from "next/image";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { authSelector } from "@/redux/auth/authSlice";

interface IFormInputs {
    username: string;
    role: string;
    experience: string;
    phone: string;
}

const initialFormData: IFormInputs = {
    username: "",
    role: "",
    experience: "",
    phone: "",
}


const CreateAccount: React.FC = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const router = useRouter();
    const selector = useAppSelector(authSelector).userDetails
    
    const storeUserData = async (userData: any) => {
        const entriesCollectionRef = collection(db, 'users', selector?.uid);
        await addDoc(entriesCollectionRef, userData)
            .then(() => router.push('/login'))
            .catch(() => router.push('/login'))
    };

    const loginCustomerIdValidation = () =>
        yup.object().shape({
            username: yup
                .string()
                .required("Please Enter username or Email Address"),
            role: yup
                .string()
                .required("Please Enter Role"),
            experience: yup
                .string()
                .required("Please Enter Experience"),
            phone: yup
                .string()
                .required("Please Enter Phone Number"),
        })

    const { handleChange, handleSubmit, handleBlur, values, touched, errors } = useFormik({
        initialValues: initialFormData,
        validationSchema: loginCustomerIdValidation,
        onSubmit: async (val: IFormInputs) => {
            storeUserData({
                username: val.username,
                role: val.role,
                experience: val.experience,
                phone: val.phone,
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
                                        <p>Please fill the form !</p>
                                        <div className="mb-3">
                                            <Form noValidate onSubmit={handleSubmit}>
                                                <TextInput
                                                    controlId="usernameGroup"
                                                    label={"Username"}
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
                                                    controlId="roleGroup"
                                                    label={"Role"}
                                                    value={values?.role}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    touched={touched?.role}
                                                    errors={errors?.role}
                                                    formGroupClassName="mb-4"
                                                    placeholder={"Enter Role"}
                                                    type="text"
                                                    name="role"
                                                    restProps={{ "aria-describedby": "role field" }}

                                                />
                                                <TextInput
                                                    controlId="phoneGroup"
                                                    label={"Phone Number"}
                                                    value={values?.phone}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    touched={touched?.phone}
                                                    errors={errors?.phone}
                                                    formGroupClassName="mb-4"
                                                    placeholder={"Enter Phone Number"}
                                                    type="number"
                                                    name="phone"
                                                    restProps={{ "aria-describedby": "phone field" }}
                                                />
                                                <TextInput
                                                    controlId="experienceGroup"
                                                    label={"Experience"}
                                                    value={values?.experience}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    touched={touched?.experience}
                                                    errors={errors?.experience}
                                                    formGroupClassName="mb-4"
                                                    placeholder={"Enter Experience"}
                                                    type="number"
                                                    name="experience"
                                                    restProps={{ "aria-describedby": "experience field" }}
                                                />
                                                <Form.Group
                                                    className="mb-3"
                                                    controlId="formBasicCheckbox"

                                                >
                                                </Form.Group>
                                                <div className="d-grid">
                                                    <Button type="submit" className="text-dark font-weight-bold" style={{ backgroundColor: 'rgba(136, 196, 255, 0.5)', borderColor: 'black' }}>
                                                        Create Account
                                                    </Button>
                                                </div>
                                            </Form>
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

export default CreateAccount;