import PropTypes from "prop-types";

export default function DefaultHeader({ children }) {
  return (
    <>
      <img
        src="/src/assets/AuthImgTop.png"
        alt="paimonak"
        className="rounded-lg absolute w-28 top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <div className="w-72 p-3 bg-white rounded-3xl m-auto mt-14 pt-20">
        <button className="btn btn-square btn-ghost -mt-20 float-right text-btns">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <button className="btn btn-square btn-ghost -mt-20 float-left text-btns">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </>
  );
}

DefaultHeader.propTypes = {
  children: PropTypes.node.isRequired,
};
