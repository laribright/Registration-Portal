import Link from "next/link";

const Navlinks = () => {
  return (
    <ul className="bg-slate-700 py-4 text-white flex items-center justify-around">
      <li>
        <Link href="/">
          <a className="text-4xl text-center">Registration Portal</a>
        </Link>
      </li>
      <li>
        <Link href="/admin">
          <a className="text-4xl text-center">Admin Page</a>
        </Link>
      </li>
      <li>
        <Link href="/admin/login">
          <a className="text-2xl text-center hover:bg-cyan-700 px-5 py-2 hover:shadow-lg rounded-lg bg-transparent border-2 border-cyan-700">
            Admin Login
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default Navlinks;
