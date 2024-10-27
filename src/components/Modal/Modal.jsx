// Modal.js
export default function Modal({ winner,onRestart }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
          {winner && <>
            <p className="text-lg">Congratulations, Player {winner} won!</p>
          </>}
          {!winner
        &&<>
         <p className="text-lg">It&apos;s a Draw</p>
        </>
          }
          <button
            onClick={onRestart}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
