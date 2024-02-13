import React, { useContext, useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../firebase/Auth';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import { doSignOut } from '../firebase/FirebaseFunctions';

const categories = [
  "T-shirts", "Blouses", "Sweaters", "Jeans", "Pants", "Shorts",
  "Jackets", "Coats", "Overcoats", "Skirts", "Suits", "Dresses",
  "Shoes", "Boots", "Leather shoes", "Sandals", "Sneakers", "Heels",
  "Hats", "Bags", "Accessories"
];

const MyCloset = () => {
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();
  const [clothes, setClothes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All clothes');

  useEffect(() => {
    const fetchClothes = async () => {
      if (!currentUser) return;
      const db = getFirestore();
      const docRef = doc(db, 'closets', currentUser.uid);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setClothes(docSnap.data().items || []);
      } else {
        console.log("No such document!");
      }
    };

    fetchClothes();
  }, [currentUser]);

  const handleSignOut = () => {
    doSignOut();
    navigate('/');
    alert("You have been signed out");
  };

  const handleListItemClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '80vh', width: '100%' }}>
      <Box sx={{ alignSelf: 'flex-end', p: 1 }}>
        {currentUser && (
          <select onChange={(e) => {
              if (e.target.value === 'myCloset') {
                navigate('/myCloset');
              } else if (e.target.value === 'signOut') {
                handleSignOut();
              }
            }} style={{ background: "none", border: "none", cursor: "pointer" }}>
              <option value="myCloset">My Closet</option>
              <option value="signOut">Sign Out</option>
          </select>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box sx={{ width: '15%', borderRight: 1, borderColor: 'divider', overflowY: 'auto' }}>
          <List>
            <ListItemButton selected={selectedCategory === 'All clothes'} onClick={() => handleListItemClick('All clothes')}>
              <ListItemText primary="All Clothes" />
            </ListItemButton>
            {categories.map((category) => (
              clothes.some(clothe => clothe.category === category) && (
                <ListItemButton key={category} selected={selectedCategory === category} onClick={() => handleListItemClick(category)}>
                  <ListItemText primary={category} />
                </ListItemButton>
              )
            ))}
          </List>
        </Box>

        <Box sx={{ flex: 6, overflow: 'auto', padding: 2 }}>
          <Grid container spacing={2}>
            {clothes.filter(clothe => selectedCategory === 'All clothes' || clothe.category === selectedCategory).map((clothe, index) => (
              <Grid item xs={6} sm={2} md={2} lg={2} key={index}>
                <Card sx={{ maxWidth: 345, height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="420"
                    image={clothe.url}
                    alt={clothe.name}
                    sx={{ objectFit: 'cover' }} // This ensures your images cover the area, but might crop them
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default MyCloset;




