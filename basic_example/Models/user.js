var User = (function () {
    function User(request) {
        this.UserName = request.body.UserName;
        this.Password = request.body.Password;
    }
    return User;
}());

module.exports = User;