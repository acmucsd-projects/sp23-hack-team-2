import React, { useRef, useState, useEffect } from "react";
import API from "../API";
import LoadingAnimation from "./loading.jsx";
import "./profile_styles.css";
import ProfCard from "./profCard";

//import pikachu from "../Images/surprised.webp";
import val_logo from "../Images/val.png";
import lol_logo from "../Images/lol.png";
import dota_logo from "../Images/dota2.png";

const Profile = (values) => {
    const initialRankValue = 'rank';
    const initialRoleValue = 'role';
    const initialRegionValue = 'region';
    const [image, setImage] = useState(null);
    const [rankValue, setRankValue] = useState(initialRankValue); 
    const [roleValue, setRoleValue] = useState(initialRoleValue); 
    const [regionValue, setRegionValue] = useState(initialRegionValue); 
    const [userInfo, setUserInfo] = useState(null);
    const [gameArray, setGameArray] = useState([]);
    const user_id = localStorage.getItem('userid');
    const [isLoading, setIsLoading] = useState(true);


    const initialGameData = {
        user_id: user_id,
        username: "",
        game: "",
        role: "",
        rank: "",
        region: "",
    };
    const initialProfilePicture = {
        user_id: user_id,
        profilePicture: ""
    }

    const [gameData, updateGameData] = useState(initialGameData);
    const [profilePicture, updateprofilePicture] = useState(initialProfilePicture);

    const handleGameChange = (e) => {
        updateGameData({
            ...gameData,

            //trim whitespace
            [e.target.name]: e.target.value.trim()
        });

        console.log("targetname: ", e.target.value);

        if(e.target.name === "rank"){
            setRankValue(e.target.value);
        }
        else if(e.target.name === "role"){
            setRoleValue(e.target.value);
        }
        else if(e.target.name === "region"){
            setRegionValue(e.target.value);
        }
    };

    const displayUserInfo = async () => {
        try {
            const user_info = (await API.getUserData(user_id)).data.userData; 
            const username1 = user_info.username;
            const email1 = user_info.email;
            const discord_tag1 = user_info.discord;
            const college1 = user_info.college;
            const userpfp = user_info.profilePicture;

            //Make array of player games
            var player_game_array = [];
            player_game_array.push(user_info.valorant);
            player_game_array.push(user_info.leagueOfLegends);
            player_game_array.push(user_info.dota);
            setGameArray(player_game_array);
            return {username1, email1, discord_tag1, college1, userpfp}
        } catch(error) {
            console.log(error);
        }
    }

    const handleGameSubmit = async (e) => {
        e.preventDefault();
        const req = e.target;
        const payload = {
            gameInfo: gameData
        }
        JSON.stringify(payload.gameInfo);
        try {
            await API.sendGameData(payload);
            cardRef.current.classList.toggle("hide");
            //console.log("Response: ", response);
            displayUserInfo();
        } catch(error) {
            console.error(error);
            alert("An error occurred while trying to search. Please try again later.");
        }
    };

    const handleReset = () => {
        setRankValue(initialRankValue);
        setRoleValue(initialRoleValue);
        setRegionValue(initialRegionValue);
    };

    const valRef = useRef();
    const lolRef = useRef();
    const dotaRef = useRef();
    const submitRef = useRef();
    const cardRef = useRef();
    const inputRef = useRef();
    const fileInputRef = useRef(null);


    const valorantR = (e) => {
        valRef.current.classList.add(e);
        lolRef.current.classList.remove(e);
        dotaRef.current.classList.remove(e);
        submitRef.current.classList.add(e);
        inputRef.current.classList.add(e);
    }
    const lolR = (e) => {
        console.log("le: ", e);
        lolRef.current.classList.add(e);
        valRef.current.classList.remove(e);
        dotaRef.current.classList.remove(e);
        submitRef.current.classList.add(e);
        inputRef.current.classList.add(e);
    }
    const dotaR = (e) => {
        console.log("de: ", e);
        dotaRef.current.classList.add(e);
        lolRef.current.classList.remove(e);
        valRef.current.classList.remove(e);
        submitRef.current.classList.add(e);
        inputRef.current.classList.add(e);
    }

    const gameR = (e) => {
        console.log("de: ", e);
        dotaRef.current.classList.remove(e);
        lolRef.current.classList.remove(e);
        valRef.current.classList.remove(e);
        submitRef.current.classList.remove(e);
        inputRef.current.classList.remove(e);
    }
    const handleOptionChange = (event) => {
        const selectedValue = event.target.value;
        // Perform additional actions based on the selected option
        console.log(selectedValue)
        if (selectedValue === "valorant") {
            valorantR('show-block');
       }
        else if (selectedValue === "league-of-legends") {
            lolR('show-block');
        }
        else if (selectedValue === "dota" ){
            dotaR('show-block');
        }
        else if (selectedValue ==="game") {
            gameR('show-block');
        }
        handleGameChange(event);
        handleReset();
      };
    const createNewCard = () => {
        cardRef.current.classList.toggle("hide");
    }

    const getOut = () => {
        values.logout();
        window.location.href = "https://ucsdgamed.onrender.com/";
      } 

    const profileCards = gameArray.map((player, index) => {
        var gameImage;
        var gameUsername;
        var game;
        if(player == null){
            return null
        }
        if(index === 0){
            if(player.val_username !== null){
                gameImage = val_logo;
                gameUsername = player.val_username;
                game = "valorant";
            }
        }
        else if(index === 1){
            if(player.lol_username !== null){
                gameImage = lol_logo;
                gameUsername = player.lol_username;
                game = "league-of-legends";
            }
        }
        else{
            if(player.dota_username !== null){
                gameImage = dota_logo;
                gameUsername = player.dota_username;
                game = "dota";
            }
        }
        console.log("GameUsername: " + gameUsername);

        if(player !== null) {
          return <ProfCard
          key={index}
          image={gameImage}
          in_game_username={gameUsername}
          rank={player.rank}
          role={player.role}
          region={player.region}
          game={game}
          function={displayUserInfo}
          />
        }

        return null;
    });
    
    function decodeBase64ToImage(base64String) {
        const img = new Image();
        img.src = `data:image/png;base64,${base64String}`;
        return img;
    }
    useEffect(() => {
        async function fetchUserInfo() {
          try {
            const userInfo11 = await displayUserInfo();
            const { username1, email1, discord_tag1, college1, dota1, userpfp } = userInfo11;
            setImage(decodeBase64ToImage(userpfp))
            setUserInfo({ username1, email1, discord_tag1, college1, dota1 });
          } catch (error) {
            console.error(error);
          }
          setIsLoading(false);
        }
    
        fetchUserInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run once on component mount
      
    const handleFileSelection = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        const maxSize = 50 * 1024; // 50KB (in bytes)
        reader.onloadend = (event) => {
            if (file && file.size <= maxSize) {
                const base64String = reader.result;
                const base64content = base64String.split(",")[1];    
                // Perform actions with the Base64-encoded content
                updateprofilePicture({
                  ...initialProfilePicture,
                  user_id: user_id,
                  profilePicture: base64content,
                });
                const uploadProfilePictureAsync = async () => {
                    const payload2 = {
                        user_id: user_id,
                        profilePicture: base64content,
                    };
                    try {
                        const response2 = await API.uploadProfilePicture(payload2);
                        window.location.reload();
                    } catch (error) {
                        console.error(error);
                        alert('Error! Likely the file size of the image you put in is too big.') 
                    }
                };
                uploadProfilePictureAsync();

            } else if (file) {
                const img = new Image();
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const maxWidth = 400; // Adjust the desired maximum width of the image
                    const scale = maxWidth / img.width;
                    const newWidth = img.width * scale;
                    const newHeight = img.height * scale;
        
                    canvas.width = newWidth;
                    canvas.height = newHeight;
            
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);
                    canvas.toBlob(
                        (blob) => {
                        const downscaledImage = new File([blob], file.name, {
                            type: file.type,
                            lastModified: Date.now(),
                        });
                        // Use the downscaledImage as the new file to upload
                        // Your upload logic here
                        const downscaledReader = new FileReader();
                        downscaledReader.onload = function (event) {
                            const base64String = downscaledReader.result;
                            const base64content = base64String.split(",")[1];
                            // Perform actions with the Base64-encoded content
                            const uploadProfilePictureAsync = async () => {
                                const payload2 = {
                                    user_id: user_id,
                                    profilePicture: base64content,
                                };
                                try {
                                    const response2 = await API.uploadProfilePicture(payload2);
                                    window.location.reload();
                                } catch (error) {
                                    console.error(error);
                                    alert('Error! Likely the file size of the image you put in is too big.') 
                                }
                            };
                            uploadProfilePictureAsync();
                        };
                
                        downscaledReader.readAsDataURL(downscaledImage);
                        },
                    file.type,
                    0.75 // Adjust the desired image quality (0.0 to 1.0)
                    );
                };
                img.src = event.target.result;
            }
        }
        reader.readAsDataURL(file);
    };

    const openFilePicker = () => {
        fileInputRef.current.click();
    };
      
    //console.log("bruhhhhh111h end" + username2);
    return(
    <div class="profile">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Khand&display=swap"></link>
        <div class="left-panel">
            <div class="circle">
                {image && <img src={image.src} alt="profile" />}
                <input type="file" ref={fileInputRef} onChange={handleFileSelection}></input>
                <button class="change-button" onClick={openFilePicker}>Change Profile Picture</button>
            </div>
            <div class="profile-info">
            {isLoading ? (<LoadingAnimation />): userInfo && (
                <>
                <li><span class="special-username">{userInfo.username1}</span></li>
                <li>Email: {userInfo.email1}</li>
                <li>Discord Tag: {userInfo.discord_tag1}</li>
                <li>College: {userInfo.college1}</li>
                </>
            )}
            </div>
            <div className="center-but">
                <button className="log-out-but" onClick={getOut}>Log Out</button>
            </div>
        </div>
        <div class="right-panel">
            My Cards
            <div class="card-collection">
                <button onClick={createNewCard}>Create a Card!</button>
            </div>
            {profileCards}
            <div className="pop-up-card hide" ref={cardRef}>
                <select name="game" onChange={handleOptionChange} class="select-chosen">
                    <option value="game">Game</option>
                    <option value="valorant">Valorant</option>
                    <option value="league-of-legends">League of Legends</option>
                    <option value="dota">DOTA 2</option>
                </select>
                <div className="username-input hide" ref={inputRef}>
                    <input type="text" id="username" name="username" placeholder="In-Game Username" onChange={handleGameChange}></input>
                </div>
                <div className="hide" ref={valRef}>
                    <select value={roleValue} name="role" onChange={handleGameChange} className="select-chosen" ref={valRef}>
                        <option disabled selected value="Role">Role</option>
                        <option value="Controller">Controller</option>
                        <option value="Duelist">Duelist</option>
                        <option value="Initiator">Initiator</option>
                        <option value="Sentinel">Sentinel</option>
                    </select>
                    <select value={rankValue} name="rank" onChange={handleGameChange} className="select-chosen" ref={valRef}>
                        <option disabled selected value="Rank">Rank</option>
                        <option value="Iron">Iron</option>
                        <option value="Bronze">Bronze</option>
                        <option value="Silver">Silver</option>
                        <option value="Gold">Gold</option>
                        <option value="Platinum">Platinum</option>
                        <option value="Diamond">Diamond</option>
                        <option value="Ascendant">Ascendant</option>
                        <option value="Immortal">Immortal</option>
                        <option value="Radiant">Radiant</option>
                    </select>
                    <select value={regionValue} name="region" onChange={handleGameChange} className="select-chosen" ref={valRef}>
                        <option disabled selected value="Region">Region</option>
                        <option value="SEA">SE Asia</option>
                        <option value="Japan">Japan</option>
                        <option value="USWest">US West</option>
                        <option value="USEast">US East</option>
                    </select>
                </div>
                <div className="hide" ref={lolRef}>
                    <select value={roleValue} name="role" onChange={handleGameChange} className="select-chosen" ref={lolRef}>
                        <option value="Role">Role</option>
                        <option value="Top">Top</option>
                        <option value="Jungle">Jungle</option>
                        <option value="Mid">Mid</option>
                        <option value="ADC">ADC</option>
                        <option value="Support">Support</option>
                    </select>
                    <select value={rankValue} name="rank" onChange={handleGameChange} className="select-chosen" ref={lolRef}>
                        <option value="Rank">Rank</option>
                        <option value="Iron">Iron</option>
                        <option value="Bronze">Bronze</option>
                        <option value="Silver">Silver</option>
                        <option value="Gold">Gold</option>
                        <option value="Platinum">Platinum</option>
                        <option value="Diamond">Diamond</option>
                        <option value="Master">Master</option>
                        <option value="Grandmaster">Grandmaster</option>
                        <option value="Challenger">Challenger</option>
                    </select>
                    <select value={regionValue} name="region" onChange={handleGameChange} className="select-chosen" ref={lolRef}>
                        <option value="Region">Region</option>
                        <option value="NA">NA</option>
                        <option value="EUW">EU West</option>
                        <option value="EUE">EU East</option>
                        <option value="Korea">Korea</option>
                        <option value="OCE">Oceania</option>
                    </select>
                </div>
                <div className="hide" ref={dotaRef}>
                    <select value={roleValue} name="role" onChange={handleGameChange} className="select-chosen">
                        <option value="Role">Role</option>
                        <option value="Carry">Carry</option>
                        <option value="Mid">Mid</option>
                        <option value="Offlane">Offlane</option>
                        <option value="Soft Support">Soft Support</option>
                        <option value="Hard Support">Hard Support</option>
                    </select>
                    <select value={rankValue} name="rank" onChange={handleGameChange} className="select-chosen">
                        <option value="Rank">Rank</option>
                        <option value="Herald">Herald</option>
                        <option value="Guardian">Guardian</option>
                        <option value="Crusader">Crusader</option>
                        <option value="Archon">Archon</option>
                        <option value="Legend">Legend</option>
                        <option value="Ancient">Ancient</option>
                        <option value="Divine">Divine</option>
                        <option value="Immortal">Immortal</option>
                    </select>
                    <select value={regionValue} name="region" onChange={handleGameChange} className="select-chosen">
                        <option value="Region">Region</option>
                        <option value="SEA">SE Asia</option>
                        <option value="Japan">Japan</option>
                        <option value="USWest">US West</option>
                        <option value="USEast">US East</option>
                    </select>
                </div>
                <button className="hide" onClick={handleGameSubmit} ref={submitRef} type="submit">Submit</button>
            </div>
        </div>
    </div>
    );
}

export default Profile;