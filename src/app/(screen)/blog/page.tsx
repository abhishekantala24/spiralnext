'use client'
import React, { useEffect } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import styles from '../../../assets/Blog.module.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getBlogPostAction } from '@/redux/blog/middleware';
import { blogSelector } from '@/redux/blog/blogSlice';
import { useRouter } from 'next/navigation'

const Home = () => {
    const dispatch = useAppDispatch()
    const blogPostData = useAppSelector(blogSelector)
    const router = useRouter();
    
    useEffect(() => {
        dispatch(getBlogPostAction())
    }, [])

    return (
        <div>
            <Container className={`mt-5 ${styles.container}`}>
                <Row>
                    {blogPostData?.blogData?.map((data: any) => (
                        <Col key={data.id} md={4} onClick={() => router.push(`/blog/${data.id}`)}>
                            <Card className={styles.card}>
                                <Card.Img
                                    variant="top"
                                    src={data.coverimage}
                                    alt={data.name}
                                />
                                <Card.Body>
                                    <Card.Title>{data.name}</Card.Title>
                                    <Card.Text>{data.detail}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default Home