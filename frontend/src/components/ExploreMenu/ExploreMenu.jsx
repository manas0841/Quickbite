import React, { useRef } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  const menuRef = useRef(null);

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with finest ingredients culinary expertise. Our mission is to
        satisfy your cravings and elevate your dining experience, one delicious
        meal at a time.
      </p>
      <div className='explore-menu-container'>
        <div className='explore-menu-list' ref={menuRef}>

          {/* Map through menu_list */}
          {menu_list.map((item, index) => (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? 'All' : item.menu_name
                )
              }
              key={index}
              className='explore-menu-list-item'
            >
              <img
                className={category === item.menu_name ? 'active' : ''}
                src={item.menu_image}
                alt=''
              />
              <p>{item.menu_name}</p>
            </div>
          ))}

          {/* 'All' button */}
          <div 
            onClick={() => setCategory('All')}
            className={`explore-menu-list-item ${category === 'All' ? 'active' : ''}`}
          >
            <p>All</p>
          </div>
          
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
