export default function Pagination({
  page,
  perPage,
  registeredResultsLength,
  handlePageChange,
}) {
  const totalPages = Math.ceil(registeredResultsLength / perPage);

  return (
    <>
      <div className="flex justify-center items-center gap-4">
        <button
          disabled={page <= 1}
          className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-orange-500 text-center align-middle font-sans text-xs font-medium uppercase text-orange-500 transition-all hover:opacity-75 focus:ring focus:ring-orange-500 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => handlePageChange(page - 1)}
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              ></path>
            </svg>
          </span>
        </button>
        <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-500">
          Page <strong className="text-orange-500">{page}</strong> of{" "}
          <strong className="text-orange-500">{totalPages}</strong>
        </p>
        <button
          disabled={page >= totalPages}
          className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-orange-500 text-center align-middle font-sans text-xs font-medium uppercase text-orange-500 transition-all hover:opacity-75 focus:ring focus:ring-orange-500 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => handlePageChange(page + 1)}
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </>
  );
}
