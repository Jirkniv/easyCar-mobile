import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.2.14:9999",
    timeout: 10000
});

function handleError(error){
    if(error.response?.data.error){
        alert.alert(error.response?.data.error);
    } else{
        alert.alert("Ocorreu um erro, tente novamente mais tarde");
    }
}

export { api, handleError };