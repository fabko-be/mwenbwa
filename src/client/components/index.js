/* becodeorg/mwenbwa
 *
 * /src/client/components/hello.js - Hello Component
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */
import Title from "./title";
import Connection from "./connection";
import Inscription from "./inscription";
import React from "react";

export default function App() {
    return (
        <div>
            <Title />
            <Connection />
            <Inscription />
        </div>
    );
}
