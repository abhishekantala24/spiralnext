import Image from 'next/image'
import React from 'react'
import Spiral from '@/assets/img/Spiral-10-3-2023.png'


const About = () => {
  return (
    <div>
      <h2 className='d-flex justify-content-center align-items-center mt-5'>
        About Spiral Nextlabs...
      </h2>
      <p className='m-5 font-weight-bold'>
        Our goal is to build a platform where users can read blog posts. The application will display a list of posts, and users can click on a post to view its details. We'll simulate a backend API by using mock data for demonstration purposes. Through this project, junior developers can grasp the essential concepts of building a web application using Next.js.
        <br />
        <br />
        <h4>Key Concepts and Features</h4>
        <br />
        <b>1. Next.js Basics</b>
        <br />
        We'll start by introducing the basic concepts of Next.js, including project setup, routing, and the Next.js file system. We'll explain how to create pages, components, and how the routing mechanism works in Next.js.
        <br />

        <br />
        <b>2. Components and Reusability</b>
        <br />
        Understanding components is crucial in modern web development. We'll emphasize the importance of components for building a maintainable and scalable application. We'll create reusable components like PostList and PostDetail to display posts.
        <br />

        <br />
        <b>3. Fetching Data</b>
        <br />
        Fetching data is a fundamental part of web applications. In this project, we'll demonstrate how to fetch data from a mock API (or a real API if available) and display it in our application. We'll use Axios or the built-in fetch API to retrieve post data.
        <br />

        <br />
        <b>4. Dynamic Routing</b>
        <br />
        Dynamic routing allows us to create pages that depend on specific data. We'll explore how to create dynamic routes for our blog posts, enabling users to click on a post and view its details on a separate page.
        <br />

        <br />
        <b>5. User Interface and Design</b>
        <br />
        Though our focus is on functionality, we'll touch on the importance of a good user interface and design. We'll use simple styling techniques to make the application visually appealing and user-friendly.
        <br />
      </p>
      <div className='d-flex justify-content-center align-items-center'>
        <Image
          src={Spiral}
          width={1000}
          height={500}
          alt="logo"
        />
      </div>
    </div>
  )
}

export default About