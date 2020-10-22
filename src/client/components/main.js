/* becodeorg/mwenbwa
 *
 * /src/client/components/hello.js - Hello Component
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

import * as React from "react";
import {Map, TileLayer} from "react-leaflet";
import api from "../axios/config";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trees: [],
            boundsno: [],
            boundsse: [],
        };
        this.timer = null;
        this.handleMoveMap = this.handleMoveMap.bind(this);
        this.currentMap = React.createRef();

        this.handleTimeout = () => {
            this.timer = setTimeout(() => {
                this.handleMoveMap();
            }, 1000);
        };
    }

    componentDidMount() {
        api.get("/treeslist").then(res => {
            const trees = res.data;
            this.setState({trees});
        });
        this.handleTimeout();
    }
    componentDidUpdate() {
        clearTimeout(this.timer);
        this.timer = null;
    }
    componentWillUnmount() {
        clearTimeout(this.timer);
        this.timer = null;
    }

    handleMoveMap() {
        const myMap = this.currentMap.current;
        const bounds = myMap.leafletElement.getBounds();
        const nordOuest = bounds.getNorthWest();
        const sudEst = bounds.getSouthEast();
        if (
            this.state.boundsno !== nordOuest ||
            this.state.boundsse !== sudEst
        ) {
            this.setState({
                boundsno: [nordOuest.lat, nordOuest.lng],
                boundsse: [sudEst.lat, sudEst.lng],
            });
        }
    }
    render() {
        return (
            <Map
                center={[50.6451381, 5.5734203]}
                zoom={17}
                maxZoom={18}
                minZoom={17}
                onMoveEnd={this.handleTimeout}
                ref={this.currentMap}>
                {/* {this.state.trees.map(tree => (
                    <Marker
                        key={tree._id}
                        position={[
                            tree.location.coordinates[1],
                            tree.location.coordinates[0],
                        ]}
                    />
                ))} */}
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
