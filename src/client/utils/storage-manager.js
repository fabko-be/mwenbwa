exports.saveUserData = data => {
    localStorage.setItem("UserData", JSON.stringify(data));
};

exports.loadUserData = () => JSON.parse(localStorage.getItem("UserData"));

exports.eraseUserData = () => {
    localStorage.removeItem("UserData");
};
