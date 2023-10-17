'use client'
import { useAppSelector } from '@/redux/hooks'
import { lemSelector } from '@/redux/lem/lemSlice'
import React, { useEffect, useState } from 'react'
import { Spinner } from "react-bootstrap"

const Loader = () => {
    const selector = useAppSelector(lemSelector).loading
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        setLoader(selector)
    }, [selector])
    
    if (loader) {
        return (
            <div className="modal d-flex loader-l">
                <div className="modal-dialog" role="document">
                    <Spinner
                        animation="border"
                        className="cls-spinner"
                    />
                </div>
            </div>
        )
    }
    return null
}

export default Loader