import React from 'react';
import './profile_styles.css';
import trash from "../Images/trash_can.png";
import API from '../API';

const ProfCard = (props) => {

  const user_id = localStorage.getItem('userid');
  const { image, role, rank, region, in_game_username, game} = props;

  const cardData = {
    userid: user_id,
    game: game
  }

  const handleDelete = () => {
    const payload = {
      card: cardData
    }
    const response = API.deleteUser(payload);
    console.log("response ", response);
    props.function();
    setTimeout(() => {
      window.location.reload();
    }, 250);

  }

  return (
    <div class="profile-card-profile">
        <img src={image} alt=""></img>
        <div class="card-row left">
            <span>Username: </span>
            <span>Role:</span>
            <span>Rank:</span>
            <span>Region:</span>
        </div>
        <div class="card-row right">
            <span>{in_game_username}</span>
            <span>{role}</span>
            <span>{rank}</span>
            <span>{region}</span>
        </div>
        <button class="exit-but smaller-width" onClick={handleDelete}>
          Delete
          Card
        </button>
    </div>
  );
};

export default ProfCard;