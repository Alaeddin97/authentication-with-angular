export class User{
    public email:string;
    public id:string;
    private _token:string;
    private _tokenExpirationDate:Date;

    constructor(email:string,id:string,token:string,expiredIn:Date){
        this.email=email;
        this.id=id;
        this._token=token;
        this._tokenExpirationDate=expiredIn;
    }
    get token(){
        if((new Date()>this._tokenExpirationDate)){
            return null;
        }
        return this._token;
    }

}