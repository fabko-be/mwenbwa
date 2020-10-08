import * as React from "react";
import inscription from "./inscription";
const card = {
    backgroundImage:
        "url(" +
        "https://www.lesoir.be/sites/default/files/dpistyles_v2/ena_16_9_extra_big/2018/04/08/node_150098/18980066/public/2018/04/08/B9715327921Z.1_20180408212616_000+GM4B2AFN3.1-0.png.jpg" +
        ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
};

const border = {
    border: "solid green 3px",
    backgroundColor: "#FFFFFF",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "5%",
};

const Connection = () => (
    <div>
        <div style={card}>
            <section className={"card-image has-text-centered"}>
                <form style={border}>
                    <br />
                    <h1 className={"title"}>{"Connection"}</h1>
                    <label className={"card-image has-text-centered"}>
                        {"Pseudo"}
                    </label>
                    <input type={"text"} />
                    <br />
                    <br />
                    <label className={"card-image has-text-centered"}>
                        {"Password"}
                    </label>
                    <input type={"password"} />
                    <br />
                    <br />
                    <div className={"buttons card-image has-text-centered"}>
                        <div
                            className={"button is-primary"}>
                            {/* // onClick={"Enter"} */}
                            Enter
                        </div>
                        <inscription />
                    </div>
                    <br />
                </form>
            </section>
        </div>
        <br />
    </div>
);

export default Connection;
