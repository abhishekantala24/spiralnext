'use client'
import React, { SetStateAction, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { authSelector } from '@/redux/auth/authSlice';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { hideLoader, showLoader } from '@/redux/lem/lemSlice';
import { toast } from 'react-toastify';
import { toastConfig } from '@/redux/lem/types';

const HomeScreen = () => {
  const [entriesData, setEntriesData] = useState<any[]>()
  const usersData = useAppSelector(authSelector).userDetails
  const dispatch = useAppDispatch()

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
        toast.error('Error getting documents: ', toastConfig);
      });
    dispatch(hideLoader())
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-md-4 my-5">
          <div className="p-4 border " style={{ borderRadius: '5px', backgroundColor: "rgba(136, 196, 255, 0.5)" }}>
            <span className='d-flex'>Total Staff</span>
            <span><b>{entriesData?.length || "-"}</b></span>
          </div>
        </div>
        <div className="col-md-4 my-5">
          <div className="p-4 border" style={{ borderRadius: '5px', backgroundColor: "rgba(136, 196, 255, 0.5)" }}>
            <span className='d-flex'>React Js Developer</span>
            <span><b>{entriesData?.filter((item) => item.data.role === "React Js developer").length || "-"}</b></span>
          </div>
        </div>
        <div className="col-md-4 my-5">
          <div className="p-4 border" style={{ borderRadius: '5px', backgroundColor: "rgba(136, 196, 255, 0.5)" }}>
            <span className='d-flex'>ASP. net Developer</span>
            <span><b>{entriesData?.filter((item) => item.data.role === "ASP .net developer").length || "-"}</b></span>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 border" style={{ borderRadius: '5px', backgroundColor: "rgba(136, 196, 255, 0.5)" }}>
            <span className='d-flex'>Angular Developer</span>
            <span><b>{entriesData?.filter((item) => item.data.role === "Angular Developer").length || "-"}</b></span>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 border" style={{ borderRadius: '5px', backgroundColor: "rgba(136, 196, 255, 0.5)" }}>
            <span className='d-flex'>Next Js Developer</span>
            <span><b>{entriesData?.filter((item) => item.data.role === "Next js Developer").length || "-"}</b></span>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 border" style={{ borderRadius: '5px', backgroundColor: "rgba(136, 196, 255, 0.5)" }}>
            <span className='d-flex'>Designer</span>
            <span><b>{entriesData?.filter((item) => item.data.role === "Designer").length || "-"}</b></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen