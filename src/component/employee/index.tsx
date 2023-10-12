'use client'
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { useAppSelector } from '@/redux/hooks';
import { authSelector } from '@/redux/auth/authSlice';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import '../../assets/page.css'
import { collection, addDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { SetStateAction, useEffect, useState } from 'react';

interface IFormInputs {
    fname: string;
    lname: string;
    location: string;
    role: string;
    age: number;
}

const columns: GridColDef[] = [
    {
        field: 'data.firstName',
        headerName: 'First name',
        width: 150,
        editable: false,
        valueGetter: (params) => params.row.data.firstName,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: false,
        valueGetter: (params) => params.row.data.lastName,
    },
    {
        field: 'location',
        headerName: 'Location',
        width: 200,
        editable: false,
        valueGetter: (params) => params.row.data.location,
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 200,
        editable: false,
        valueGetter: (params) => params.row.data.role,
    },
    {
        field: 'age',
        headerName: 'Age',
        width: 110,
        editable: false,
        valueGetter: (params) => params.row.data.age,
    },
    {
        field: 'addedby',
        headerName: 'Added By',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 200,
        valueGetter: (params: GridValueGetterParams) => params.row.data.addedby,
    },
];


const EmployeePage = () => {
    const [userprofile, setuserprofile] = useState<any>()
    const [entriesData, setEntriesData] = useState<any[]>()
    const usersData = useAppSelector(authSelector).userDetails

    const storeUserData = async (userData: any) => {
        const entriesCollectionRef = collection(db, 'entry');
        await addDoc(entriesCollectionRef, userData)
            .then(() => {
                getData()
            })
            .catch(() => {
                getData()
            })
    };

    const getData = () => {
        const userRef = doc(collection(db, 'users'), usersData?.uid);

        const entriesArray: SetStateAction<any[] | undefined> = [];

        getDocs(collection(db, 'entry'))
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    entriesArray.push({
                        id: doc.id,
                        data: doc.data()
                    })
                });
                setEntriesData(entriesArray)
            })
            .catch((error) => {
                console.error('Error getting documents: ', error);
            });


        getDoc(userRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    setuserprofile(userData)
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });
    }

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<IFormInputs>();

    useEffect(() => {
        getData()
    }, [])


    const onSubmit = (data: IFormInputs) => {
        storeUserData({
            firstName: data.fname,
            lastName: data.lname,
            age: data.age,
            location: data.location,
            role: data.role,
            addedby: usersData?.email
        }).then(() => {
            reset()
        })
    };

    return (
        <div>
            <div className='d-flex justify-content-center pt-3'>
                <h1>Hey ! {userprofile?.firstName}{" "}{userprofile?.lastName}</h1>
            </div>
            <div className='justify-content-center pt-3'>
                <Form className='m-5' noValidate
                    onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col>
                            <Form.Control
                                placeholder="First name"
                                {...register("fname", {
                                    required: "Please Enter First Name",
                                })}
                            />
                            <ErrorMessage
                                className="text-danger font-semibold"
                                errors={errors}
                                name="fname"
                                as="p"
                            />
                        </Col> 
                        <Col>
                            <Form.Control placeholder="Last name"
                                {...register("lname", {
                                    required: "Please Enter Last Name",
                                })} />
                            <ErrorMessage
                                className="text-danger font-semibold"
                                errors={errors}
                                name="lname"
                                as="p"
                            />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Location"
                                {...register("location", {
                                    required: "Please Enter location Name",
                                })} />
                            <ErrorMessage
                                className="text-danger font-semibold"
                                errors={errors}
                                name="location"
                                as="p"
                            />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Role"

                                {...register("role", {
                                    required: "Please Enter Role",
                                })} />
                            <ErrorMessage
                                className="text-danger font-semibold"
                                errors={errors}
                                name="role"
                                as="p"
                            />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Age"
                                type='number'
                                {...register("age", {
                                    required: "Please Enter Age",
                                    minLength: {
                                        value: 2,
                                        message: "Minimum 2 Characters Allowed",
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "Maximun 10 Characters Allowed",
                                    },
                                })} />
                            <ErrorMessage
                                className="text-danger font-semibold"
                                errors={errors}
                                name="age"
                                as="p"
                            />
                        </Col>
                        <Col>
                            <Button type='submit' className='text-dark' style={{ backgroundColor: 'rgba(136, 196, 255, 0.5)', borderColor: 'black' }}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div className='m-5'>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={entriesData ? entriesData : []}
                        columns={columns}
                        key='id'
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Box>
            </div>
        </div>
    );
}

export default EmployeePage;