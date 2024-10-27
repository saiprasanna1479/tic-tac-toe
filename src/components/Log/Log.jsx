export default function Log({ turns }) {
   console.log(turns);
   
    return (
        <ol>
            {turns.map((turn) => (
                
                <li key={`${turn.square.row}${turn.square.column}`}   className="animate-fadeIn p-2 text-gray-800 transition ease-in-out duration-500">
                    {turn.player}Selected  - {turn.square.row},{turn.square.col}
                </li>
            ))}

        </ol>
    )
}

