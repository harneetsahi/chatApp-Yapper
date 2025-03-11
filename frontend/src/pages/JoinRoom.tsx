import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

function JoinRoom() {
  const [roomCode, setRoomCode] = useState("");
  const [status, setStatus] = useState("connecting...");
  const [newRoom, setNewRoom] = useState(false);

  function generateRoomCode() {
    const options = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let result = "";
    for (let i = 0; i < 5; i++) {
      const times = Math.floor(Math.random() * options.length);
      result += options[times];
    }
    setRoomCode(result);
    setNewRoom(true);
  }

  return (
    <>
      <div className="flex flex-col items-center h-full pt-30">
        <h1 className="text-2xl">Chat Room</h1>

        <section className="mt-10">
          <p>
            Status: <span className="text-green-500">{status}</span>{" "}
          </p>
          <form action="" className="mt-5 flex flex-col gap-5">
            <Input
              variant="primary"
              type="text"
              name="roomId"
              id="roomId"
              placeholder="Room ID"
            />
            <Input
              variant="primary"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
            <Button text={"Join Room"} />
          </form>
          <div className="flex items-center gap-5 my-5">
            <span className="border-1 border-gray-400 flex-1 h-.5 "></span>
            <span className="w-max text-gray-400">OR</span>
            <span className="border-1 border-gray-400 flex-1 h-.5 "></span>
          </div>
          <Button
            text={"Create Room"}
            onClick={() => {
              generateRoomCode();
            }}
          />
          {newRoom && (
            <div className="text-gray-400 flex justify-center mt-6 text-sm">
              <p>Here is your room ID: {roomCode}</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default JoinRoom;
