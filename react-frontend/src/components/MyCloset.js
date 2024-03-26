import React, { useContext, useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { AuthContext } from "../firebase/Auth";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/FirebaseFunctions";
import WeatherForecast from "./WeatherForecast";

// 更新衣物分类
const categories = [
  "T-shirts",
  "Longsleeves",
  "Tank tops",
  "Hoodies",
  "Blouses",
  "Blazers & Vests",
  "Sweaters",
  "Jeans",
  "Pants",
  "Agency pant",
  "Shorts",
  "Jackets",
  "Coats",
  "Overcoats",
  "Skirts",
  "Suits",
  "Dresses",
  "Shoes",
  "Boots",
  "Leather shoes",
  "Sandals",
  "Sneakers",
  "Heels",
  "Hats",
  "Bags",
  "Accessories",
];

const MyCloset = () => {
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();
  const [clothes, setClothes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Clothes");

  useEffect(() => {
    const fetchClothes = async () => {
      if (!currentUser) return;
      const db = getFirestore();
      const docRef = doc(db, "closets", currentUser.uid);

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setClothes(docSnap.data().items || []);
      } else {
        console.log("No such document exists!");
      }
    };

    fetchClothes();
  }, [currentUser]);

  const handleSignOut = () => {
    doSignOut();
    navigate("/");
    alert("You have been signed out.");
  };

  const handleListItemClick = (category) => {
    setSelectedCategory(category);
  };

  //delete an item from the db and update the list
  const deleteClothingItem = async (itemName) => {
    if (!itemName) {
      console.error("Invalid itemName:", itemName);
      return;
    }

    const db = getFirestore();
    const docRef = doc(db, "closets", currentUser.uid);
    const updatedClothes = clothes.filter((item) => item.name !== itemName);
    
    if(window.confirm("Are you sure you want to delete this picture?")) {
     try {
      await updateDoc(docRef, {
        items: updatedClothes,
      });

      setClothes(updatedClothes);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
    }
  };

  // Calculate the number of items in a category
  const countItemsInCategory = (category) => {
    return clothes.filter(
      (clothe) => category === "All Clothes" || clothe.category === category
    ).length;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        width: "100%",
      }}
    >
      <WeatherForecast />
      <Box sx={{ alignSelf: "flex-end", p: 1 }}>
        {currentUser && (
          <select
            onChange={(e) => {
              if (e.target.value === "myCloset") {
                navigate("/myCloset");
              } else if (e.target.value === "home") {
                navigate("/");
              } else if (e.target.value === "OOTD") {
                navigate("/ootd");
              } else if (e.target.value === "signOut") {
                handleSignOut();
              }
            }}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <option value="myCloset">My Closet</option>
            <option value="OOTD">OOTD</option>
            <option value="home">Home</option>
            <option value="signOut">Sign Out</option>
          </select>
        )}
      </Box>

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Box
          sx={{
            width: "15%",
            borderRight: 1,
            borderColor: "divider",
            overflowY: "auto",
            position: "sticky",
            top: 0,
            height: "calc(100vh - 48px)",
          }}
        >
          <List>
            {/* count */}
            <ListItemButton
              selected={selectedCategory === "All Clothes"}
              onClick={() => handleListItemClick("All Clothes")}
            >
              <ListItemText
                primary={`All Clothes (${countItemsInCategory("All Clothes")})`}
              />
            </ListItemButton>
            {categories.map((category) => {
              const itemCount = countItemsInCategory(category);
              return (
                clothes.some((clothe) => clothe.category === category) && (
                  <ListItemButton
                    key={category}
                    selected={selectedCategory === category}
                    onClick={() => handleListItemClick(category)}
                  >
                    <ListItemText primary={`${category} (${itemCount})`} />
                  </ListItemButton>
                )
              );
            })}
          </List>
        </Box>

        <Box sx={{ flex: 6, overflow: "auto", padding: 2 }}>
          <Grid
            container
            spacing={2}
            sx={{ mt: 2, "& .MuiGrid-item": { margin: "6px" } }}
          >
            {clothes
              .filter(
                (clothe) =>
                  selectedCategory === "All Clothes" ||
                  clothe.category === selectedCategory
              )
              .map((clothe, index) => (
                <Grid
                  item
                  key={index}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Card
                    sx={{
                      width: 290,
                      height: 360,
                      position: "relative",
                      "&:hover button": {
                        color: "#FF0000",
                      },
                    }}
                  >
                    <button
                      onClick={() => deleteClothingItem(clothe.name)}
                      className="delete-button"
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        zIndex: 2,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#000",
                        fontWeight: "bold",
                        transition: "color 0.3s",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#FF0000")}
                      onMouseLeave={(e) => (e.target.style.color = "#000")}
                    >
                      X
                    </button>
                    <CardMedia
                      component="img"
                      height="330" // 可以保留这个高度或根据需要进行调整
                      image={clothe.url}
                      alt={clothe.name}
                      sx={{
                        objectFit: "contain", // 使图片等比例缩放
                        maxHeight: "100%", // 确保图片高度不超过Card高度
                        maxWidth: "100%", // 确保图片宽度不超过Card宽度
                      }}
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
