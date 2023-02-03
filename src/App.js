import './App.css';

function App() {
  return (
    <div className="h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
      <div className="mx-10 flex flex-col items-center ">
        <h1 className="text-7xl font-extrabold text-center text-slate-300 mt-28">Speech To Text</h1>
        <p className="text-xl text-center font-bold font-mono underline underline-offset-4 hover:decoration-4 mt-20 text-slate-100"> Press the record button and press stop button when finished recording </p>
        <div className="flex flex-row space-x-8 items-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-10 transition-all ease-in-out">
            Record
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 border border-red-700 rounded mt-10 transition-all ease-in-out">
            Stop
          </button>
        </div>
      </div>
      <div className="flex flex-row space-x-10 mt-10">
        <div className="mx-20 h-80 w-5/12 rounded-xl mt-16 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-80 border border-gray-200">
        <p className="text-white font-extrabold ml-10 mt-7">English:</p>

        </div>
        <div className="h-80 w-5/12 rounded-xl mt-16 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-80 border border-gray-200">
        <p className="text-white font-extrabold ml-10 mt-7">Hindi:</p>

        </div>
      </div>
    </div>
  );
}

export default App;


