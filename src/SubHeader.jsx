import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchTextContext } from "./contexts/SearchTextContext";

export function SubHeader() {
  const { searchCategory, setSearchCategory } = useContext(SearchTextContext);
  const navigate = useNavigate();
  return (
    <div className="border-b p-2 flex gap-3 text-sm font-medium">
      <Link
        to="/"
        className="hover:text-[#00a49f] flex gap-1 font-bold items-center"
      >
        {/*All Categories */}
        <div>ALL CATEGORIES</div>
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
      </Link>
      {links.map((link) => (
        <button
          key={link}
          className={
            "hover:text-primary p-2 rounded-xl border-2 border-transparent" +
            (searchCategory.toLowerCase() === link.toLowerCase()
              ? `text-primary border-2`
              : ``)
          }
          onClick={(e) => {
            e.preventDefault;
            setSearchCategory(link);
            navigate("/");
          }}
        >
          {link}
        </button>
      ))}
      <input
        onChange={(e) => setSearchCategory(e.target.value)}
        placeholder="Filter by Category"
        value={searchCategory}
        className="p-2"
      />
      <button
        onClick={() => {
          setSearchCategory("");
        }}
        className="bg-primary p-2 text-white rounded-md"
      >
        Clear Category Filter
      </button>
    </div>
  );
}

const links = [
  "Car",
  "Motorcycles",
  "Phones",
  "Scooters",
  "Residency",
  "Vehicles",
];
