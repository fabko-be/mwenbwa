import React, {useState, useEffect} from "react";

export default function GamelogPage(props) {
    const [viewLogs, setViewLogs] = useState([]);
    const setPageNum = useState();
    let pageNum = useState();
    pageNum = setPageNum - setPageNum + 1;
    useEffect(() => {
        fetch(`logs/${pageNum}`)
            .then(res => res.json())
            .then(elem => {
                setViewLogs(elem.logs);
                setPageNum(elem.pages);
            });
    }, []);

    return (
        <div className={props.showGamelog ? "modal is-active" : "modal"}>
            <div
                className={"modal-background"}
                onClick={props.handleCloseGamelog}
            />
            <div className={"modal-card"}>
                <header className={"modal-card-head"}>
                    <p className={"modal-card-title"}>{"Gamelogs"}</p>
                    <button
                        className={"delete"}
                        aria-label={"close"}
                        onClick={props.handleCloseGamelog}
                    />
                </header>
                <section className={"modal-card-body has-text-centered"}>
                    {viewLogs.map(result => (
                        <div className={"content"} key={result._id}>
                            <p>
                                {result.date} - <strong>{result.msg}</strong>
                            </p>
                        </div>
                    ))}
                </section>
                <footer
                    className={"modal-card-foot"}
                    style={{justifyContent: "center"}}>
                    {setPageNum === 0 ? (
                        <></>
                    ) : (
                        <nav
                            className={"pagination is-rounded is-centered"}
                            role={"navigation"}
                            aria-label={"pagination"}>
                            <a className={"pagination-previous"}>
                                {"Previous page"}
                            </a>
                            <a className={"pagination-next"}>{"Next page"}</a>
                            <ul className={"pagination-list"}>
                                <li>
                                    <a
                                        className={"pagination-link is-current"}
                                        aria-label={"Goto page 1"}>
                                        1
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    )}
                </footer>
            </div>
        </div>
    );
}
