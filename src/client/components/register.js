/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/button-has-type */
/* eslint-disable no-invalid-this */
/* eslint-disable react/jsx-handler-names*/
import React from "react";
import "../../lib/jscolor-2.1.0/jscolor";
import {ChromePicker} from "react-color";
//import {icon} from "leaflet";
import {Route} from "react-router-dom";

class RegisterPage extends React.Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordCheck = this.handlePasswordCheck.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            color: "",
            iconPass1: "",
            iconPass2: "",
            iconUsername: "",
            redirect: false,
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
        console.log(e.target.value);
    }

    handleUsername() {
        const userInput = document.querySelector("#username");
        const username = userInput.value;

        console.log(username);
        const userWarning = document.querySelector("#usernameUsed");
        // e.preventDefault();

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

        // response.message === "Ce pseudo est déjà utilisé."

        // response.message === "This username is available."
        //     if (username.length < 2) {
        //         userInput.classList.remove("is-success");
        //         userInput.classList.add("is-danger");
        //         userWarning.innerHTML =
        //             "This username is too short. Please try another.";
        //     } else {
        //         fetch(url, options)
        //             .then((response) => {
        //                 if (response.status === 401) {
        //                     console.log(response.data);
        //                     console.log(response.message);
        //                     // that.setState({iconUsername: false});
        //                     // console.log(this.state.iconUsername);
        //                     userWarning.innerHTML =
        //                         "This username is incorrect. Please try another.";
        //                     userInput.classList.remove("is-success");
        //                     userInput.classList.add("is-danger");
        //                 } else if (response.status === 201) {
        //                     // userWarning.innerHTML = "This username is available.";
        //                     // this.setState({iconUsername: true});
        //                     userWarning.innerHTML = "";
        //                     userInput.classList.remove("is-danger");
        //                     userInput.classList.add("is-success");
        //                 } else {
        //                     console.log("Problem with the username check");
        //                 }
        //             })
        //             .catch((error) => {
        //                 console.log(`Problem with fetch : ${error}`);
        //             });
        //     }
        // }

        if (username.length < 2) {
            userInput.classList.remove("is-success");
            userInput.classList.add("is-danger");
            userWarning.innerHTML =
                "This username is too short. Please try another.";
        } else {
            fetch(url, options)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data);
                        // userWarning.innerHTML = "This username is available.";
                        // this.setState({iconUsername: true});
                        userWarning.innerHTML = "";
                        userInput.classList.remove("is-danger");
                        userInput.classList.add("is-success");
                    } else {
                        // that.setState({iconUsername: false});
                        // console.log(this.state.iconUsername);
                        console.log(response.data);
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

    handleEmail() {
        const emailInput = document.querySelector("#email");
        const email = emailInput.value;
        console.log(email);

        const emailWarning = document.querySelector("#emailUsed");
        // e.preventDefault();

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
                if (response.status === 200) {
                    // emailWarning.innerHTML = "This email is available.";
                    // this.setState({iconUsername: true});
                    emailWarning.innerHTML = "";
                    emailInput.classList.remove("is-danger");
                    emailInput.classList.add("is-success");
                } else {
                    // that.setState({iconUsername: false});
                    // console.log(this.state.iconUsername);
                    emailWarning.innerHTML =
                        "This email is not available. Please try another.";
                    emailInput.classList.remove("is-success");
                    emailInput.classList.add("is-danger");
                }
            })
            .catch((error) => {
                console.log(`Problem with fetch : ${error}`);
            });
    }

    //     fetch(url, options)
    //     .then((response) => {
    //         if (response.status === 401) {
    //             console.log(response.data);
    //             console.log(response);
    //             // that.setState({iconUsername: false});
    //             // console.log(this.state.iconUsername);
    //             emailWarning.innerHTML =
    //                 "This email is not available. Please try another.";
    //             emailInput.classList.remove("is-success");
    //             emailInput.classList.add("is-danger");
    //         } else if (response.status === 200) {
    //             console.log(response.data);
    //             // emailWarning.innerHTML = "This email is available.";
    //             // this.setState({iconUsername: true});
    //             emailWarning.innerHTML = "";
    //             emailInput.classList.remove("is-danger");
    //             emailInput.classList.add("is-success");
    //         } else {
    //             console.log("Problem with the email check");
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(`Problem with fetch : ${error}`);
    //     });
    // }

    handlePasswordCheck() {
        const password = this.state.password;
        const passwordConfirmation = this.state.passwordConfirmation;
        const passwordLength = document.querySelector("#password").value;
        const passwordInput = document.querySelector("#password");
        const passwordConfirmationInput = document.querySelector(
            "#passwordConfirmation",
        );
        const passwordConfirmationLength = document.querySelector(
            "#passwordConfirmation",
        ).value;
        const verify1 = document.querySelector("#passwordLength");
        const verify2 = document.querySelector("#passwordMatch");

        // valeur mise à 4 pour les tests
        if (passwordLength.length < 4) {
            this.setState({iconPass1: false});
            verify1.innerHTML = "Your password needs at leat 4 characters.";
            passwordInput.classList.remove("is-success");
            passwordInput.classList.add("is-danger");
            // iconPass1.classList.remove("fas fa-check");
            // iconPass1.classList.add("fas fa-exclamation-triangle");
        } else {
            // this.state.iconPass1 = "fas fa-check";
            this.setState({iconPass1: true});
            verify1.innerHTML = "";
            passwordInput.classList.remove("is-danger");
            passwordInput.classList.add("is-success");
        }

        if (
            password !== passwordConfirmation ||
            this.state.iconPass1 === false ||
            passwordConfirmationLength.length < 4
        ) {
            this.setState({iconPass2: false});
            verify2.innerHTML = "The two passwords do not match !";
            verify2.classList.remove("is-success");
            verify2.classList.add("is-danger");
            passwordConfirmationInput.classList.remove("is-success");
            passwordConfirmationInput.classList.add("is-danger");
        } else {
            this.setState({iconPass2: true});
            verify2.innerHTML = "Passwords match !";
            verify2.classList.add("is-success");
            verify2.classList.remove("is-danger");
            passwordConfirmationInput.classList.add("is-success");
            passwordConfirmationInput.classList.remove("is-danger");
        }
    }

    handleChangeComplete = (color) => {
        this.setState({color: color.hex});
    };

    handleSubmit(e) {
        e.preventDefault();

        console.log(this.state);

        const data = this.state;
        const url = "api/auth/signup";
        const options = {
            method: "POST",
            headers: {
                // accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            withCredentials: true,
        };

        console.log(JSON.stringify(data));

        fetch(url, options)
            .then((response) => {
                if (response.ok) {
                    console.log(response.data);
                    this.setState({redirect: true});
                } else {
                    console.log(
                        `Request rejected with status ${response.status}`,
                    );
                }
            })
            .catch((error) => {
                console.log(`Problem with fetch : ${error}`);
            });

        e.preventDefault();
    }

    render() {
        const {redirect} = this.state;
        if (redirect) {
            return <Route path={"/"} />;
        }
        return (
            <div
                className={
                    this.props.showRegister ? "modal is-active" : "modal"
                }>
                <div
                    className={"modal-background"}
                    onClick={this.props.handleCloseRegister}
                />
                <div className={"modal-card"}>
                    <header className={"modal-card-head"}>
                        <p className={"modal-card-title"}>{"Register"}</p>
                        <button
                            className={"delete"}
                            aria-label={"close"}
                            onClick={this.props.handleCloseRegister}
                        />
                    </header>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <section
                                className={"modal-card-body has-text-centered"}>
                                <div className={"field is-horizontal"}>
                                    <div className={"field-label is-normal"}>
                                        <label className={"label"}>
                                            {"Username"}
                                        </label>
                                    </div>
                                    <div className={"field-body"}>
                                        <div className={"field"}>
                                            <div
                                                className={
                                                    "control has-icons-left has-icons-right"
                                                }>
                                                <input
                                                    id={"username"}
                                                    className={"input"}
                                                    type={"text"}
                                                    name={"username"}
                                                    value={this.state.username}
                                                    onChange={this.handleChange}
                                                    placeholder={
                                                        "Your username here"
                                                    }
                                                    onBlur={this.handleUsername}
                                                />
                                                <span
                                                    className={
                                                        "icon is-small is-left"
                                                    }>
                                                    <i
                                                        className={
                                                            "fas fa-user"
                                                        }
                                                    />
                                                </span>

                                                <span
                                                    className={
                                                        "icon is-small is-right"
                                                    }>
                                                    <i
                                                        className={
                                                            "fas fa-check"
                                                        }
                                                    />
                                                </span>
                                            </div>
                                            <p
                                                id={"usernameUsed"}
                                                className={"help is-danger"}>
                                                {""}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={"field is-horizontal"}>
                                    <div className={"field-label is-normal"}>
                                        <label className={"label"}>
                                            {"Email"}
                                        </label>
                                    </div>
                                    <div className={"field-body"}>
                                        <div className={"field"}>
                                            <div
                                                className={
                                                    "control has-icons-left has-icons-right"
                                                }>
                                                <input
                                                    id={"email"}
                                                    className={
                                                        "input is-danger"
                                                    }
                                                    type={"email"}
                                                    name={"email"}
                                                    value={this.state.email}
                                                    onChange={this.handleChange}
                                                    placeholder={
                                                        "Your email here"
                                                    }
                                                    onBlur={this.handleEmail}
                                                />
                                                <span
                                                    className={
                                                        "icon is-small is-left"
                                                    }>
                                                    <i
                                                        className={
                                                            "fas fa-envelope"
                                                        }
                                                    />
                                                </span>
                                                <span
                                                    className={
                                                        "icon is-small is-right"
                                                    }>
                                                    <i
                                                        className={
                                                            "fas fa-exclamation-triangle"
                                                        }
                                                    />
                                                </span>
                                            </div>
                                            <p
                                                id={"emailUsed"}
                                                className={"help"}>
                                                {""}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={"field is-horizontal"}>
                                    <div className={"field-label is-normal"}>
                                        <label className={"label"}>
                                            {"Password"}
                                        </label>
                                    </div>
                                    <div className={"field-body"}>
                                        <div className={"field"}>
                                            <p
                                                className={
                                                    "control has-icons-left has-icons-right"
                                                }>
                                                <input
                                                    id={"password"}
                                                    className={"input"}
                                                    type={"password"}
                                                    name={"password"}
                                                    value={this.state.password}
                                                    onChange={this.handleChange}
                                                    placeholder={"Password"}
                                                    onKeyUp={
                                                        this.handlePasswordCheck
                                                    }
                                                    required
                                                />
                                                <span
                                                    className={
                                                        "icon is-small is-left"
                                                    }>
                                                    <i
                                                        className={
                                                            "fas fa-lock"
                                                        }
                                                    />
                                                </span>
                                                <span
                                                    className={
                                                        "icon is-small is-right"
                                                    }>
                                                    <i
                                                        id={"iconPass1"}
                                                        className={
                                                            this.state
                                                                .iconPass1 ===
                                                            true
                                                                ? "fas fa-check"
                                                                : "fas fa-exclamation-triangle"
                                                        }
                                                    />
                                                </span>
                                            </p>
                                            <p
                                                id={"passwordLength"}
                                                className={"help is-danger"}>
                                                {"This field is required"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={"field is-horizontal"}>
                                    <div className={"field-label is-normal"}>
                                        <label className={"label"}>
                                            {"Confirm password"}
                                        </label>
                                    </div>
                                    <div className={"field-body"}>
                                        <div className={"field"}>
                                            <p
                                                className={
                                                    "control has-icons-left has-icons-right"
                                                }>
                                                <input
                                                    id={"passwordConfirmation"}
                                                    className={"input"}
                                                    name={
                                                        "passwordConfirmation"
                                                    }
                                                    type={"password"}
                                                    placeholder={
                                                        "Confirm your password"
                                                    }
                                                    onChange={this.handleChange}
                                                    onKeyUp={
                                                        this.handlePasswordCheck
                                                    }
                                                    required
                                                />
                                                <span
                                                    className={
                                                        "icon is-small is-left"
                                                    }>
                                                    <i
                                                        className={
                                                            "fas fa-lock"
                                                        }
                                                    />
                                                </span>
                                                <span
                                                    className={
                                                        "icon is-small is-right"
                                                    }>
                                                    <i
                                                        id={"iconPass2"}
                                                        className={
                                                            this.state
                                                                .iconPass2 ===
                                                            true
                                                                ? "fas fa-check"
                                                                : "fas fa-exclamation-triangle"
                                                        }
                                                    />
                                                </span>
                                            </p>
                                            <p
                                                id={"passwordMatch"}
                                                className={"help"}>
                                                {""}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={"field is-horizontal"}>
                                    <div className={"field-label is-normal"}>
                                        <label className={"label"}>
                                            {"Pick a color"}
                                        </label>
                                    </div>
                                    <div className={"field-body"}>
                                        <div className={"field"}>
                                            <div
                                                className={
                                                    "control has-icons-left has-icons-right"
                                                }>
                                                <ChromePicker
                                                    disableAlpha={true}
                                                    color={this.state.color}
                                                    onChangeComplete={
                                                        this
                                                            .handleChangeComplete
                                                    }
                                                />

                                                <span
                                                    className={
                                                        "icon is-small is-left"
                                                    }>
                                                    <i
                                                        className={
                                                            "fas fa-palette"
                                                        }
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <footer
                                className={"modal-card-foot"}
                                style={{justifyContent: "center"}}>
                                <button
                                    type={"submit"}
                                    className={
                                        "button is-warning is-outlined is-fullwidth"
                                    }>
                                    {"Register"}
                                </button>
                            </footer>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterPage;
