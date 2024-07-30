export default function TableFilter({
  isSearchFielNecessary,
  perPage,
  handlePerPageChange,
  setSearch,
  search,
}) {
  return (
    <div className="flex justify-between text-orange-500 mb-3 text-xs sm:text-base">
      <div>
        Show{" "}
        <span>
          <select
            className="border border-orange-500 rounded p-2 bg-[rgb(31,41,55)] text-xs sm:text-base"
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </span>{" "}
        entries
      </div>
      <div style={{ display: isSearchFielNecessary ? "inline" : "none" }}>
        <label htmlFor="searchResult">Search: </label>
        <input
          id="searchResult"
          className="bg-[rgb(31,41,55)] text-orange-500 border border-orange-500 rounded p-2 focus:outline-none "
          onChange={(e) => {
            setSearch(e.target.value.toLowerCase());
          }}
        />
      </div>
    </div>
  );
}
