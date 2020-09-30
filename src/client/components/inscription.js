import * as React from "react";

const Inscription = () => (
    <div>
        <section className={"card-image has-text-centered"}>
            <form>
                <h1 className={"title"}>{"Inscription"}</h1>
                <label>{"Pseudo"}</label>
                <input type={"text"} />
                <br />
                <br />
                <label>{"Email"}</label>
                <input type={"email"} />
                <br />
                <br />
                <label>{"Password"}</label>
                <input type={"password"} />
                <br />
                <br />
                <label>{"Confirm Password"}</label>
                <input type={"password"} />
                <br />
                <br />
                <div>
                    <label htmlFor={"color"}>{"Color"}</label>
                    <input type={"color"} name={"color"} value={"color"} />
                </div>
                <br />
                <div className={"button is-primary"}>{"Confirm"}</div>
            </form>
        </section>
    </div>
);

export default Inscription;
