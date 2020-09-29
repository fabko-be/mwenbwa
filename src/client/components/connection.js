import * as React from "react";

const Connection = () => (
    <div>
        <section className={"card-image has-text-centered"}>
            <h1 className={"title"}>{"Connection"}</h1>
            <form>
                <label>{"Pseudo"}</label>
                <input type={"text"} />
                <br />
                <br />
                <label>{"Password"}</label>
                <input type={"password"} />
                <br />
                <br />
                <div className={"buttons card-image has-text-centered"}>
                    <div className={"button is-primary"}>{"Enter"}</div>
                    <div className={"button is-primary"}>{"Sign up"}</div>
                </div>
            </form>
        </section>
        <br />
    </div>
);

export default Connection;
