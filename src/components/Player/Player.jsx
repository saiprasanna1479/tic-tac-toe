import { useState } from "react"


export default function Player({ name, symbol, initialName,activePlayer,onChangeName }) {
    const [isEditing, setIsEditing] = useState("");
    const [playerName, setPlayerName] = useState(initialName);
    function handleEditClick() {
        setIsEditing(isEditing => !isEditing);
        if(isEditing)
        {
            onChangeName(symbol,playerName);
        }
      
    }
    function handleEditChange(event)
    {
        setPlayerName(event.target.value);
    }
    
    let editPlayerName = <a className={`w-32  pointer-events-none mb-0 flex w-full cursor-pointer items-center justify-center rounded-md border-0 bg-inherit px-0 py-2 text-sm text-slate-50 transition-all ease-in-out  ${activePlayer}`} data-tab-target="" role="tab" aria-selected="true"> {playerName} </a>;
    if (isEditing) {

        editPlayerName = <input className="border-custom-purple  w-32 mb-0 flex w-full cursor-pointer items-center justify-center rounded-md border-0 bg-inherit px-0 py-2 text-sm text-slate-50 transition-all ease-in-out place-content-center text-center" placeholder={initialName} onChange={handleEditChange} value={playerName}  />;
    }
    return (
        <div className='flex items-center space-x-2'>
            <div className="flex items-center gap-32">
                {editPlayerName}
                <button className="w-24 shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear" onClick={handleEditClick} >
                    {isEditing ? 'Save' : 'Edit'}
                </button>
            </div>

        </div>
    )
}