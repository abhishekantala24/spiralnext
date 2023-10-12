'use client'
import { blogSelector } from '@/redux/blog/blogSlice';
import { getCurrntBlogPostAction } from '@/redux/blog/middleware';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import React, { useEffect } from 'react'

const BlogPost = ({ params }: { params: { blogpost: string } }) => {
    const dispatch = useAppDispatch()
    const blogPostData = useAppSelector(blogSelector)?.currBlogData?.attraction

    const containerStyle = {
        width: '400px',
        height: '400px',
    };

    useEffect(() => {
        dispatch(getCurrntBlogPostAction(params.blogpost))
    }, [])


    return (
        <div>
            {blogPostData ?
                <div className='m-3 p-5 border border-dark d-flex'>
                    <img className='rounded' style={{ marginRight: '30px' }} src={blogPostData?.coverimage} alt={blogPostData?.name} width={500} height={500} />
                    <div>
                        <div className='justify-content-center'>
                            <h2>{blogPostData?.name}</h2>
                        </div>
                        <div>
                            <p>
                                {blogPostData?.detail}<br />
                                <a href={`https://www.google.com/maps/search/?q=${blogPostData?.latitude},${blogPostData?.latitude}`} target='_blank' >Click here</a>
                            </p>
                        </div>
                        {/* <div>
                        <LoadScript googleMapsApiKey="AIzaSyDmLyFxxZ6QfPpMuSGwKOkWiEONKqAdixw">
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={10}
                            >
                                {blogPostData?.detail}
                                <Marker position={center} icon={"A"}/>
                            </GoogleMap>
                        </LoadScript>
                    </div> */}
                    </div>
                </div>
                :
                <div className='d-flex justify-content-center pt-3'>
                    No data found
                </div>
            }
        </div>
    )
}

export default BlogPost