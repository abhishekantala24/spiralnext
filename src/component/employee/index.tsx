'use client'
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { BiSolidMessageSquareEdit } from 'react-icons/bi'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { authSelector } from '@/redux/auth/authSlice';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import '../../assets/page.css'
import { collection, addDoc, doc, getDoc, getDocs, getFirestore, deleteDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { SetStateAction, useEffect, useState } from 'react';
import { hideLoader, showLoader } from '@/redux/lem/lemSlice';
import { toast } from 'react-toastify';
import { toastConfig } from '@/redux/lem/types';

interface IFormInputs {
    firstName: string;
    lastName: string;
    location: string;
    role: string;
    age: number;
}

const EmployeePage = () => {
    const [entriesData, setEntriesData] = useState<any[]>()
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [selectRowData, setselectRowData] = useState<any>();
    const [selectEditRowId, setselectEditRowId] = useState("");

    const usersData = useAppSelector(authSelector).userDetails
    const dispatch = useAppDispatch()

    const storeUserData = async (userData: any) => {
        const entriesCollectionRef = collection(db, 'entry');
        dispatch(showLoader({ loading: true, message: 'empty' }))
        if (selectEditRowId) {
            // make logic for edit
            const docRef = doc(entriesCollectionRef, selectEditRowId);
            try {
                // Update the existing document with the edited userData
                await setDoc(docRef, userData);
                toast.success("Employee Details updated successfully", toastConfig)
                setselectEditRowId("")
                getData();
            } catch (error) {
                toast.error("Error updating Employee Details", toastConfig)
                setselectEditRowId("")
                getData();
            }

        } else {
            await addDoc(entriesCollectionRef, userData)
                .then(() => {
                    getData()
                })
                .catch(() => {
                    getData()
                })
        }
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
                toast.error('Error getting documents', toastConfig);
            });
        dispatch(hideLoader())
    }

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        setValue,
    } = useForm<IFormInputs>();

    useEffect(() => {
        if (selectRowData) {
            Object.keys(selectRowData).forEach((key: any) => {
                setValue(key, selectRowData[key]);
            });
        }
    }, [selectRowData, setValue]);


    const handleDeleteClick = async () => {
        const firestore = getFirestore();
        if (selectedRows.length) {
            for (const docId of selectedRows) {
                try {
                    await deleteDoc(doc(firestore, 'entry', docId));
                    toast.success("Employee Delete Successfully", toastConfig)
                    getData()
                } catch (error) {
                    getData()
                    toast.error(`Error deleting Employee`, toastConfig);
                }
            }
        } else {
            toast.error("Please Select Employee", toastConfig)
        }
    };

    useEffect(() => {
        getData()
    }, [])

    const onSubmit = (data: IFormInputs) => {
        storeUserData({
            firstName: data.firstName,
            lastName: data.lastName,
            age: data.age,
            location: data.location,
            role: data.role,
            addedby: usersData?.displayName
        }).then(() => {
            reset()
        })
    };

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
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 200,
            cellClassName: 'center-cell',
            renderCell: (params: any) => {
                return (
                    <div style={{ fontSize: '30px' }} onClick={() => {
                        setselectRowData(params.row.data)
                        setselectEditRowId(params.id)
                    }}>
                        <BiSolidMessageSquareEdit />
                    </div>
                )
            }
        },
    ];

    return (
        <div>
            <div className='d-flex justify-content-center pt-3'>
                <h3>Hey ! {usersData?.displayName}</h3>
            </div>
            <div className='justify-content-center pt-3'>
                <Form className='m-5' noValidate
                    onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col>
                            <Form.Control
                                placeholder="First name"
                                {...register("firstName", {
                                    required: "Please Enter First Name",
                                })}
                            />
                            <ErrorMessage
                                className="text-danger font-semibold"
                                errors={errors}
                                name="firstName"
                                as="p"
                            />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Last name"
                                {...register("lastName", {
                                    required: "Please Enter Last Name",
                                })} />
                            <ErrorMessage
                                className="text-danger font-semibold"
                                errors={errors}
                                name="lastName"
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
                                {/* <option value="HR">HR</option>
                                <option value="Office Admin">Office Admin</option> */}
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
                <div className='text-end'>
                    <Button type='button'
                        className='text-dark mb-3'
                        style={{ backgroundColor: 'rgb(241 171 171)', borderColor: 'black' }}
                        onClick={handleDeleteClick}>
                        Delete Employee
                    </Button>
                </div>
                <Box sx={{ height: 500, width: '100%' }}>
                    <DataGrid
                        rows={entriesData ? entriesData : []}
                        columns={columns}
                        key='id'
                        onRowSelectionModelChange={(item: any) => setSelectedRows(item)}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 20,
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