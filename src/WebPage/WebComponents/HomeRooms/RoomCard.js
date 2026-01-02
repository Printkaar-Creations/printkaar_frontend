import React from 'react'

const RoomCard = (props) => {
    return (
        <div className='RoomCard' id={props.id}>
            <div className="RoomCard-box">
                <div className="RoomCard-image">
                    <img src={props.cover} alt="" />
                </div>
                <span className="RoomCard-category">
                    <p>Book</p>
                </span>
                <div className="RoomCard-con">
                    <h6>${props.price} / Night</h6>
                    <h5>{props.title}</h5>
                    <div className="RoomCard-con-line"></div>
                    <div className="RoomCard-con-facilities">
                        <ul>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16" {...props}>
                                    <path fill="currentColor" d="M4.28 7H7L5.85 5.32a3.315 3.315 0 0 0-2.295-1.319L3 4v1.54a1.248 1.248 0 0 0 1.232 1.461L4.282 7zM13 7v-.29A1.71 1.71 0 0 0 11.322 5H6.63C7.13 5.62 8 7 8 7h5z"></path>
                                    <path fill="currentColor" d="M15 5.1a1 1 0 0 0-1 1V8H2V4a1 1 0 0 0-2 0v9h2v-2h12v2h2V6.1a1 1 0 0 0-1-1z"></path>
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" {...props}>
                                    <path fill="currentColor" d="M21 10H7V7c0-1.103.897-2 2-2s2 .897 2 2h2c0-2.206-1.794-4-4-4S5 4.794 5 7v3H3a1 1 0 0 0-1 1v2c0 2.606 1.674 4.823 4 5.65V22h2v-3h8v3h2v-3.35c2.326-.827 4-3.044 4-5.65v-2a1 1 0 0 0-1-1zm-1 3c0 2.206-1.794 4-4 4H8c-2.206 0-4-1.794-4-4v-1h16v1z"></path>
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 2048 2048" {...props}>
                                    <path fill="currentColor" d="M1408 592q-26 0-45-19t-19-45q0-51 19-98t56-83l79-80q38-38 38-91q0-26 19-45t45-19q26 0 45 19t19 45q0 51-19 98t-56 83l-79 80q-38 38-38 91q0 26-19 45t-45 19zm-384 0q-26 0-45-19t-19-45q0-51 19-98t56-83l79-80q38-38 38-91q0-26 19-45t45-19q26 0 45 19t19 45q0 51-19 98t-56 83l-79 80q-38 38-38 91q0 26-19 45t-45 19zm832 176q40 0 75 15t61 41t41 61t15 75v384q0 40-15 75t-41 61t-61 41t-75 15h-57q-2 7-3 13t-4 12v39q0 66-25 124t-69 102t-102 69t-124 25h-384q-78 0-144-35t-110-93H334q-66 0-124-25t-102-68t-69-102t-25-125v-64h256q0-79 30-149t83-122t122-83t149-30q30 0 58 5t56 14V640h1024v128h64zM654 1152q-53 0-99 20t-82 55t-55 81t-20 100h370v-228q-26-13-54-20t-60-8zm-320 512h441q-7-29-7-64v-64H153q10 28 28 51t41 41t52 26t60 10zm463 67v1l1 2v-1l-1-2zm867-131V768H896v832q0 40 15 75t41 61t61 41t75 15h384q40 0 75-15t61-41t41-61t15-75zm256-256V960q0-26-19-45t-45-19h-64v512h64q26 0 45-19t19-45z"></path>
                                </svg>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 48 48" {...props}>
                                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="2" strokeWidth="4">
                                        <path d="M36 18H4v8h32v-8Z"></path>
                                        <path d="M36 12v20a4 4 0 0 1-4 4H12m0 0H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4v32c0 2.21-1.79 4-4 4H16c-2.21 0-4-1.79-4-4v-4Z"></path>
                                    </g>
                                </svg>
                            </li>
                        </ul>
                        <div className="RoomCard-con-button">
                            <p>Details</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 15 15" {...props}>
                                <path fill="currentColor" d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414Z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomCard;
