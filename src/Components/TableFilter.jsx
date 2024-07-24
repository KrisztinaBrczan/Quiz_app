export default function TableFilter() {
  return (
    <div className="flex justify-between text-orange-500 mb-3">
      <div>
        Show{" "}
        <span>
          <select className="border border-orange-500 rounded p-2 bg-[rgb(31,41,55)]">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </span>{" "}
        entries
      </div>
      <div>
        <label htmlFor="searchResult">Search: </label>
        <input
          id="searchResult"
          className="bg-[rgb(31,41,55)] text-orange-500 border border-orange-500 rounded p-2 focus:outline-none "
        />
      </div>
    </div>
  );
}
