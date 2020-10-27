/* becodeorg/mwenbwa
 *
 * /src/client/components/hello.js - Hello Component
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

import * as React from "react";
import LeafletMap from "./map";
import Overlay from "./overlay";

export default class Main extends React.Component {
    render() {
        return (
            <div>
                <Overlay />
                <LeafletMap />
            </div>
        );
    }
}
