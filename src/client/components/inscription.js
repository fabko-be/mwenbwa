import React, {useState} from "react";
import {Modal} from "react-bootstrap";

const border = {
    border: "solid green 3px",
    backgroundColor: "#FFFFFF",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5%",
};

const Inscription = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };

    return (
        <>
            <div className={"card-image has-text-centered"}>
                {"Don't have an account?"}
                <a onClick={handleShow}> Sign Up</a>
            </div>
            <Modal show={show} onHide={handleClose}>
                <div>
                    <section className={"card-image has-text-centered"}>
                        <form style={border}>
                            <fieldset>
                                <br />
                                <h1 className={"title"}>{"Inscription"}</h1>
                                <label
                                    className={"card-image has-text-centered"}>
                                    {"Pseudo"}
                                </label>
                                <input type={"text"} />
                                <br />
                                <br />
                                <label
                                    className={"card-image has-text-centered"}>
                                    {"Email"}
                                </label>
                                <input type={"email"} />
                                <br />
                                <br />
                                <label
                                    className={"card-image has-text-centered"}>
                                    {"Password"}
                                </label>
                                <input type={"password"} />
                                <br />
                                <br />
                                <label
                                    className={"card-image has-text-centered"}>
                                    {"Confirm Password"}
                                </label>
                                <input type={"password"} />
                                <br />
                                <br />
                                <div>
                                    <label
                                        for={"color"}
                                        htmlFor={"color"}
                                        className={
                                            "card-image has-text-centered"
                                        }>
                                        {"Your Color"}
                                    </label>
                                    <input
                                        id={"color"}
                                        type={"color"}
                                        name={"color"}
                                        value={"color"}
                                    />
                                </div>
                                <br />
                                <div className={"button is-primary"}>
                                    {"Confirm"}
                                </div>
                                <button
                                    className={"button is-danger"}
                                    onClick={handleClose}>
                                    close
                                </button>
                                <br />
                                <br />
                            </fieldset>
                        </form>
                    </section>
                </div>
            </Modal>
        </>
    );
};

export default Inscription;
