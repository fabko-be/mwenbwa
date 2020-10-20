/* becodeorg/mwenbwa
 *
 * /src/client/components/hello.js - Hello Component
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

import * as React from "react";
import {Map, TileLayer} from "react-leaflet";
// import {importAllTrees} from "../axios/config";

export default class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            lat: 50.6451381,
            lon: 5.5734203,
            zoom: 15,
        };
    }
    render() {
        const position = [this.state.lat, this.state.lon];
        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    attribution={
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    }
                />
            </Map>
        );
    }
}
