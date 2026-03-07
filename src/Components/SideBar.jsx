import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <Link to="/" className="logo-link">
        <h2 className="logo">Smart Inventory</h2>
      </Link>

      <div className="nav-links">
        <Link className={location.pathname==="/products"?"active":""} to="/products">Products</Link>
        <Link className={location.pathname==="/add"?"active":""} to="/add">Add Product</Link>
        <Link className={location.pathname==="/addsale"?"active":""} to="/addsale">Add Sale</Link>
        <Link className={location.pathname==="/dashboard"?"active":""} to="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
}

export default Sidebar;