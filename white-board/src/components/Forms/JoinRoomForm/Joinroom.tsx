
import './joinroom.css'

const Joinroom = () => {
  return (
    <form>
    <div>
        <input
 type="text"
 placeholder="Enter your name"
        />
    </div>
    <div>
        <div>
            <input
            type="text"
            placeholder="Generate room code"
            />
     
        </div>
        </div>
        <button type="submit">Generate Room</button>
</form>
  )
}

export default Joinroom