import React, {useState, useEffect} from "react";
import MapLeaflet from "./map";
import Menu from "./menu";

import {UserProvider} from "./mwenbwa-context";
import {loadUserData} from "../utils/storage-manager";
import EE from "eventemitter3";
import io from "socket.io-client";

require("../styles/mystyles.css");
import "react-toastify/dist/ReactToastify.css";

const Game = () => {
    const validateUserData = () => {
        const data = loadUserData();
        if (!data) {
            return null;
        }

        if (new Date(data.expiresAt) - new Date() <= 0) {
            return null;
        }
        return data;
    };
    const [EventEmitter] = useState(new EE());
    const [user, setUser] = useState(validateUserData());
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (user) {
            const trees = io.connect(`${document.baseURI}trees`);
            trees.on("tree.updated", data => {
                EventEmitter.emit(data.updatedTree._id);
            });

            const leaves = io.connect(`${document.baseURI}leaves`);
            leaves.on(user.userId, data => {
                setUser(oldUser => ({
                    ...oldUser,
                    totalLeaves: data.totalLeaves,
                }));
            });
            setSocket({trees, leaves});
        }

        return () => {
            if (socket) {
                socket.trees.disconnect();
            }
        };
    }, [user]);

    return (
        <div>
            <UserProvider value={{EventEmitter, user, setUser}}>
                <Menu />
                <MapLeaflet
                    center={
                        user
                            ? [user.startPosition[1], user.startPosition[0]]
                            : null
                    }
                />
            </UserProvider>
        </div>
    );
};

export default Game;
