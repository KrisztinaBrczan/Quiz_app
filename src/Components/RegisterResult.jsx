export default function RegisterResult({
  username,
  setUsername,
  saveResult,
  isLoading,
}) {
  return (
    <div className="flex justify-center items-center flex-col ">
      <input
        placeholder="your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="bg-[rgb(31,41,55)] text-orange-500 border border-orange-500 rounded p-2 focus:outline-none "
      />
      <button
        className="text-orange-500 hover:text-orange-600 h-14 mx-4"
        onClick={async () => {
          await saveResult();
        }}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
