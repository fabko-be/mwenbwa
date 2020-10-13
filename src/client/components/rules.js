import React, {useState} from "react";
import ReactDOM from "react-dom";
import {Button, Modal} from "react-bootstrap";
const axios = require("axios").default;

const border = {
    border: "solid green px",
    backgroundColor: "#FFFFFF",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "25%",
};

const Rules = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };

    return (
        <>
            <br />
            <div>
                <div className={"card-image has-text-centered"}>
                    <button className={"button is-info is-rounded"}>
                        <a onClick={handleShow}> What is the rules?</a>
                    </button>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <div className={"card-image has-text-centered"} style={border}>
                    <h1>The rules</h1>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras eget arcu vitae ex lobortis laoreet. Nam lacinia magna
                    ac metus interdum, quis blandit risus molestie. Pellentesque
                    varius libero tortor, sed feugiat neque facilisis non. Etiam
                    lacinia nunc pellentesque augue blandit, non ornare tortor
                    sodales. Morbi sit amet rhoncus lorem, nec gravida nulla.
                    Quisque odio turpis, condimentum at ultrices sed, suscipit
                    non leo. Etiam quis tortor dolor. Nam lobortis lacinia ex,
                    vulputate imperdiet dui aliquet vitae. Proin orci arcu,
                    iaculis non ex eget, euismod pharetra massa. Morbi nec
                    rhoncus tortor. Integer nunc nunc, hendrerit eu est in,
                    sodales pharetra est.
                    <div>
                        <button
                            className={"button is-danger"}
                            onClick={handleClose}>
                            close
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Rules;
