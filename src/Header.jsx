import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchTextContext } from "./contexts/SearchTextContext";
import { UserContext } from "./contexts/userContext";
import { logOut, signIn } from "../auth/auth_google_provider_create";

export function Header() {
  const navigate = useNavigate();
  const { searchText, setSearchText } = useContext(SearchTextContext);
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div className="flex gap-4 h-20 p-3 border items-center justify-between bg-[#EFF1F3]">
      <Link to="/" className="flex items-center h-1/2 w-auto">
        <img src="/OLX-Symbol.png" className="h-full w-full" />
      </Link>
      <div className="flex items-center p-4 h-20 ">
        <div className="border-2 border-stone-900 flex items-center bg-white">
          <svg // magnifying glass icon
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 ms-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            defaultValue="Kundannoor, Maradu"
            className="p-3 h-full"
          ></input>
          <svg // chevron down icon
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 me-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>

      <form className="flex items-center p-4 h-20 w-1/3 border justify-center">
        <input // search bar
          className="border-2 p-3 h-full border-stone-900 w-[80%]"
          placeholder="Find Cars, Mobile Phones and more..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          type="submit"
          className="h-full w-max"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <svg // magnifying glass icon
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="white"
            className="size-6 h-full w-max p-3 bg-[#002F35]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </form>
      <div className="flex gap-2">
        <div>English</div>
        <svg // chevron down icon
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 me-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
        {/* Chat icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
          />
        </svg>
        {/* Bell icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>
      </div>
      <div>
        {user ? (
          <>
            <button onClick={logOut}>Log Out</button>
          </>
        ) : (
          <button onClick={signIn}>Sign In</button>
        )}
      </div>
      {user && (
        <>
          <Link to="/sell" className="h-full">
            <img src="/OLXsell.png" className="h-full" />
          </Link>
        </>
      )}

      {
        //<img
        //src={user?.photoURL || "/userIcon.jpg"}
        //className="h-18 w-auto"
        //alt="user pfp"
        ///>
      }
    </div>
  );
}
