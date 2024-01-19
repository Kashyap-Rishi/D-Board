import Createroom from './CreateRoomForm/Createroom'
import './forms.css'
import Joinroom from './JoinRoomForm/Joinroom'

const Forms = () => {
  return (
    <div className="main-cont">
        <div className="sub-cont">
            <h1>Create Room</h1>
            <Createroom/>
        </div>
        <div className="sub-cont">
            <h1>Join Room</h1>
            <Joinroom/>
        </div>
    </div>
  )
}

export default Forms