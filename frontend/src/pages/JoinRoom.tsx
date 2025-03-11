import { useState } from "react";

function JoinRoom() {
  const [roomCode, setRoomCode] = useState("");
  const [status, setStatus] = useState("connecting...");

  function generateRoomCode() {
    const options = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let result = "";
    for (let i = 0; i < 5; i++) {
      const times = Math.floor(Math.random() * options.length);
      result += options[times];
    }
    setRoomCode(result);
  }

  return (
    <>
      <div className="flex flex-col items-center h-full pt-30">
        <h1 className="text-2xl">Chat Room</h1>

        <section className="mt-10">
          <p>
            Status: <span className="text-green-500">{status}</span>{" "}
          </p>
          <form action="" className="mt-5 flex flex-col">
            <input
              className="border-1 border-gray-700 px-4 py-2 rounded-lg w-100"
              type="text"
              name="roomId"
              id="roomId"
              placeholder="Room ID"
            />
            <input
              className="border-1 border-gray-700 px-4 py-2 rounded-lg w-100 mt-5"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
            <button className="border-1 border-gray-700 px-4 py-2 rounded-lg w-100 mt-5 bg-gray-200 text-gray-800 cursor-pointer">
              Join Room
            </button>
          </form>
          <p>OR</p>
          <button
            onClick={() => {
              generateRoomCode();
            }}
          >
            Create Room
          </button>
          <p>{roomCode}</p>
        </section>
      </div>
    </>
  );
}

export default JoinRoom;
