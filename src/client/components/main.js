/* becodeorg/mwenbwa
 *
 * /src/client/components/hello.js - Hello Component
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

import * as React from "react";
import {Map, TileLayer, Marker} from "react-leaflet";
import api from "../axios/config";
import MarkerClusterGroup from "react-leaflet-markercluster";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trees: [],
            boundsno: [50.647589686768306, 5.568888187408448],
            boundsse: [50.642691248989884, 5.5779433250427255],
        };
        this.getTrees = this.getTrees.bind(this);
        this.handleMoveMap = this.handleMoveMap.bind(this);
        this.currentMap = React.createRef();
    }
    componentDidMount() {
        this.handleMoveMap();
        this.getTrees();
    }
    getTrees() {
        const data = {
            headers: {
                "Content-Type": "application/json",
                north: this.state.boundsno[0],
                west: this.state.boundsno[1],
                south: this.state.boundsse[0],
                east: this.state.boundsse[1],
            },
        };
        api.get("/displaytrees", data).then(res => {
            const trees = res.data;
            this.setState({trees});
        });
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
            this.getTrees();
        }
    }
    render() {
        return (
            <Map
                center={[50.6451381, 5.5734203]}
                zoom={17}
                maxZoom={18}
                minZoom={17}
                onMoveEnd={this.handleMoveMap}
                ref={this.currentMap}>
                <TileLayer
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    attribution={
                        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    }
                />
                <MarkerClusterGroup disableClusteringAtZoom={18}>
                    {this.state.trees.map(tree => (
                        <Marker
                            key={tree._id}
                            position={[
                                tree.location.coordinates[1],
                                tree.location.coordinates[0],
                            ]}
                        />
                    ))}
                </MarkerClusterGroup>
            </Map>
        );
    }
}
