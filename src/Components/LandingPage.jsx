// import { useNavigate } from "react-router-dom";
// import "../App.css";

// function LandingPage() {

//   const navigate = useNavigate();

//   return (
//     <div className="landing-container">

//       <div className="hero-section">
//         <h1>Stock Management System</h1>

//         <p>
//           A powerful warehouse management application designed to help
//           businesses efficiently manage products, monitor stock levels,
//           track sales, and maintain accurate inventory records.
//         </p>

//         <button
//           className="start-btn"
//           onClick={() => navigate("/products")}
//         >
//           Get Started →
//         </button>
//       </div>

//       <div className="features-section">

//         <div className="feature-card">
//           <h3>📦 Product Control</h3>
//           <p>Manage all warehouse products with easy add, edit, and delete functionality.</p>
//         </div>

//         <div className="feature-card">
//           <h3>📊 Stock Tracking</h3>
//           <p>Monitor stock availability and avoid shortages with real-time updates.</p>
//         </div>

//         <div className="feature-card">
//           <h3>💰 Sales Recording</h3>
//           <p>Track product sales and maintain accurate warehouse inventory records.</p>
//         </div>

//       </div>

//     </div>
//   );
// }

// export default LandingPage;

// import { useNavigate } from "react-router-dom";
// import "../App.css";

// function LandingPage() {

//   const navigate = useNavigate();

//   return (
//     <div className="landing-container">

//       <div className="hero-section">
//         <h1>Warehouse Inventory System</h1>

//         <p>
//           A powerful warehouse management application designed to help
//           businesses efficiently manage products, monitor stock levels,
//           track sales, and maintain accurate inventory records.
//         </p>

//         <button
//           className="start-btn"
//           onClick={() => navigate("/products")}
//         >
//           Get Started →
//         </button>
//       </div>

//       <div className="features-section">

//         <div className="feature-card">
//           <h3>📦 Product Control</h3>
//           <p>Manage all warehouse products with easy add, edit, and delete functionality.</p>
//         </div>

//         <div className="feature-card">
//           <h3>📊 Stock Tracking</h3>
//           <p>Monitor stock availability and avoid shortages with real-time updates.</p>
//         </div>

//         <div className="feature-card">
//           <h3>💰 Sales Recording</h3>
//           <p>Track product sales and maintain accurate warehouse inventory records.</p>
//         </div>

//       </div>

//     </div>
//   );
// }

// export default LandingPage;





import { useNavigate } from "react-router-dom";
import "../App.css";

function LandingPage() {

  const navigate = useNavigate();

  return (
    <div className="landing-main">

      {/* HERO SECTION */}

      <section className="hero">

        <div className="hero-left">

          <h1>Smart Inventory System</h1>

          <p>
            Smart warehouse management system to control inventory,
            monitor stock levels, manage products, and track sales
            efficiently in one powerful platform.
          </p>

          <button
            className="hero-btn"
            onClick={() => navigate("/products")}
          >
            Get Started
          </button>

        </div>

        <div className="hero-right">

          <img
            src="https://flxdeal.com/wp-content/uploads/2023/03/Home-Slider.png"
            alt="warehouse"
          />

        </div>

      </section>


      {/* FEATURES SECTION */}

      <section className="features">

        <h2>Powerful Features</h2>

        <div className="features-container">

          <div className="feature-card">
            <h3>Product Management</h3>
            <p>
              Easily add, edit, update, and delete warehouse products with
              a clean and simple interface.
            </p>
          </div>

          <div className="feature-card">
            <h3>Stock Monitoring</h3>
            <p>
              Track real-time stock levels and receive alerts for low
              inventory items.
            </p>
          </div>

          <div className="feature-card">
            <h3>Sales Tracking</h3>
            <p>
              Record product sales and automatically update warehouse
              inventory.
            </p>
          </div>

        </div>

      </section>


      {/* ABOUT SECTION */}

      <section className="about">

        <div className="about-left">
          <img
            src="https://img.freepik.com/free-vector/shopping-online-background_1156-96.jpg"
            alt="inventory"
          />
        </div>

        <div className="about-right">

          <h2>Why Use Our System?</h2>

          <p>
            Managing warehouse inventory manually is difficult and
            error-prone. Our system simplifies product management,
            inventory tracking, and sales recording in one dashboard.
          </p>

          <p>
            Designed for businesses that need a reliable and efficient
            inventory solution.

          </p>

        </div>

      </section>


      {/* STATISTICS SECTION */}

      <section className="stats">

        <div className="stat-box">
          <h2>500+</h2>
          <p>Products Managed</p>
        </div>

        <div className="stat-box">
          <h2>120+</h2>
          <p>Warehouse Items</p>
        </div>

        <div className="stat-box">
          <h2>300+</h2>
          <p>Sales Recorded</p>
        </div>

        <div className="stat-box">
          <h2>99%</h2>
          <p>Inventory Accuracy</p>
        </div>

      </section>

    </div>
  );
}

export default LandingPage;