import { useState,useEffect } from 'react'
import { getUserApi } from '../../api/user'
import AvatarNoFound from '../../assets/png/avatar-no-found.png'
import { API_HOST } from '../../utils/constants'
import { replaceURLWithHTMLLinks } from '../../utils/functions'
import { Image } from 'react-bootstrap'
import EliminarBtn from './cerrar'
import moment from 'moment'
import EditarIcon from './editar'

const Comments = ({comentario}) => {
    const [userInfo, setUserInfo] = useState(null)
    const [avatarURL, setAvatarURL] = useState(null)

     //identiicar al usurio del comentario
     useEffect(() => {
        getUserApi(comentario.userId).then(response => {
            setUserInfo(response)
            setAvatarURL(
                response?.avatar 
                ? `${API_HOST}/obtenerAvatar?id=${response.id}` 
                : AvatarNoFound
            );
        })
    },[comentario])

  return (
      <>
    <div className='comentario'>
            <div className='flex'>
                <Image className='avatar' src={avatarURL} roundedCircle />
                <div className='name'>{userInfo?.nombre} {userInfo?.apellidos}<span>{moment(comentario.fecha).calendar()}</span></div>               
                <div className='IconConfig'>
                <EditarIcon/>
                <EliminarBtn/>
                </div>
            </div>
            <div className='comentarios' dangerouslySetInnerHTML={{ __html: replaceURLWithHTMLLinks(comentario.mensaje) }} />
          
        </div>
    </>
  )
}

export default Comments