// Import necessary dependencies
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import Wishlist from './WishList';

const SimRacingDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('welcome');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

 
  const [user, setUser] = useState({
    username: 'Driver'
  });

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCategory !== 'welcome') {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:5000/api/${selectedCategory}`);
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
          alert('Error fetching data. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToWishlist = async (item) => {
    try {
      await axios.post('http://localhost:5000/api/wishlist', item);
      alert(`${item.title} added to Wishlist`);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Error adding to Wishlist. Please try again.');
    }
  };

  const handleDeleteFromWishlist = async (item) => {
    try {
      await axios.delete(`http://localhost:5000/api/wishlist/${item.id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== item.id));
      alert(`${item.title} removed from Wishlist`);
    } catch (error) {
      console.error('Error deleting from wishlist:', error);
      alert('Error removing from Wishlist. Please try again.');
    }
  };

  const handleLogout = () => {
    navigate('/simracinglogin');
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ 
      textAlign: 'center',
      background: 'linear-gradient(to bottom, #3498db, #ffffff)'
    }}>
      <img src="https://traxion.gg/wp-content/uploads/2022/05/cars.jpg" alt="Race Car" style={{ width: '100%', maxHeight: '250px', objectFit: 'cover', marginBottom: '5px' }} />
      <h2>Welcome to the Sim Racing Store, {user.username}!</h2>

      {/* Tab Container */}
      <div style={{ borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'center' }}>
        {['welcome', 'wheels', 'pedals', 'cockpits', 'wishlist'].map((category) => (
          <button
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={selectedCategory === category ? 'active-tab' : ''}
            style={{
              width: '150px',
              height: '50px',
              backgroundColor: getCategoryColor(category),
              color: '#fff',
              margin: '0 10px',
            }}
          >
            {capitalizeFirstLetter(category)}
          </button>
        ))}
        <button onClick={handleLogout} style={{ width: '80px', height: '40px', backgroundColor: '#34495e', color: '#fff', marginLeft: '10px' }}>
          Logout
        </button>
        {/* Show the username next to the logout button */}
        <span style={{ marginLeft: '10px', color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>{user.username}</span>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for products"
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: '300px', marginBottom: '5px' }}
      />

      {/* Render the selected category component */}
{selectedCategory === 'welcome' ? (
  <div>
    <p>This application is made to help everyone starting out into Sim Racing to learn what equipment to buy and the path to the right upgrade.</p>
    <p>Here are some of the equipment to buy at every price level.</p>
    <p>Please take a look at what we have in our store.</p>
    <p>
     
        <img src='https://www.logolynx.com/images/logolynx/37/3762e44a9d2cdb9fabee6e93cf954b93.jpeg' alt='Fanatec' />
    </p>  
    <p>
    <a href="https://www.logitech.com/en-us" target="_blank" rel="noopener noreferrer"></a>
      <img src='https://pluspng.com/img-png/logitech-logo-png-logitech-g-brands-of-the-world-img-vector-logos-and-195x195.png' alt='Logitech' />
    </p>
    <p>
    {/* <a href="https://www.thrustmaster.com/en-us/homepage/" target="_blank" rel="noopener noreferrer"></a> */}
      <img src='https://logovectorseek.com/wp-content/uploads/2021/03/thrustmaster-logo-vector-xs.png' alt='Thrustmater' />
    </p>
  </div>
) : (
  <div>
    <h3>Products in the {capitalizeFirstLetter(selectedCategory)} category:</h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', justifyContent: 'space-between' }}>
    {filteredProducts.map((item) => (
  <Card
    key={item.id}
    item={item}
    onAddToWishlist={handleAddToWishlist}
    onDeleteFromWishlist={handleDeleteFromWishlist}
    isInWishlist={selectedCategory === 'wishlist'}
  />
))}

    </div>
  </div>
)}

      {/* Render Wishlist component at the bottom */}
      {selectedCategory === 'wishlist' && <Wishlist />}
    </div>
  );
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getCategoryColor(category) {
  switch (category) {
    case 'wheels':
      return '#3498db';
    case 'pedals':
      return '#2ecc71';
    case 'cockpits':
      return '#e74c3c';
    case 'wishlist':
      return '#f39c12';
    default:
      return '#f8825d';
  }
}

export default SimRacingDashboard;


