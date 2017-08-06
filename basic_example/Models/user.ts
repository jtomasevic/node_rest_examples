// We are using typeScript just to generate model.
class User{
    UserName:string;
    Password:string;
    constructor(request){
        this.UserName = request.body.UserName;
        this.Password = request.body.Password;
    }
}