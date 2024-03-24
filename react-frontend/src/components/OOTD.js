import React, { useState, useContext, useEffect } from 'react';
import { getFirestore, doc, getDoc, deleteDoc,query, where, collection, getDocs} from "firebase/firestore"
import { AuthContext } from "../firebase/Auth";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { doSignOut } from "../firebase/FirebaseFunctions";

const OOTD = () => {
    const currentUser = useContext(AuthContext);
    const navigate = useNavigate();
    const [outfits, setOutfits] = useState([]);
    const [myClothes, setMyClothes] = useState([]);
    const [selectedClothes, setSelectedClothes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
      const fetchMyClothes = async () => {
          if (!currentUser) {
              console.log("No user found");
              return;
          }
          const db = getFirestore();
          const docRef = doc(db, "closets", currentUser.uid);
  
          const docSnap = await getDoc(docRef);// getDoc() returns a single document
          if (docSnap.exists()) {
              setMyClothes(docSnap.data().items || []);
          } else {
              console.log("No such document in user's closet!");
          }
      };
  
      fetchMyClothes();
  }, [currentUser]); // currentUser is expected to be an object with a currentUser property

  useEffect(() => {
    const fetchOOTDs = async () => {
        if (!currentUser || !currentUser.uid) {
            console.log("No user found");
            return;
        }
        const db = getFirestore();
        // set up a query to get all OOTDs for the current user
        const ootdCollectionRef = collection(db, "OOTD");
        const q = query(ootdCollectionRef, where("user_id", "==", currentUser.uid));
        const querySnapshot = await getDocs(q); // getDocs() returns a list of documents

        const fetchedOOTDs = [];
        querySnapshot.forEach((doc) => {
            fetchedOOTDs.push(doc.data().outfit_url); 
        });
        setOutfits(fetchedOOTDs); 
    };

    fetchOOTDs();
}, [currentUser]);

  const handleSaveOutfit = async () => {
    if (selectedClothes.length === 0 || selectedClothes.length > 6) {
        alert('Please select up to 6 clothing items.');
        return;
    }

    const outfitData = {
        urls: selectedClothes.map(clothe => clothe.url),
        categories: selectedClothes.map(clothe => clothe.category),
        user_id: currentUser.uid,
    };
    
    try {
        const response = await axios.post('http://127.0.0.1:5000/outfit', outfitData, {
            headers: { 'Content-Type': 'application/json' },
        });
        setOutfits([...outfits, response.data.outfit_url]);
        setModalOpen(false);
    } catch (error) {
        console.error('Error saving outfit: ', error);
        alert('There was an error saving the outfit.');
    }    
};


    // 选择或取消选择衣服时的处理函数
    const handleClotheSelection = (clothe) => {
        const isSelected = selectedClothes.includes(clothe);
        setSelectedClothes(isSelected
            ? selectedClothes.filter(selected => selected !== clothe)
            : [...selectedClothes, clothe]);
    };

    // 删除搭配
    // const deleteOutfit = (outfitUrl) => {
    //     setOutfits(outfits.filter(outfit => outfit !== outfitUrl));
    //     // 你可能还要在这里添加逻辑来处理在后端删除搭配
    // };

    const handleSignOut = () => {
      doSignOut();
      navigate("/");
      alert("You have been signed out");
    };

    // 模态框样式
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '66%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        overflow: 'scroll',
        height: '75%',
    };

    return (
        <Box sx={{ flexGrow: 1, paddingLeft: '20px' }}>
            {/* Dropdown menu */}
            <select
                onChange={(e) => {
                    if (e.target.value === "myCloset") {
                        navigate("/myCloset");
                    } else if (e.target.value === "home") {
                        navigate("/");
                    } else if (e.target.value === "signOut") {
                        handleSignOut(); 
                    }
                }}
                style={{ position: 'absolute', top: 10, right: 10 }}
            >
                <option value="myCloset">My Closet</option>
                <option value="home">Home</option>
                <option value="signOut">Sign Out</option>
            </select>

            {/* Outfits grid */}
            <Grid container spacing={2} sx={{ mt: 2, '& .MuiGrid-item': { margin: '6px' } }}>
            {outfits.map((outfitUrl, index) => (
            <Grid item key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ width: 320, height: 400 }}>
                    <CardMedia
                        component="img"
                        image={outfitUrl}
                        alt={`Outfit ${index}`}
                        sx={{ 
                            width: '300px', 
                            height: '380px', 
                            maxWidth: '100%',
                            objectFit: 'cover', 
                            objectPosition: 'center' 
                        }}
                    />
                    {/*<button onClick={() => deleteOutfit(outfitUrl)}>Delete</button>*/}
                </Card>
            </Grid>
        ))}

                {/* Add new outfit card */}
                <Grid item xs={4}>
                    <Card sx={{ height: '380px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed' }} onClick={() => setModalOpen(true)}>
                        <Box sx={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '5em', color: 'lightgray' }}>+</div>
                        </Box>
                    </Card>
                </Grid>
            </Grid>

            {/* Modal for adding new outfit */}
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Button onClick={handleSaveOutfit} style={{ background: 'purple', color: 'white', marginBottom: '20px' }}>Save as outfit</Button>
                    <Grid container spacing={2}>
                        {myClothes.map((clothe, index) => (
                            <Grid item xs={4} sm={3} key={index}>
                                <Card sx={{ maxWidth: '280px', height: '340px' }}>
                                    <CardMedia
                                        component="img"
                                        // height="360"
                                        image={clothe.url}
                                        alt={clothe.name}
                                        sx={{ 
                                            width: '240px', 
                                            height: '300px', 
                                            marginLeft: '10px',
                                            marginTop: '10px',
                                            maxWidth: '100%',
                                            objectPosition: 'center' 
                                        }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedClothes.includes(clothe)}
                                                onChange={() => handleClotheSelection(clothe)}
                                                disabled={selectedClothes.length >= 6 && !selectedClothes.includes(clothe)}
                                            />
                                        }
                                        label=""
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Modal>
        </Box>
    );
};

export default OOTD;
