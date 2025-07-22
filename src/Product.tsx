// import React, { useState } from 'react';

// function Product() {
//   const [cart, setCart] = useState<{ name: string, price: number }[]>([]);

//   const handleAddToCart = (item: { name: string, price: number }) => {
//     setCart([...cart, item]);
//   };

//   const handleOrder = () => {
//     if (cart.length === 0) {
//       alert("Cart is empty!");
//     } else {
//       console.log( cart);
//       alert("Order placed successfully!");
//       setCart([]);
//     }
//   };

//   const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

//   return (
//     <div className="page-content">
//       <h2>Our Carpet Collection</h2>

//       <div className="product-item">
//         <img
//           src="https://images.unsplash.com/photo-1618221195710-dd9bb4c4901a"
//           alt="Red Carpet"
//         />
//         <p>Red Carpet - ₹3000</p>
//         <button onClick={() => handleAddToCart({ name: 'Red Carpet', price: 3000 })}>Add to Cart</button>
//       </div>

//       <div className="product-item">
//         <img
//           src="https://images.unsplash.com/photo-1622560480126-3665bcb5b0a4"
//           alt="Blue Carpet"
//         />
//         <p>Blue Carpet - ₹2500</p>
//         <button onClick={() => handleAddToCart({ name: 'Blue Carpet', price: 2500 })}>Add to Cart</button>
//       </div>

//       <h3>Your Cart:</h3>
//       <ul>
//         {cart.map((item, i) => (
//           <li key={i}>{item.name} - ₹{item.price}</li>
//         ))}
//       </ul>

//       <p><strong>Total Amount:</strong> ₹{totalAmount}</p>

//       <button onClick={handleOrder}>Place Order</button>
//     </div>
//   );
// }

// export default Product;


import { useState } from 'react';

type ProductItem = {
  name: string;
  price: number;
  image: string;
  category: string;
};

type ProductProps = {
  selectedCategory: string;
};

function Product({ selectedCategory }: ProductProps) {
  const [cart, setCart] = useState<ProductItem[]>([]);

  const handleAddToCart = (item: ProductItem) => {
    setCart([...cart, item]);
  };

  const handleOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
    } else {
      console.log(cart);
      alert("Order placed successfully!");
      setCart([]);
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const products: ProductItem[] = [
    {
      name: 'shirt',
      price: 2990,
      image: 'https://thehouseofrare.com/cdn/shop/files/hERO_9a618bec-ffe2-4f58-8d62-ca15425dfa35_765x.jpg?v=1743586799',
      category: 'Fashion',
    },
    {
      name: 'beize pant',
      price: 2999,
      image: 'https://image.hm.com/assets/hm/54/a7/54a7f8998e8810ed1dfbc06b33a1d98f185e305a.jpg?imwidth=1260',
      category: 'Fashion',
    },
    {
      name: 'Laptop',
      price: 60000,
      image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQDesLstGY-4uJ0iA28BO_nB2ynLqR1LE9K6CvVT6VZH0bqgnypZLUHKn8hM3zkG6m_M_xd3TzWGIAj--JspIR1alfpo-WDGBfu59qYR2HO&usqp=CAc',
      category: 'Electronics',
    },
    {
      name: 'Headphones',
      price: 59900,
      image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcREKMUE1yqinIhpIQ__mX3GRkds2tGAPB9pWJdrBjq4_yjuXc2Xw5WGRjtvBBJ5RFCvOjA-O0bOH_AV6tisT5D3I6c03FCbJOO70ydDdmo&usqp=CAc',
      category: 'Accessories',
    },
    {
      name: 'Mobile Phone',
      price: 69900,
      image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ3CnaOqRc25EmB_fRmx07AocSqPM9hM4CjOg5ipSfWKkbnrb-Ntqo5ixWTwva4MfdRlJBFYYPONpjJRl8n954h5zyBkK0RJUdnSBO-JVndAZ1c&usqp=CAc',
      category: 'Electronics',
    },
    {
      name: 'Bluetooth Speaker',
      price: 3000,
      image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTcEuY_eziQhiUAB5WS41O_DpMiEhAOfA4D8X7hSdzwYUX7lv9CHK8R-OEfmDe7Kj9xBeKDvswv-tROrzHR7qJpcKgF78qWdL5h47_oo9uTev3B&usqp=CAc',
      category: 'Accessories',
    },
    {
      name: 'Carpets',
      price: 25000,
      image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR-q31WQff7F3kWeUnMozsA8f76bHETAJYQgpEj06aeoElvpfe5iLpF1G6S2zk&usqp=CAc',
      category: 'Home Decor',
    },
    {
      name: 'Carpets',
      price: 22000,
      image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSl8YwHH999rljib1M2lSOI5adUZqRMftEh3rfMShkt03tEoCn2Xcbo9jxBfA&usqp=CAc',
      category: 'Home Decor',
    },
  ];

  const filteredProducts = products.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <div className="page-content">
      <h2>Showing: {selectedCategory}</h2>

      <div className="product-grid">
        {filteredProducts.map((item, index) => (
          <div className="product-item" key={index}>
            <a href={item.image} target="_blank" rel="noopener noreferrer">
              <img src={item.image} alt={item.name} />
            </a>
            <p>{item.name} - ₹{item.price}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h3>Your Cart:</h3>
      <ul>
        {cart.map((item, i) => (
          <li key={i}>{item.name} - ₹{item.price}</li>
        ))}
      </ul>

      <p><strong>Total Amount:</strong> ₹{totalAmount}</p>

      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
}

export default Product;
