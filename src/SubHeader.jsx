import { Link } from "react-router-dom";

export function SubHeader() {
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
        <Link to="/" key={link} className="hover:text-[#00a49f]">
          {link}
        </Link>
      ))}
    </div>
  );
}

const links = [
  "Cars",
  "Motorcycles",
  "Mobile Phones",
  "For Sale: Houses & Apartments",
  "Scooters",
  "Commercial & Other Vehicles",
  "For Rent: Houses & Apartments",
];
