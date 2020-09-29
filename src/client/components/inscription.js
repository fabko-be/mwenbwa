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
                <div className={"div is-primary"}>{"Confirm"}</div>
            </form>
        </section>
    </div>
);

export default Inscription;
