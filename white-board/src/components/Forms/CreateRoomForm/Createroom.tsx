import React from 'react'

const Createroom = () => {
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
                <div>
                    <button type="button">Generate</button>
                    <button type="button">Copy</button>
                    
                </div>
            </div>
            </div>
            <button type="submit">Generate Room</button>
    </form>
  )
}

export default Createroom