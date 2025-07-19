// import React, { useState } from 'react';
// import Product from './product';
// import About from './About';
// import Contact from './Contact ';
// import './App.css';
// import carpetImg from './carpet.jpg';

// function App() {
//   const [page, setPage] = useState('home');

//   return (
//     <div className="app-container">
//       <h1 className="nav">Sethi's Carpets</h1>
//       <p className="hey">Handtufted & Handknotted Carpets</p>

//       <div className="nav-buttons">
//         <button className='hi' onClick={() => setPage('home')}>Home</button>
//         <button className='hi' onClick={() => setPage('products')}>Products</button>
//         <button className='hi' onClick={() => setPage('about')}>About</button>
//         <button className='hi' onClick={() => setPage('contact')}>Contact us</button>
//       </div>

//       {page === 'home' && (
//         <div className="gallery">
//           <img src={carpetImg} alt="Hand-Knotted Carpet" />
//           <img src={carpetImg} alt="Hand-Tufted Carpet" />
//         </div>
//       )}

//       {page === 'products' && <Product />}
//       {page === 'about' && <About />}
//       {page === 'contact' && <Contact />}
//     </div>
//   );
// }

// export default App;









import React, { useState } from 'react';
import Product from './product';
import About from './About';
import Contact from './Contact ';
import './App.css';
import carpetImg from './carpet.jpg';

function App() {
  const [page, setPage] = useState('home');
  const [filter, setFilter] = useState('Electronics'); 

  const hey = (category) => {
    setFilter(category);
    setPage('products');
  };

  return (
    <div className="app-container">
      <h1 className="nav">E-Commerce</h1>
      <p className="hey">Best Deals on All Products!</p>

      <div className="nav-buttons">
        <button className="hi" onClick={() => setPage('home')}>Home</button>
        <button className="hi" onClick={() => setPage('products')}>Products</button>
        <button className="hi" onClick={() => setPage('about')}>About</button>
        <button className="hi" onClick={() => setPage('contact')}>Contact us</button>
      </div>

      <div className="main-content">
        <div className="page-wrapper">
          {page === 'home' && (
            <div className="home-section">
              <section className="hero">
                <img src={carpetImg} alt="Banner" className="hero-img" />
                <div className="hero-text">
                  <h2>Welcome to Our Store</h2>
                  <p>Discover the finest collection of electronics, fashion, home decor & more!</p>
                  <button onClick={() => setPage('products')}>Shop Now</button>
                </div>
              </section>

              <section className="features">
                <h3>Popular Categories</h3>
                <div className="category-grid">
                  <div className="category-card" onClick={() => hey('Electronics')}>Electronics</div>
                  <div className="category-card" onClick={() => hey('Fashion')}>Fashion</div>
                  <div className="category-card" onClick={() => hey('Home Decor')}>Home Decor</div>
                  <div className="category-card" onClick={() => hey('Accessories')}>Accessories</div>
                </div>
              </section>

              <section className="why-us">
                <h3>Why Choose Us?</h3>
                <ul>
                  <li>Fast & Secure Checkout</li>
                  <li>Verified Products from Trusted Brands</li>
                  <li>Free Shipping on Orders Over ₹999</li>
                  <li>24/7 Customer Support</li>
                </ul>
              </section>
            </div>
          )}

          {page === 'products' && (
            <Product selectedCategory={filter} />
          )}

          {page === 'about' && <About />}
          {page === 'contact' && <Contact />}
        </div>
      </div>
    </div>
  );
}

export default App;
