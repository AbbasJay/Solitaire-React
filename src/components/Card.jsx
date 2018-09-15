import React, { Component } from "react";
import DiamondIcon from "./icons/diamond-icon";
import ClubsIcon from "./icons/clubs-icon";
import HeartsIcon from "./icons/hearts-icon";
import SpadesIcon from "./icons/spades-icon";

class Card extends Component {
  getIcon = () => {
    if (this.props.card.flipped) {
      switch (this.props.card.suit) {
        case "♢":
          return <DiamondIcon />;
        case "♧":
          return <ClubsIcon />;
        case "♡":
          return <HeartsIcon />;
        case "♤":
          return <SpadesIcon />;
      }
    }
  };

  render() {
    let card = this.props.card;
    let newClass =
      card.color === "red" ? "pb-standard red" : "pb-standard black";
    if (!card.flipped) {
      newClass = newClass + " blank-card";
    }

    if (card.selected) {
      newClass = newClass + " selected-card";
    }

    if (this.props.isPlayRowCard) {
      newClass = newClass + " card";
    }
    return (
      <div
        className={newClass}
        onDoubleClick={!card.flipped ? null : this.props.clickHandlerDouble}
        onClick={this.props.clickHandlerSingle}
        style={this.props.styles}
      >
        <div className="card-holder2">
          {card.flipped && (
            <div className="number-holder">
              {card.suit}
              {card.displayRank}
            </div>
          )}

          <div className="icon-holder">{this.getIcon()}</div>
        </div>
      </div>
    );
  }
}

export default Card;
