import {action, computed, makeAutoObservable} from "mobx"

class ProfileStore {
    private _auth: boolean = false;
    private _balance: string = "";
    private _email: string = "";

    constructor() {
        makeAutoObservable(this)
    }

    @action.bound
    setAuth(value: boolean) {
        this._auth = value;
    }

    @computed
    get auth() {
        return this._auth;
    }

    @action.bound
    setBalance(value: string) {
        this._balance = value;
    }

    @computed
    get balance() {
        return this._balance;
    }

    @action.bound
    setEmail(value: string) {
        this._email = value;
    }

    @computed
    get email() {
        return this._email;
    }
}

export default new ProfileStore();