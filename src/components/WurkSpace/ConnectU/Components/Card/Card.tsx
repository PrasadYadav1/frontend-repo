import React, { useState } from "react";
// import { Clock} from "react-feather";
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import { formatDate } from "../../Api/Util";
import { ICard } from "../../Interfaces/interface";
import Dropdown from "../Dropdown/Dropdown";
import "./Card.css";
import CardInfo from "./CardInfo/CardInfo";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
// import { AlignLeft, CheckSquare, Clock, MoreHorizontal } from "react-feather";
// import Chip from "../Common/Chip";
// import { AlignLeft, Clock, MoreHorizontal } from "react-feather";

interface CardProps {
  card: ICard;
  boardId: number;
  removeCard: (boardId: number, cardId: number) => void;
  onDragEnd: (boardId: number, cardId: number) => void;
  onDragEnter: (boardId: number, cardId: number) => void;
  updateCard: (boardId: number, cardId: number, card: ICard) => void;
}
function Card(props: CardProps) {
  const { card, boardId, removeCard, onDragEnd, onDragEnter, updateCard } =
    props;
  // const { id, title, desc, date, tasks, labels } = card;
  const { id, title, date } = card;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={card}
          boardId={boardId}
          updateCard={updateCard}
        />
      )}
      <div
        className="card"
        key={card.id}
        draggable
        onDragEnd={() => onDragEnd(boardId, id)}
        onDragEnter={() => onDragEnter(boardId, id)}
        onClick={() => setShowModal(true)}
      >
        {/* <BorderColorOutlinedIcon sx={{color: "rgb(133, 129, 129)",fontSize:14 }}/> */}
        <div className="card-top">
          {/* <div className="card-top-labels">
            {labels?.map((item, index) => (
              <Chip key={index} item={item} />
            ))}
          </div> */}
          <div
            className="card-top-more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            {showDropdown && (
              <Dropdown
                class="board-dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => removeCard(boardId, id)}>Delete</p>
              </Dropdown>
            )}
          </div>
          <MoreHorizIcon sx={{color:"#cdcdb1"}} />
        </div>
        <div className="card-title">{title}</div>
        {/* <div>
          <p title={desc}>
            <AlignLeft />
          </p>
        </div> */}
        <div className="card-footer">
          {date && (
            <p className="card-footer-item">
              <HistoryToggleOffIcon className="card-footer-icon" />
              Due on {formatDate(date)} 
            </p>
          )}
          {/* {tasks && tasks?.length > 0 && (
            <p className="card-footer-item">
              <CheckSquare className="card-footer-icon" />
              {tasks?.filter((item) => item.completed)?.length}/{tasks?.length}
            </p>
          )} */}
          <BorderColorOutlinedIcon sx={{color: "rgb(133, 129, 129)",fontSize:14 }}/>
        </div>
        
      </div>
    </>
  );
}

export default Card;
