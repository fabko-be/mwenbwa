/* eslint-disable no-console */
/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/button-has-type */
/*eslint-disable no-use-before-define */

import React, {useContext, useEffect, useState} from "react";
import L from "leaflet";
import {Marker, Popup} from "react-leaflet";
import UserContext from "./mwenbwa-context";
import {toast} from "react-toastify";

const MBMarker = (props) => {
    const [tree, setTree] = useState(props.tree);
    const [buyprice, setBuyprice] = useState(null);
    const [lockprice, setLockprice] = useState(null);

    const svgPath = `<?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
    <path style="fill:${
        tree.owner ? tree.owner.color : "#AFD755"
    };" d="M409.259,188.286L409.259,188.286c10.919-15.295,17.409-33.966,17.409-54.19
        c0-51.617-41.843-93.46-93.46-93.46c-0.765,0-1.506,0.096-2.266,0.115C314.999,16.241,287.418,0,256.001,0
        c-36.446,0-67.742,21.843-81.661,53.125c-55.855,14.591-97.133,65.242-97.133,125.669c0,33.224,12.565,63.44,33.068,86.426
        c-0.354,3.654-0.561,7.351-0.561,11.098c0,62.838,50.94,113.778,113.778,113.778c6.849,0,34.125-0.611,40.635-1.779l2.754-28.16
        c16.099,8.725,34.537,13.685,54.134,13.685c62.838,0,113.778-50.94,113.778-113.778
        C434.795,232.839,425.207,207.869,409.259,188.286z"/>
    <path style="fill:
    ${
        tree.owner
            ? `#${
                  tree.owner.color
                      ? (
                            ((parseInt(tree.owner.color.substr(1), 16) &
                                0x7e7e7e) >>
                                1) |
                            (parseInt(tree.owner.color.substr(1), 16) &
                                0x808080)
                        ).toString(16)
                      : "#96BE4B"
              }`
            : "#96BE4B"
    };" d="M264.128,347.329c-13.04,3.364-27.479,3.251-42.911-4.038c-20.9-9.871-36.045-29.934-38.096-52.956
        c-0.806-9.043,0.268-17.732,2.845-25.748c1.013-3.152-0.291-6.5-2.851-8.6c-19.979-16.387-32.765-41.211-32.765-69.067
        c0-36.149,21.496-67.201,52.372-81.278c3.222-1.469,5.3-4.672,4.943-8.195c-0.268-2.649-0.426-5.33-0.426-8.051
        c0-42.338,29.465-77.718,68.985-86.964C269.714,0.92,262.974,0,256.001,0c-36.446,0-67.742,21.843-81.661,53.125
        c-55.855,14.591-97.133,65.242-97.133,125.669c0,33.224,12.565,63.44,33.068,86.426c-0.354,3.654-0.561,7.351-0.561,11.098
        c0,62.838,50.94,113.778,113.778,113.778c6.849,0,34.125-0.611,40.635-1.779v-24.835v-16.153H264.128z"/>
    <path style="fill:#AF6E5A;" d="M247.874,349.46c-0.261,0-0.512-0.036-0.772-0.039l-7.355,154.452h48.762l-7.197-151.124
        c-0.258-5.414-5.677-9.317-10.75-7.41C263.502,347.993,255.865,349.46,247.874,349.46z"/>
    <path style="fill:#965A50;" d="M281.312,352.749c-0.258-5.414-5.677-9.317-10.75-7.41c-7.06,2.654-14.697,4.122-22.688,4.122
        c-0.261,0-0.512-0.036-0.772-0.039l-7.355,154.452h24.381V371.572c0-3.499,2.239-6.604,5.557-7.71l11.967-3.989L281.312,352.749z"/>
    <path style="fill:#96BE4B;" d="M304.763,512h-81.27c-4.488,0-8.127-3.635-8.127-8.127s3.639-8.127,8.127-8.127h81.27
        c4.488,0,8.127,3.635,8.127,8.127S309.251,512,304.763,512z"/>
    
    </svg>`;
    const treeIcon = L.icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(svgPath)}`,
        iconAnchor: [0, 0],
        popupAnchor: [0, 0],
        iconSize: [30, 30],
    });

    const UserCont = useContext(UserContext);

    useEffect(() => {
        //Listen for a event name on treeId
        UserCont.EventEmitter.on(tree._id, () => {
            //On event -> fetch new data
            fetch(`${document.URL}trees/${tree._id}`)
                .then((result) => {
                    //parse data -> set state -> re-render
                    result.json().then((res) => {
                        setTree(res);
                    });
                })
                .catch((err) => {
                    toast.warning(
                        `Problem with the connection !${err.toString()}`,
                    );
                });
        });

        return () => {
            UserCont.EventEmitter.off(tree._id);
        };
    }, []);

    const fetchPrice = (forBuying) => {
        if (UserCont.user !== null) {
            fetch(
                `${document.baseURI}trees/${tree._id}/${
                    forBuying ? "buyprice" : "lockprice"
                }`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `bearer ${UserCont.user?.token}`,
                    },
                },
            )
                .then((result) => {
                    if (result.ok) {
                        result.json().then((res) => {
                            //eslint-disable-next-line
                            forBuying
                                ? setBuyprice(res.price)
                                : setLockprice(res.price);
                        });
                    } else {
                        if (result.status === 406) {
                            setBuyprice(0);
                        }
                    }
                })
                .catch((err) => {
                    toast.warning(
                        `Problem with the connection !${err.toString()}`,
                    );
                });
        }
    };

    const getPrices = () => {
        if (UserCont.user) {
            if (tree.owner && tree.owner._id === UserCont.user.userId) {
                fetchPrice(false);
            }
            if (!tree.isLocked && tree.owner?._id !== UserCont.user.userId) {
                fetchPrice(true);
            }
        }
    };

    const lockTheTree = () => {
        fetch(`${document.baseURI}trees/${tree._id}/lock`, {
            method: "POST",
            headers: {
                Authorization: `bearer ${UserCont.user.token}`,
            },
        })
            .then((result) => {
                if (result.ok) {
                    result.json().then((json) => {
                        UserCont.user.totalLeaves = json;
                    });
                }
            })
            .catch((err) => {
                toast.warning(`Problem with the connection !${err.toString()}`);
            });
    };

    const buyTheTree = () => {
        fetch(`${document.baseURI}trees/${tree._id}/buy`, {
            method: "POST",
            headers: {
                Authorization: `bearer ${UserCont.user.token}`,
            },
        })
            .then((result) => {
                if (result.ok) {
                    result.json().then((json) => {
                        tree.owner = UserCont.user.userId;
                        UserCont.setUser({
                            ...UserCont.user,
                            totalLeaves: json.remainingLeaves,
                        });
                    });
                }
            })
            .catch((err) => {
                toast.warning(`Problem with the connection !${err.toString()}`);
            });
    };

    return (
        <React.Fragment>
            <Marker
                icon={treeIcon}
                position={[
                    tree.position.coordinates[1],
                    tree.position.coordinates[0],
                ]}>
                <Popup autoPan={false} onOpen={getPrices}>
                    <div className={"card"}>
                        {/* <div className={"card-image"}>
                            <figure className={"image is-2by1"}>
                                <img src={"https://i.imgur.com/3zhuFWl.png"} />
                            </figure>
                        </div> */}
                        <div className={"card-content"}>
                            <div className={"media"}>
                                <div className={"media-content"}>
                                    <p className={"title is-4"}>
                                        {tree.name ? tree.name : "Free tree"}
                                    </p>
                                    <p className={"subtitle is-6"}>
                                        {tree.owner
                                            ? `Owned by ${tree.owner.username}`
                                            : "Free"}
                                    </p>
                                </div>
                            </div>
                            <div className={"content"}>
                                <p>
                                    <a
                                        rel={"noreferrer"}
                                        target={"_blank"}
                                        href={
                                            tree.wikiLink ? tree.wikiLink : ""
                                        }>
                                        {"Tree's specie"}
                                    </a>
                                </p>
                                <p>{`Tree's height :${tree.hauteur_totale}`}</p>
                                <p>{`Tree's diameter : ${tree.circonf}`}</p>
                                <p className={"title is-6"}>
                                    {`Base value: ${tree.value} leaves`}
                                </p>
                            </div>
                            {tree.isLocked || UserCont.user === null ? (
                                <></>
                            ) : (
                                <div className={"content is-flex"}>
                                    {tree.owner?._id !==
                                    UserCont.user?.userId ? (
                                        <button
                                            href={"#"}
                                            type={"button"}
                                            disabled={
                                                buyprice === null ||
                                                buyprice === 0
                                            }
                                            className={`button is-success ${
                                                buyprice === null
                                                    ? "is-loading"
                                                    : ""
                                            }`}
                                            onClick={buyTheTree}>
                                            {`Buy : ${
                                                buyprice !== 0
                                                    ? buyprice
                                                    : "Out zoned"
                                            }`}
                                        </button>
                                    ) : (
                                        <button
                                            style={{width: "100%"}}
                                            type={"button"}
                                            disabled={
                                                lockprice === null ||
                                                lockprice === 0
                                            }
                                            className={`button is-success ${
                                                lockprice === null
                                                    ? "is-loading"
                                                    : ""
                                            }`}
                                            onClick={lockTheTree}>
                                            {`Lock : ${lockprice}`}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </Popup>
            </Marker>
        </React.Fragment>
    );
};

export default MBMarker;
