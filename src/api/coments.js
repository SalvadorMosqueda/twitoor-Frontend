import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export  const GetComments = (IDTweet)=>{
    //url
    const url = `${API_HOST}/leerComentarios/${IDTweet}`;

    //las configuraciones
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getTokenApi()}`
        }
    }
    //iniciamos peticion
    return fetch(url, params)
    .then(response => {
        return response.json();
    })
    .catch(err => {
        return err;
    })
}

export function createCommentTweetApi(message,IDTweet){
    const url = `${API_HOST}/crearComentario/${IDTweet}`;
    
    const data = {
        mensaje: message
    }
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getTokenApi()}`
        },
        body: JSON.stringify(data)
    }
    return fetch(url, params).then(response => {
        if(response.status >= 200 && response.status < 300){
            return { code: response.status, message: 'Comentario creado' };
        }
        return { code: 500, message: 'Error del servidor' };
    })
    .catch(err => {
        return err;
    })



}