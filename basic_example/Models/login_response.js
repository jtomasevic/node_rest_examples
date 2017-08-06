var LoginResult;
(function (LoginResult) {
    LoginResult[LoginResult["OK"] = 1] = "OK";
    LoginResult[LoginResult["Not_Ok"] = 2] = "Not_Ok";
    LoginResult[LoginResult["Blocked"] = 3] = "Blocked";
})(LoginResult || (LoginResult = {}));
var LoginResponse = (function () {
    function LoginResponse(responseResult, roles) {
        this.ResponseResult = responseResult;
        this.Roles = roles;
    }
    return LoginResponse;
}());

module.exports = LoginResponse;