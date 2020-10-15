import * as React from "react";
import ProfilePage from "./profile";
import LoginPage from "./login";
import RegisterPage from "./register";
import LeaderboardPage from "./leaderboard";
import GamelogPage from "./gamelog";

import UserContext from "../components/mwenbwa-context";

class Menu extends React.Component {
    static contextType = UserContext;

    constructor() {
        super();

        this.state = {
            isShowingProfile: false,
            isShowingLogin: false,
            isShowingRegister: false,
            isShowingLeaderboard: false,
            isShowingGamelog: false,
        };

        this.handleOpenProfile = this.handleOpenProfile.bind(this);
        this.handleOpenLogin = this.handleOpenLogin.bind(this);
        this.handleOpenRegister = this.handleOpenRegister.bind(this);
        this.handleOpenLeaderboard = this.handleOpenLeaderboard.bind(this);
        this.handleOpenGamelog = this.handleOpenGamelog.bind(this);
        this.closeModalProfile = this.closeModalProfile.bind(this);
        this.closeModalLogin = this.closeModalLogin.bind(this);
        this.closeModalRegister = this.closeModalRegister.bind(this);
        this.closeModalLeaderboard = this.closeModalLeaderboard.bind(this);
        this.closeModalGamelog = this.closeModalGamelog.bind(this);
    }

    handleOpenProfile() {
        this.setState({
            isShowingProfile: true,
        });
    }

    handleOpenLogin() {
        this.setState({
            isShowingLogin: true,
        });
    }

    handleOpenRegister() {
        this.setState({
            isShowingRegister: true,
        });
    }

    handleOpenLeaderboard() {
        this.setState({
            isShowingLeaderboard: true,
        });
    }

    handleOpenGamelog() {
        this.setState({
            isShowingGamelog: true,
        });
    }

    closeModalProfile() {
        this.setState({
            isShowingProfile: false,
        });
    }

    closeModalLogin() {
        this.setState({
            isShowingLogin: false,
        });
    }

    closeModalRegister() {
        this.setState({
            isShowingRegister: false,
        });
    }

    closeModalLeaderboard() {
        this.setState({
            isShowingLeaderboard: false,
        });
    }

    closeModalGamelog() {
        this.setState({
            isShowingGamelog: false,
        });
    }

