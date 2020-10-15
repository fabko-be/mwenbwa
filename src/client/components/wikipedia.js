import React from "react";

export default class WikipediaPage extends React.Component {
    constructor() {
        super();
        this.state = {
            specieName: null,
        };
    }
    handleGetSpecie() {
        const API = `https://en.wikipedia.org/w/api.php?action=parse&origin=*&page=${this.specieName}&prop=text&format=json`;
        const body = {method: "GET", dataType: "json"};
        const myRequest = new Request(API, body);
        fetch(myRequest)
            .then(response => response.json())
            .then(data => {
                console.log("data fetched", data);
                document.querySelector("#testWiki").innerHTML =
                    data.parse.text["*"];
                const title = data.parse.title;
                return title;
            });
    }

    render() {
        return (
            <div className={this.props.showWiki ? "modal is-active" : "modal"}>
                <div
                    className={"modal-background"}
                    onClick={this.props.handleCloseWiki}
                />
                <div className={"modal-card"}>
                    <header className={"modal-card-head"}>
                        <p className={"modal-card-title"}>{this.title}</p>
                        <button
                            className={"delete"}
                            aria-label={"close"}
                            onClick={this.props.handleCloseWiki}
                        />
                    </header>
                    <section
                        id={"testWiki"}
                        className={"modal-card-body has-text-centered"}
                    />
                </div>
            </div>
        );
    }
}
