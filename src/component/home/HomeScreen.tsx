import React from 'react'

const HomeScreen = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-md-4 my-5">
          <div className="p-4 border " style={{ borderRadius: '5px', backgroundColor :"rgba(136, 196, 255, 0.5)"}}>
            <span className='d-flex'>Total Staff</span>
            <span><b>32</b></span>
          </div>
        </div>
        <div className="col-md-4 my-5">
          <div className="p-4 border" style={{ borderRadius: '5px', backgroundColor: "rgba(136, 196, 255, 0.5)" }}>
            <span className='d-flex'>React Js Developer</span>
            <span><b>3</b></span>
          </div>
        </div>
        <div className="col-md-4 my-5">
          <div className="p-4 border" style={{ borderRadius: '5px', backgroundColor: "rgba(136, 196, 255, 0.5)" }}>
            <span className='d-flex'>ASP. net Developer</span>
            <span><b>24</b></span>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 border" style={{ borderRadius: '5px', backgroundColor: "rgba(136, 196, 255, 0.5)" }}>
            <span className='d-flex'>Angular Developer</span>
            <span><b>2</b></span>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 border" style={{ borderRadius: '5px', backgroundColor: "rgba(136, 196, 255, 0.5)" }}>
            <span className='d-flex'>Next Js Developer</span>
            <span><b>3</b></span>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 border" style={{ borderRadius: '5px', backgroundColor: "rgba(136, 196, 255, 0.5)" }}>
            <span className='d-flex'>Designer</span>
            <span><b>2</b></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen