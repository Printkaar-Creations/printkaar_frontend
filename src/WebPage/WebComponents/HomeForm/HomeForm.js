import React from 'react'
import "./HomeForm.css"
import { Link } from 'react-router-dom'
import ContactForm from '../ContactForm/ContactForm'

const HomeForm = (props) => {
    return (
        <div className='HomeForm'>
            <div className="HomeForm-left">
                <h5>Each of our guest rooms feature a private bath, wi-fi, cable television and include full breakfast. Each of our guest rooms feature a private bath, wi-fi, cable television and include full breakfast. </h5>
                <div className="HomeForm-left-call">
                    <div className="call-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                <path strokeDasharray="64" strokeDashoffset="64" d="M8 3C8.5 3 10.5 7.5 10.5 8C10.5 9 9 10 8.5 11C8 12 9 13 10 14C10.3943 14.3943 12 16 13 15.5C14 15 15 13.5 16 13.5C16.5 13.5 21 15.5 21 16C21 18 19.5 19.5 18 20C16.5 20.5 15.5 20.5 13.5 20C11.5 19.5 10 19 7.5 16.5C5 14 4.5 12.5 4 10.5C3.5 8.5 3.5 7.5 4 6C4.5 4.5 6 3 8 3Z">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"></animate>
                                </path>
                                <path strokeDasharray="4" strokeDashoffset="4" d="M14 7.04404C14.6608 7.34734 15.2571 7.76718 15.7624 8.27723M16.956 10C16.6606 9.35636 16.2546 8.77401 15.7624 8.27723" opacity="0">
                                    <set attributeName="opacity" begin="0.7s" to="1"></set>
                                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="4;8"></animate>
                                </path>
                                <path strokeDasharray="10" strokeDashoffset="10" d="M20.748 9C20.3874 7.59926 19.6571 6.347 18.6672 5.3535M15 3.25203C16.4105 3.61507 17.6704 4.3531 18.6672 5.3535" opacity="0">
                                    <set attributeName="opacity" begin="1s" to="1"></set>
                                    <animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="10;20"></animate>
                                </path>
                            </g>
                        </svg>

                    </div>
                    <p><Link to="tel: +919876543210">
                        <p>
                        Contact Us (24x7)
                        </p>
                        <h5>
                        +91 9876543210
                        </h5>
                    </Link></p>
                </div>
                {/* <p>call us its toll free</p> */}
            </div>
            <div className="HomeForm-right">
                <div className="booking-box">
                    <ContactForm/>
                </div>
            </div>
        </div>
    )
}

export default HomeForm
