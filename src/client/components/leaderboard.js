import React, {useState} from "react";

export default function LeaderboardPage(props) {
    const [viewLeaf, setViewLeaf] = useState([]);
    const [viewTree, setViewTree] = useState([]);

    function handleRankByTrees() {
        document
            .querySelector("#clickedTree")
            .setAttribute("class", "is-active");
        document.querySelector("#treeRanking").removeAttribute("style");
        document.querySelector("#clickedLeaf").removeAttribute("class");
        document
            .querySelector("#leafRanking")
            .setAttribute("style", "display: none");
        fetch("leaderboard/trees")
            .then(res => res.json())
            .then(elem => {
                setViewTree(elem);
            });
    }

    function handleRankByLeaves() {
        document
            .querySelector("#clickedLeaf")
            .setAttribute("class", "is-active");
        document.querySelector("#leafRanking").removeAttribute("style");
        document.querySelector("#clickedTree").removeAttribute("class");
        document
            .querySelector("#treeRanking")
            .setAttribute("style", "display: none");
        fetch("leaderboard/leaves")
            .then(res => res.json())
            .then(elem => {
                setViewLeaf(elem);
            });
    }

    return (
        <div className={props.showLeaderboard ? "modal is-active" : "modal"}>
            <div
                className={"modal-background"}
                onClick={props.handleCloseLeaderboard}
            />
            <div className={"modal-card"}>
                <header className={"modal-card-head"}>
                    <p className={"modal-card-title"}>{"Leaderboard"}</p>
                    <button
                        className={"delete"}
                        aria-label={"close"}
                        onClick={props.handleCloseLeaderboard}
                    />
                </header>
                <section className={"modal-card-body has-text-centered"}>
                    <div className={"tabs is-centered"}>
                        <ul>
                            <li id={"clickedTree"} onClick={handleRankByTrees}>
                                <a>{"Rank by trees"}</a>
                            </li>
                            <li id={"clickedLeaf"} onClick={handleRankByLeaves}>
                                <a>{"Rank by leaves"}</a>
                            </li>
                        </ul>
                    </div>
                    <table
                        className={"table container is-hoverable"}
                        id={"treeRanking"}
                        style={{display: "none"}}>
                        <thead>
                            <tr>
                                <th title={"rank"}>{"Rank"}</th>
                                <th title={"username"}>{"Username"}</th>
                                <th title={"trees"}>{"Trees"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewTree.length === 0 ? (
                                <></>
                            ) : (
                                viewTree.map((result, index) => (
                                    <tr key={`lb_${result._id._id}`}>
                                        <th>{index + 1}</th>
                                        <td>{result._id.username}</td>
                                        <td>{result.count}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <table
                        className={"table container is-hoverable"}
                        id={"leafRanking"}
                        style={{display: "none"}}>
                        <thead>
                            <tr>
                                <th title={"rank"}>{"Rank"}</th>
                                <th title={"username"}>{"Username"}</th>
                                <th title={"leaves"}>{"Leaves"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewLeaf.length === 0 ? (
                                <></>
                            ) : (
                                viewLeaf.map((result, index) => (
                                    <tr key={result._id}>
                                        <th>{index + 1}</th>
                                        <td>{result.username}</td>
                                        <td>{result.totalLeaves}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </section>
                <footer className={"modal-card-foot"} />
            </div>
        </div>
    );
}
