import { useState } from "react";

function JoinRoom() {
  const [roomCode, setRoomCode] = useState("");

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
      <div>
        <h1>Chat Room</h1>

        <section>
          <p>Status: </p>
          <form action="">
            <input
              type="text"
              name="roomId"
              id="roomId"
              placeholder="Room ID"
            />
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
            />
            <button>Join Room</button>
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
