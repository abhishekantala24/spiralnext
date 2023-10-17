'use client'
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { authSelector } from '@/redux/auth/authSlice';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import '../../assets/page.css'
import { collection, addDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { SetStateAction, useEffect, useState } from 'react';
import { hideLoader, showLoader } from '@/redux/lem/lemSlice';

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
    const [entriesData, setEntriesData] = useState<any[]>()
    const usersData = useAppSelector(authSelector).userDetails
    const dispatch = useAppDispatch()

    const storeUserData = async (userData: any) => {
        const entriesCollectionRef = collection(db, 'entry');
        dispatch(showLoader({ loading: true, message: 'empty' }))
        await addDoc(entriesCollectionRef, userData)
            .then(() => {
                getData()
            })
            .catch(() => {
                getData()
            })
    };

    const getData = () => {
        dispatch(showLoader({ loading: true, message: 'empty' }))

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
        dispatch(hideLoader())
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
                <h1>Hey ! {usersData?.displayName}</h1>
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
                            {/* <Form.Group>
                                <h3>state</h3>
                                <Form.Select name="selectState" className="form-select form-control">
                                    <option value="">Select State</option>
                                    {stateData &&
                                        stateData?.length > 0 &&
                                        stateData?.map((item: CountrySubdivisionReferenceItem) => {
                                            const { CountrySubdivisionID, Abbreviation, Name } = item
                                            return (
                                                <option key={CountrySubdivisionID} value={Abbreviation}>
                                                    {Name}
                                                </option>
                                            )
                                        })}
                                </Form.Select>
                            </Form.Group> */}
                            {/* <input
                                id="terms"
                                aria-describedby="terms"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                {...register("terms", {
                                    required: "Please Select Terms & Conditions",
                                })}
                            /> */}

                            <Form.Select placeholder="Role"

                                {...register("role", {
                                    required: "Please Enter Role",
                                })} >
                                <option value="">Select State</option>
                                <option value="ASP .net developer">ASP .net developer</option>
                                <option value="React Js developer">React Js developer</option>
                                <option value="Designer">Designer</option>
                                <option value="Angular Developer">Angular Developer</option>
                                <option value="Next js Developer">Next js Developer</option>
                            </Form.Select>
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