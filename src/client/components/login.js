import React from "react";
import UserContext from "../components/mwenbwa-context";
import {saveUserData} from "../utils/storage-manager";
import {toast} from "react-toastify";

class LoginPage extends React.Component {
    static contextType = UserContext;

    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            email: "",
            password: "",
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const data = this.state;

        const url = "api/auth/login";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const emailInput = document.querySelector("#emailInput");
        const passwordInput = document.querySelector("#passwordInput");
        const wrong = document.querySelector("#wrong");
        
        fetch(url, options)
            .then(response => {
                if (response.ok) {
                    console.log(response.error);
                    response.json().then(json => {
                        toast.success(`you're connected`);
                        saveUserData(json);
                        this.context.setUser(json);
                    });
                } else {
                    console.log(
                        `Request rejected with status ${response.status}`,
                    );
                    emailInput.classList.add("is-danger");
                    passwordInput.classList.add("is-danger");
                    const msg =
                        "Your email or password is wrong. Please try again.";
                    wrong.innerHTML = msg;
                    toast.error(`Wrong email or password !`);
                }
            })
            .catch(error => {
                toast.error(`${error.toString()}`);
            });

        event.preventDefault();
    }

    render() {
        return (
            <div className={this.props.showLogin ? "modal is-active" : "modal"}>
                <div
                    className={"modal-background"}
                    onClick={this.props.handleCloseLogin}
                />
                <div className={"modal-card"}>
                    <header className={"modal-card-head"}>
                        <p className={"modal-card-title"}>{"Login"}</p>
                        <button
                            className={"delete"}
                            aria-label={"close"}
                            onClick={this.props.handleCloseLogin}
                        />
                    </header>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <section
                                className={"modal-card-body has-text-centered"}>
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
                                                    id={"emailInput"}
                                                    className={"input"}
                                                    type={"email"}
                                                    name={"email"}
                                                    value={this.state.email}
                                                    onChange={this.handleChange}
                                                    placeholder={
                                                        "Your email here"
                                                    }
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
                                            </div>
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
                                                    "control has-icons-left"
                                                }>
                                                <input
                                                    id={"passwordInput"}
                                                    className={"input"}
                                                    type={"password"}
                                                    name={"password"}
                                                    value={this.state.password}
                                                    onChange={this.handleChange}
                                                    placeholder={"Password"}
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
                                            </p>
                                            <p
                                                id={"wrong"}
                                                className={"help is-danger"}>
                                                {""}
                                            </p>
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
                                    {"Login"}
                                </button>
                            </footer>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginPage;
