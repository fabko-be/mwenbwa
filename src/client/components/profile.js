/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/button-has-type */
import React, {useContext, useState, useEffect} from "react";
import "../../lib/jscolor-2.1.0/jscolor";
import UserContext from "./mwenbwa-context";
import {ChromePicker} from "react-color";

export default function ProfilePage(props) {
    const UserCont = useContext(UserContext);
    const [viewInfo, setViewInfo] = useState([]);
    const [username, setUsername] = useState(viewInfo.username);
    const [email, setEmail] = useState(viewInfo.email);
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [color, setColor] = useState(viewInfo.color);
    const [iconPass1, setIconPass1] = useState("");
    const [iconPass2, setIconPass2] = useState("");
    const [iconUsername, setIconUsername] = useState("");
    const [iconEmail, setIconEmail] = useState("");

    useEffect(() => {
        fetch(`api/user/${UserCont.user.userId}`, {
            headers: {
                Authorization: `bearer ${UserCont.user?.token}`,
            },
        })
            .then((res) => res.json())
            .then((elem) => {
                setViewInfo(elem);
            });
    }, []);

    function handleUsername() {
        console.log(username);
        const userInput = document.querySelector("#username");
        const userWarning = document.querySelector("#userWarning");

        const url = `api/auth/${username}`;
        const options = {
            method: "GET",
            headers: {
                // accept: "application/json",
                "Content-Type": "application/json",
            },
            // body: JSON.stringify(username),
            withCredentials: true,
        };

        if (username.length < 2) {
            userInput.classList.remove("is-success");
            userInput.classList.add("is-danger");
            userWarning.innerHTML =
                "This username is too short. Please try another.";
        } else {
            fetch(url, options)
                .then((response) => {
                    if (
                        response.status === 200 ||
                        viewInfo.username === username
                    ) {
                        console.log(response.data);
                        // userWarning.innerHTML = "This username is available.";
                        // this.setState({iconUsername: true});
                        setIconUsername(true);
                        userWarning.innerHTML = "";
                        userInput.classList.remove("is-danger");
                        userInput.classList.add("is-success");
                    } else {
                        // that.setState({iconUsername: false});
                        // console.log(this.state.iconUsername);
                        console.log(response.data);
                        setIconUsername(false);
                        userWarning.innerHTML =
                            "This username is incorrect. Please try another.";
                        userInput.classList.remove("is-success");
                        userInput.classList.add("is-danger");
                    }
                })
                .catch((error) => {
                    console.log(`Problem with fetch : ${error}`);
                });
        }
    }

    function handleEmail() {
        const emailInput = document.querySelector("#email");
        const emailWarning = document.querySelector("#emailWarning");

        const url = `api/auth/${email}`;
        const options = {
            method: "GET",
            headers: {
                // accept: "application/json",
                "Content-Type": "application/json",
            },
            // body: JSON.stringify(username),
            withCredentials: true,
        };
        fetch(url, options)
            .then((response) => {
                if (response.status === 200 || viewInfo.email === email) {
                    console.log(response.data);
                    // userWarning.innerHTML = "This username is available.";
                    // this.setState({iconUsername: true});
                    setIconEmail(true);
                    emailWarning.innerHTML = "";
                    emailInput.classList.remove("is-danger");
                    emailInput.classList.add("is-success");
                } else {
                    // that.setState({iconUsername: false});
                    // console.log(this.state.iconUsername);
                    console.log(response.data);
                    setIconEmail(false);
                    emailWarning.innerHTML =
                        "This email is incorrect. Please try another.";
                    emailInput.classList.remove("is-success");
                    emailInput.classList.add("is-danger");
                }
            })
            .catch((error) => {
                console.log(`Problem with fetch : ${error}`);
            });
    }

    function handleChangeComplete(color) {
        setColor(color.hex);
    }

    function handlePasswordCheck() {
        // console.log(password1);
        console.log(username);
        // console.log(password2);

        const password1Input = document.querySelector("#password1");
        const password2Input = document.querySelector("#password2");
        const verify1 = document.querySelector("#passwordLength");
        const verify2 = document.querySelector("#passwordMatch");

        if (password1.length < 4) {
            setIconPass1(false);
            verify1.innerHTML = "Your password needs at least 4 characters.";
            password1Input.classList.remove("is-success");
            password1Input.classList.add("is-danger");
        } else {
            setIconPass1(true);
            verify1.innerHTML = "";
            password1Input.classList.remove("is-danger");
            password1Input.classList.add("is-success");
        }

        if (
            password1 !== password2 ||
            iconPass1 === false ||
            password2.length < 4
        ) {
            setIconPass2(false);
            verify2.innerHTML = "The two passwords do not match.";
            verify2.classList.remove("is-success");
            verify2.classList.add("is-danger");
            password2Input.classList.remove("is-success");
            password2Input.classList.add("is-danger");
        } else {
            setIconPass2(true);
            verify2.innerHTML = "Passwords match !";
            verify2.classList.remove("is-danger");
            verify2.classList.add("is-success");
            password2Input.classList.remove("is-danger");
            password2Input.classList.add("is-success");
        }
    }

    function CloseProfile() {
        document.querySelector("#editProfile").removeAttribute("style");
        document.querySelector("#normalMode").removeAttribute("style");
        document
            .querySelector("#editMode")
            .setAttribute("style", "display: none");
        document
            .querySelector("#saveProfile")
            .setAttribute("style", "display: none");
        document
            .querySelector("#cancelProfile")
            .setAttribute("style", "display: none");
        document
            .querySelector("#changeImage")
            .setAttribute("style", "display: none");
    }
    function EditProfile() {
        document
            .querySelector("#editProfile")
            .setAttribute("style", "display: none");
        document
            .querySelector("#normalMode")
            .setAttribute("style", "display: none");
        document.querySelector("#editMode").removeAttribute("style");
        document.querySelector("#saveProfile").removeAttribute("style");
        document.querySelector("#cancelProfile").removeAttribute("style");
        document.querySelector("#changeImage").removeAttribute("style");
    }
    function SaveChanges() {
        const data = useState();
        console.log(data);
        const url = `api/user/${UserCont.user.userId}`;
        const options = {
            method: "POST",
            headers: {
                // accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `bearer ${UserCont.user?.token}`,
            },
            body: JSON.stringify(data),
            withCredentials: true,
        };
        fetch(url, options)
            .then((response) => {
                if (response.ok) {
                    console.log(response.data);
                } else {
                    console.log(
                        `Request rejected with status ${response.status}`,
                    );
                }
            })
            .catch((error) => {
                console.log(`Problem with fetch : ${error}`);
            });
    }

    return (
        <div className={props.showProfile ? "modal is-active" : "modal"}>
            <div
                className={"modal-background"}
                onClick={props.handleCloseProfile}
            />
            <div className={"modal-card"}>
                <header className={"modal-card-head"}>
                    <p className={"modal-card-title"}>{"Profile"}</p>
                    <button
                        className={"delete"}
                        aria-label={"close"}
                        onClick={props.handleCloseProfile}
                    />
                </header>
                <section className={"modal-card-body has-text-centered"}>
                    <div className={"columns is-centered"}>
                        <div className={"column is-5"}>
                            <span>
                                <i className={"fas fa-user-alt fa-3x"} />
                            </span>
                            <br />
                            {/* {viewInfo.img === "" ? (
                                <span>
                                    <i className={"fas fa-user-alt fa-3x"} />
                                </span>
                            ) : (
                                <img
                                    className={"fas fa-user-alt is-large"}
                                    id={"profileImage"}
                                    src={viewInfo.img}
                                />
                            )} */}
                            <div
                                className={"file is-info is-centered"}
                                id={"changeImage"}
                                style={{display: "none"}}>
                                <label className={"file-label"}>
                                    <input
                                        className={"file-input"}
                                        type={"file"}
                                    />
                                    <span className={"file-cta"}>
                                        <span className={"file-icon"}>
                                            <i className={"fas fa-upload"} />
                                        </span>
                                        <span className={"file-label"}>
                                            {"Click to change"}
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div
                            id={"editMode"}
                            style={{display: "none"}}
                            className={"column is-5"}>
                            <div className={"field"}>
                                <label className={"label"}>{"Username"}</label>
                                <div
                                    className={
                                        "control has-icons-left has-icons-right"
                                    }>
                                    <input
                                        id={"username"}
                                        className={"input is-success"}
                                        type={"text"}
                                        placeholder={viewInfo.username}
                                        name={"username"}
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        onBlur={handleUsername}
                                    />
                                    <span className={"icon is-small is-left"}>
                                        <i className={"fas fa-user"} />
                                    </span>
                                    <span className={"icon is-small is-right"}>
                                        <i
                                            className={
                                                iconUsername === true
                                                    ? "fas fa-check"
                                                    : "fas fa-exclamation-triangle"
                                            }
                                        />
                                    </span>
                                </div>
                                <p
                                    id={"userWarning"}
                                    className={"help is-danger"}>
                                    {""}
                                </p>
                            </div>
                            <div className={"field"}>
                                <label className={"label"}>{"Email"}</label>
                                <div
                                    className={
                                        "control has-icons-left has-icons-right"
                                    }>
                                    <input
                                        id={"email"}
                                        className={"input is-danger"}
                                        type={"email"}
                                        placeholder={viewInfo.email}
                                        name={"email"}
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        onBlur={handleEmail}
                                    />

                                    <span className={"icon is-small is-left"}>
                                        <i className={"fas fa-envelope"} />
                                    </span>
                                    <span className={"icon is-small is-right"}>
                                        <i
                                            className={
                                                iconEmail === true
                                                    ? "fas fa-check"
                                                    : "fas fa-exclamation-triangle"
                                            }
                                        />
                                    </span>
                                </div>
                                <p
                                    id={"emailWarning"}
                                    className={"help is-danger"}>
                                    {""}
                                </p>
                            </div>
                            <div className={"field"}>
                                <label className={"label"}>
                                    {"New password"}
                                </label>
                                <p
                                    className={
                                        "control has-icons-left has-icons-right"
                                    }>
                                    <input
                                        id={"password1"}
                                        className={"input"}
                                        type={"password"}
                                        name={"password1"}
                                        placeholder={"Password"}
                                        onChange={(e) =>
                                            setPassword1(e.target.value)
                                        }
                                        onKeyUp={handlePasswordCheck}
                                    />
                                    <span className={"icon is-small is-left"}>
                                        <i className={"fas fa-lock"} />
                                    </span>
                                    <span className={"icon is-small is-right"}>
                                        <i
                                            id={"iconPass1"}
                                            className={
                                                iconPass1 === true
                                                    ? "fas fa-check"
                                                    : "fas fa-exclamation-triangle"
                                            }
                                        />
                                    </span>
                                </p>
                                <p
                                    id={"passwordLength"}
                                    className={"help is-danger"}>
                                    {""}
                                </p>
                            </div>
                            <div className={"field"}>
                                <label className={"label"}>
                                    {"Confirm new password"}
                                </label>
                                <p
                                    className={
                                        "control has-icons-left has-icons-right"
                                    }>
                                    <input
                                        id={"password2"}
                                        className={"input"}
                                        type={"password"}
                                        name={"password2"}
                                        placeholder={"Password"}
                                        onChange={(e) =>
                                            setPassword2(e.target.value)
                                        }
                                        onKeyUp={handlePasswordCheck}
                                    />
                                    <span className={"icon is-small is-left"}>
                                        <i className={"fas fa-lock"} />
                                    </span>
                                    <span className={"icon is-small is-right"}>
                                        <i
                                            id={"iconPass2"}
                                            className={
                                                iconPass2 === true
                                                    ? "fas fa-check"
                                                    : "fas fa-exclamation-triangle"
                                            }
                                        />
                                    </span>
                                </p>
                                <p id={"passwordMatch"} className={"help"}>
                                    {""}
                                </p>
                            </div>
                            <div className={"field"}>
                                <label className={"label"}>
                                    {"Pick a color"}
                                </label>
                                <div
                                    className={
                                        "control has-icons-left has-icons-right"
                                    }>
                                    <ChromePicker
                                        disableAlpha={true}
                                        color={color}
                                        onChangeComplete={handleChangeComplete}
                                    />
                                    <span className={"icon is-small is-left"}>
                                        <i className={"fas fa-palette"} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div id={"normalMode"} className={"column is-5"}>
                            <h5 className={"title is-5"}>
                                {viewInfo.username}
                            </h5>
                            <p>{viewInfo.email}</p>
                            <p>
                                {"My color : "}
                                <span
                                    style={{
                                        border: `2px, solid, ${viewInfo.color}`,
                                    }}>
                                    {viewInfo.color}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className={"columns is-centered"}>
                        <div className={"column is-2"}>
                            <span className={"icon"}>
                                <i className={"fas fa-lg fa-tree"} />
                            </span>
                            <p>{viewInfo.count}</p>
                        </div>
                        <div className={"column is-2"}>
                            <span className={"icon"}>
                                <i className={"fab fa-lg fa-envira"} />
                            </span>
                            <p>{viewInfo.totalLeaves}</p>
                        </div>
                    </div>
                </section>
                <footer
                    className={"modal-card-foot"}
                    style={{justifyContent: "center"}}>
                    <p id={"profileButtons"} className={"buttons"}>
                        <button
                            className={"button is-success is-outlined"}
                            id={"editProfile"}
                            onClick={EditProfile}>
                            <span className={"icon"}>
                                <i className={"far fa-edit"} />
                            </span>
                            <span>{"Edit my profile"}</span>
                        </button>
                        <button
                            className={"button is-success is-outlined"}
                            id={"saveProfile"}
                            style={{display: "none"}}
                            onClick={SaveChanges}>
                            <span className={"icon is-small"}>
                                <i className={"fas fa-check"} />
                            </span>
                            <span>{"Save changes"}</span>
                        </button>
                        <button
                            className={"button is-danger is-outlined"}
                            id={"cancelProfile"}
                            style={{display: "none"}}
                            onClick={CloseProfile}>
                            <span>{"Cancel changes"}</span>
                            <span className={"icon is-small"}>
                                <i className={"fas fa-times"} />
                            </span>
                        </button>
                    </p>
                </footer>
            </div>
        </div>
    );
}
