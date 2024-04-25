import { Link } from 'react-router-dom';
import { AiOutlineGithub } from 'react-icons/ai';

const Header = () => {
  return (
    <header className="border-b mb-3">
      <nav className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Movie App</Link>
        <ul className="flex gap-4">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <a href="https://github.com/YusraSenimAydin" className="flex items-center hover:underline">
              <AiOutlineGithub className="mr-1" />
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
