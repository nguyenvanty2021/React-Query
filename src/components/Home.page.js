import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const HomePage = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/a">a</Link>
          </li>
          <li>
            <Link to="/b">b</Link>
          </li>
          <li>
            <Link to="/c">c</Link>
          </li>
          <li>
            <Link to="/d">d</Link>
          </li>
          <li>
            <Link to="/e">e</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
