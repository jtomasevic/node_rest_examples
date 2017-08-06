enum LoginResult{
    OK = 1,
    Not_Ok = 2 ,
    Blocked = 3
}

class LoginResponse{
    ResponseResult:LoginResult;
    Roles:string[];
    constructor(responseResult:LoginResult, roles:string[]){
        this.ResponseResult = responseResult;
        this.Roles = roles;
    }
}