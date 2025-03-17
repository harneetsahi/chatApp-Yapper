const defaultStyles = "py-4 px-5 border-b-1 border-gray-800";

function Sidebar() {
  return (
    <>
      <div className={`w-50 border-r-1 border-gray-800  `}>
        <section className="flex flex-col ">
          <h2 className={`${defaultStyles}`}>All messages</h2>
          <div className={`${defaultStyles}`}>chat 1</div>
        </section>
      </div>
    </>
  );
}

export default Sidebar;
