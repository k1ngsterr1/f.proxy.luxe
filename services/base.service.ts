import axios, {Axios} from "axios";

export class BaseService {
    protected readonly http: Axios;
    constructor() {
        axios.defaults.baseURL = "http://localhost:3003";
        this.http = axios;
    }
}