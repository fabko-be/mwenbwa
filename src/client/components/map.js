/* becodeorg/mwenbwa
 *
 * /src/client/components/hello.js - Hello Component
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

import * as React from "react";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import api from "../axios/config";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {renderToStaticMarkup} from "react-dom/server";
import L from "leaflet";

export default class LeafletMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trees: [],
        };
        this.handleMoveMap = this.handleMoveMap.bind(this);
        this.handleBuyClick = this.handleMoveMap.bind(this);
        this.currentMap = React.createRef();
    }
    componentDidMount() {
        this.handleMoveMap();
        console.log("mount");
    }
    componentDidUpdate() {
        console.log("update");
    }

    handleMoveMap() {
        const myMap = this.currentMap.current;
        const bounds = myMap.leafletElement.getBounds();
        const nordOuest = bounds.getNorthWest();
        const sudEst = bounds.getSouthEast();
        const data = {
            headers: {
                "Content-Type": "application/json",
                north: nordOuest.lat,
                west: nordOuest.lng,
                south: sudEst.lat,
                east: sudEst.lng,
            },
        };
        api.get("/displaytrees", data).then(res => {
            const trees = res.data;
            this.setState({trees});
        });
    }
    onBuyClick() {
        const test = "test";
        console.log(test);
    }

    render() {
        const color = "#00AA00";
        return (
            <Map
                center={[50.6451381, 5.5734203]}
                zoom={17}
                maxZoom={18}
                minZoom={16}
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
                            opacity={tree.isLock ? 0.5 : 1}
                            riseOnHover={true}
                            icon={L.divIcon({
                                html: renderToStaticMarkup(
                                    <i
                                        className={"fa fa-tree fa-2x"}
                                        style={{
                                            color: tree.owner
                                                ? tree.owner.color
                                                : color,
                                        }}
                                    />,
                                ),
                            })}>
                            <Popup autoPan={false}>
                                <h1>{tree.name ? tree.name : "A vendre"}</h1>
                                <div
                                    style={{
                                        marginBottom: "10px",
                                        display: "inline",
                                    }}>
                                    <p style={{marginBottom: "5px"}}>
                                        {"WikiLink :"}
                                    </p>
                                    <a
                                        href={`https://wikipedia.org/wiki/${tree.nom_complet}`}
                                        target={`_blank`}
                                        style={{fontSize: "14px"}}>
                                        {tree.nom_complet}
                                    </a>
                                </div>
                                <p
                                    style={{
                                        display: tree.isLock ? "none" : "",
                                    }}>
                                    {`price : ${tree.value} leave(s)`}
                                </p>
                                <button
                                    // eslint-disable-next-line react/jsx-handler-names
                                    onClick={this.onBuyClick}
                                    type={"button"}
                                    disabled={tree.isLock}>
                                    {`Buy`}
                                </button>
                                <button type={"button"} disabled={tree.isLock}>
                                    {tree.isLock ? `Locked` : "lock"}
                                </button>
                                <button type={"button"}>{`Details`}</button>
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </Map>
        );
    }
}
