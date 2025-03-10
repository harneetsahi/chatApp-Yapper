function JoinRoom() {
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
          <button>Create Room</button>
          <p>{/* room code */}</p>
        </section>
      </div>
    </>
  );
}

export default JoinRoom;
