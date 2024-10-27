

export default function GameBoard({onSelectSquare,board}) {

   

    return (
        <>
            <ol className='list-none'>
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className='flex items-center justify-evenly'>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                <button type="button" onClick={()=>onSelectSquare({rowIndex,colIndex})} className=" w-32 gap-56 h-32 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 " disabled={playerSymbol !==null}>{playerSymbol}</button>
                            </li>
                        ))}
                    </div>
                ))}
            </ol>
        </>
    )
}