    render() {
        if (this.context.user) {
            return (
                <div>
                    <nav
                        className={"navbar is-success"}
                        role={"navigation"}
                        aria-label={"main navigation"}>
                        <div className={"navbar-brand"}>
                            <div className={"navbar-item is-expanded"}>
                                <span className={"icon is-medium"}>
                                    <i className={"far fa-lg fa-clock"} />
                                </span>
                                <p>{"12:35"}</p>
                            </div>

                            <div className={"navbar-item is-expanded"}>
                                <span className={"icon is-medium"}>
                                    <i className={"fas fa-lg fa-tree"} />
                                </span>
                                <p>{"???"}</p>
                            </div>
                            <div className={"navbar-item is-expanded"}>
                                <span className={"icon is-medium"}>
                                    <i className={"fab fa-lg fa-envira"} />
                                </span>
                                <p>{this.context.user.totalLeaves}</p>
                            </div>

                            <a
                                role={"button"}
                                className={"navbar-burger burger"}
                                aria-label={"menu"}
                                aria-expanded={"false"}
                                onClick={() => {
                                    const toggle = document.querySelector(
                                        ".navbar-burger",
                                    );
                                    const menu = document.querySelector(
                                        ".navbar-menu",
                                    );
                                    toggle.classList.toggle("is-active");
                                    menu.classList.toggle("is-active");
                                }}>
                                <span aria-hidden={"true"} />
                                <span aria-hidden={"true"} />
                                <span aria-hidden={"true"} />
                            </a>
                        </div>
                        <div className={"navbar-menu"}>
                            <div className={"navbar-start"} />
                            <div className={"navbar-end"}>
                                <a
                                    className={"navbar-item"}
                                    onClick={this.handleOpenLeaderboard}>
                                    <span className={"icon is-large"}>
                                        <i className={"fas fa-list-ol"} />
                                    </span>
                                    {"Leaderboard"}
                                </a>
                                <a
                                    className={"navbar-item"}
                                    onClick={this.handleOpenGamelog}>
                                    <span className={"icon is-large"}>
                                        <i className={"far fa-file-alt"} />
                                    </span>
                                    {"Gamelogs"}
                                </a>
                                <a
                                    className={"navbar-item"}
                                    onClick={this.handleOpenProfile}>
                                    <span className={"icon is-large"}>
                                        <i className={"far fa-user"} />
                                    </span>
                                    {"My Profile"}
                                </a>
                            </div>
                        </div>
                    </nav>
                    <ProfilePage
                        showProfile={this.state.isShowingProfile}
                        handleCloseProfile={this.closeModalProfile}
                    />
                    <LeaderboardPage
                        showLeaderboard={this.state.isShowingLeaderboard}
                        handleCloseLeaderboard={this.closeModalLeaderboard}
                    />
                    <GamelogPage
                        showGamelog={this.state.isShowingGamelog}
                        handleCloseGamelog={this.closeModalGamelog}
                    />
                </div>
            );
        }
        return (
            <div>
                <nav
                    className={"navbar is-warning"}
                    role={"navigation"}
                    aria-label={"main navigation"}>
                    <div className={"navbar-brand"}>
                        <a
                            role={"button"}
                            className={"navbar-burger burger"}
                            aria-label={"menu"}
                            aria-expanded={"false"}
                            onClick={() => {
                                const toggle = document.querySelector(
                                    ".navbar-burger",
                                );
                                const menu = document.querySelector(
                                    ".navbar-menu",
                                );
                                toggle.classList.toggle("is-active");
                                menu.classList.toggle("is-active");
                            }}>
                            <span aria-hidden={"true"} />
                            <span aria-hidden={"true"} />
                            <span aria-hidden={"true"} />
                        </a>
                    </div>
                    <div className={"navbar-menu"}>
                        <div className={"navbar-start"} />
                        <div className={"navbar-end"}>
                            <a
                                className={"navbar-item"}
                                onClick={this.handleOpenLeaderboard}>
                                <span className={"icon is-large"}>
                                    <i className={"fas fa-list-ol"} />
                                </span>
                                {"Leaderboard"}
                            </a>
                            <hr className={"navbar-divider"} />
                            <a
                                className={"navbar-item"}
                                onClick={this.handleOpenGamelog}>
                                <span className={"icon is-large"}>
                                    <i className={"far fa-file-alt"} />
                                </span>
                                {"Gamelogs"}
                            </a>
                            <hr className={"navbar-divider"} />
                            <a
                                className={"navbar-item"}
                                onClick={this.handleOpenRegister}>
                                <span className={"icon is-large"}>
                                    <i className={"fas fa-user-plus"} />
                                </span>
                                {"Register"}
                            </a>
                            <hr className={"navbar-divider"} />
                            <a
                                className={"navbar-item"}
                                onClick={this.handleOpenLogin}>
                                <span className={"icon is-large"}>
                                    <i className={"fas fa-sign-in-alt"} />
                                </span>
                                {"Login"}
                            </a>
                        </div>
                    </div>
                </nav>
                <LoginPage
                    showLogin={this.state.isShowingLogin}
                    handleCloseLogin={this.closeModalLogin}
                />
                <RegisterPage
                    showRegister={this.state.isShowingRegister}
                    handleCloseRegister={this.closeModalRegister}
                />
                <LeaderboardPage
                    showLeaderboard={this.state.isShowingLeaderboard}
                    handleCloseLeaderboard={this.closeModalLeaderboard}
                />
                <GamelogPage
                    showGamelog={this.state.isShowingGamelog}
                    handleCloseGamelog={this.closeModalGamelog}
                />
            </div>
        );
    }
}

export default Menu;
