import React, { useRef, useState } from 'react'
import "./ContactForm.css"
// import emailjs from '@emailjs/browser';

const ContactForm = () => {

    const form = useRef();

    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        user_country: '',
        user_number: '',
        user_durationTravel:'',
        user_intendedTime:'',
        user_adults:'',
        user_children:'',
        message: ''
    });


    // Handle input changes and update the formData state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const [messageSent, setMessageSent] = useState(false); // Track whether the message has been sent


    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        setMessageSent(true);

        setTimeout(() => {
            setMessageSent(false);
        }, 2500);

        // emailjs.sendForm(
        //     // 'service_258k6c9',
        //     // 'template_tydc87o',
        //     form.current,
        //     // 'ECMzb8lrOTXw_iayA'
        // )
        //     .then((result) => {
        //         console.log(result.text);
        //         console.log("message sent")
        //     }, (error) => {
        //         console.log(error.text);
        //     });

        // Access the user's name, email, and message from the formData state
        const { user_name, user_number, user_email, user_country, user_durationTravel, user_intendedTime, user_adults ,user_children , message } = formData;

        console.log('Name:', user_name);
        console.log('Email:', user_email);
        console.log('Number:', user_number);
        console.log('Country:', user_country);
        console.log('Duration Travel:', user_durationTravel);
        console.log('Intended Time:', user_intendedTime);
        console.log('Adults:', user_adults);
        console.log('Children:', user_children);
        console.log('Message:', message);

        setFormData({
            user_name: '',
            user_email: '',
            user_number: '',
            user_country: '',
            user_durationTravel: '',
            user_intendedTime: '',
            user_adults: '',
            user_children: '',
            message: ''
        });
    };

    return (
        <div className="footer-contact-form">
            <p>SEND YOUR DETAILS TO BOOK</p>
            <h4>ENQUIRE NOW</h4>
            {messageSent ? (
                <div className='form-message'>
                    <p>Message sent successfully!</p>
                </div>
            ) : (
                <form ref={form} onSubmit={handleSubmit}>
                    <div className="contact-form-box">
                        <div className='input-box col-md-6'>
                            <input
                                name="user_name"
                                type="text"
                                value={formData.name}
                                placeholder='Your Name'
                                onChange={handleInputChange} required
                            />
                        </div>
                        <div className='input-box col-md-6'>
                            <input
                                name="user_email"
                                type="email"
                                value={formData.email}
                                placeholder='Your Email '
                                onChange={handleInputChange} required
                            />
                        </div>
                    {/* </div>
                    <div className="contact-form-box"> */}
                        <div className='input-box col-md-6'>
                            <input
                                name="user_country"
                                type="text"
                                value={formData.country}
                                placeholder='Country'
                                onChange={handleInputChange} required
                            />
                        </div>
                        <div className='input-box col-md-6'>
                            <input
                                name="user_number"
                                type="number"
                                value={formData.number}
                                placeholder='Your Number'
                                onChange={handleInputChange} required
                            />
                        </div>
                    </div>
                    <div className='input-box'>
                        <textarea
                            name="message"
                            value={formData.message}
                            placeholder='Describe Your Requirement'
                            onChange={handleInputChange} required
                        />
                    </div>
                    <div className="contact-form-box-button">
                        <button type="submit">
                            <p>Submit</p>
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default ContactForm