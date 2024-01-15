import React, { useState } from 'react';
import './ChipInput.css';

const ChipInput = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState([
    { name: 'Marina Augustine', avatar: 'https://www.shutterstock.com/image-vector/unique-modern-creative-elegant-luxurious-260nw-699320494.jpg' },
    { name: 'Nick Giannopoulos ', avatar: 'https://img.freepik.com/free-photo/portrait-optimistic-businessman-formalwear_1262-3600.jpg' },
    { name: 'Megan Smith', avatar: 'https://pics.craiyon.com/2023-06-20/89f79a8dee744596981e7417b8a7ea1d.webp' },
    { name: 'Kaivalya Vohra ', avatar: 'https://i.pinimg.com/736x/97/31/02/9731022f0be7c965e880505461643850.jpg' },
    { name: 'Aadit Palicha', avatar: 'https://images.news18.com/ibnlive/uploads/2023/04/wp-image-703.jpg' },
  ]);
  

  const [selectedChips, setSelectedChips] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value.toLowerCase());
    setShowDropdown(value !== ''); // Show dropdown only when there is a search term
  };

  const handleItemSelect = (item) => {
    setSelectedChips([...selectedChips, item]);
    setItems((prevItems) => prevItems.filter((i) => i !== item));
    setSearchTerm('');
    setShowDropdown(false);
  };

  const handleChipRemove = (chip) => {
    setSelectedChips((prevChips) => prevChips.filter((c) => c !== chip));
    setItems((prevItems) => [...prevItems, chip]);
  };

  const handleBackspace = (e) => {
    if (e.key === 'Backspace' && searchTerm === '') {
      const lastChip = selectedChips[selectedChips.length - 1];
      if (lastChip) {
        handleChipRemove(lastChip);
      }
    }
  };

  const filteredItems = items.filter(
    (item) => item.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="chip-input-container">
      {/* Image at the top of the page */}
      <img
        src="https://play-lh.googleusercontent.com/tjzK0-TCkXB1zxkmiRr5WNGJxQy87s1RdBx10nqLbdxRIH7bPWxTkH_YiUMbYPFRfmj7" // Replace with your image URL
        alt="Title"
        className="title-image"
        style={{ width: '200px', height: 'auto' }}
      />

      <div className="search-bar">
        {selectedChips.map((chip) => (
          <div className="chip" key={chip.name}>
            <img src={chip.avatar} alt={`${chip.name}'s avatar`} className="avatar" />
            {chip.name}
            <button onClick={() => handleChipRemove(chip)}>X</button>
          </div>
        ))}
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleBackspace}
          onFocus={() => setShowDropdown(true)} // Show dropdown when input is focused
          placeholder="Type a name..."
        />
      </div>
      {showDropdown && (
        <div className="dropdown">
          {filteredItems.map((item) => (
            <div
              className="item"
              key={item.name}
              onClick={() => handleItemSelect(item)}
            >
              <img src={item.avatar} alt={`${item.name}'s avatar`} className="avatar" />
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChipInput;
