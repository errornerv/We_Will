import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  // State to manage the visibility of the search input
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Function to toggle the search input visibility
  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 14 13"
              color="#586070"
            >
              <path
                fill="currentColor"
                d="M2 3.75A.75.75 0 0 1 2.75 3h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75m0 4A.75.75 0 0 1 2.75 7h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 7.75m0 4a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) => (isActive ? "bg-accent" : "")}
              >
                صفحه اصلی
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/records"}
                className={({ isActive }) => (isActive ? "bg-accent" : "")}
              >
                سوابق سفارش
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/wewill"}
                className={({ isActive }) => (isActive ? "bg-accent" : "")}
              >
                وی ویل کلاب
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {/* search icon start */}
      <div className="navbar-end pl-5">
        <input
          type="text"
          placeholder="جستجو..."
          className={`bg-inherit w-36 ml-3 outline-none border-b-2 border-[#c9c9c9] ${
            isSearchVisible ? "block" : "hidden"
          }`}
        />
        <button
          className={`btn btn-ghost btn-circle ${
            isSearchVisible ? "hidden" : ""
          }`}
          onClick={toggleSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            color="#586070"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M11.25 2.75C6.142 2.75 2 6.89 2 11.998s4.142 9.248 9.25 9.248a9.2 9.2 0 0 0 5.987-2.198l3.481 3.48a.75.75 0 1 0 1.06-1.06l-3.48-3.48a9.2 9.2 0 0 0 2.202-5.99c0-5.108-4.142-9.248-9.25-9.248M3.5 11.998a7.75 7.75 0 0 1 7.75-7.748a7.749 7.749 0 1 1 0 15.496a7.75 7.75 0 0 1-7.75-7.748"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* cart icon start */}
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle -m-2"
        >
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              color="#586070"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 2.75A2.25 2.25 0 0 0 9.75 5v.26c.557-.01 1.168-.01 1.84-.01h.821c.67 0 1.282 0 1.84.01V5A2.25 2.25 0 0 0 12 2.75m3.75 2.578V5a3.75 3.75 0 1 0-7.5 0v.328q-.214.018-.414.043c-1.01.125-1.842.387-2.55.974S4.168 7.702 3.86 8.672c-.3.94-.526 2.147-.81 3.666l-.021.11c-.402 2.143-.718 3.832-.777 5.163c-.06 1.365.144 2.495.914 3.422c.77.928 1.843 1.336 3.195 1.529c1.32.188 3.037.188 5.218.188h.845c2.18 0 3.898 0 5.217-.188c1.352-.193 2.426-.601 3.196-1.529s.972-2.057.913-3.422c-.058-1.331-.375-3.02-.777-5.163l-.02-.11c-.285-1.519-.512-2.727-.81-3.666c-.31-.97-.72-1.74-1.428-2.327c-.707-.587-1.54-.85-2.55-.974a11 11 0 0 0-.414-.043M8.02 6.86c-.855.105-1.372.304-1.776.64c-.403.334-.694.805-.956 1.627c-.267.84-.478 1.958-.774 3.537c-.416 2.217-.711 3.8-.764 5.013c-.052 1.19.14 1.88.569 2.399c.43.517 1.073.832 2.253 1c1.2.172 2.812.174 5.068.174h.72c2.257 0 3.867-.002 5.068-.173c1.18-.169 1.823-.484 2.253-1.001c.43-.518.621-1.208.57-2.4c-.054-1.211-.349-2.795-.765-5.012c-.296-1.58-.506-2.696-.774-3.537c-.262-.822-.552-1.293-.956-1.628s-.92-.534-1.776-.64c-.876-.108-2.013-.109-3.62-.109h-.72c-1.607 0-2.744.001-3.62.11"
                clipRule="evenodd"
              />
            </svg>
            <span className="badge badge-sm indicator-item indicator-top indicator-start text-white bg-[#F5A514]">
              2
            </span>
          </div>
        </div>
        <div className="divider divider-horizontal h-10 "></div>
        {/* profile start */}
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar flex flex-col ml-5"
        >
          <h2 className="p-0 m-0 font-bold text-[#586070] text-lg">Alex</h2>

          <div className="w-8 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="./src/assets/react.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
