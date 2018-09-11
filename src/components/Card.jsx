import React, { Component } from "react";

class Card extends Component {
  render() {
    let card = this.props.card;
    let newClass = this.props.classes;
    if (!card.flipped) {
      newClass = newClass + " blank-card";
    }

    if (card.selected) {
      newClass = newClass + " selected-card";
    }
    return (
      <div
        className={newClass}
        onDoubleClick={!card.flipped ? null : this.props.clickHandlerDouble}
        onClick={this.props.clickHandlerSingle}
        style={this.props.styles}
      >
        {card.flipped ? `${card.suit}${card.displayRank}` : ""}
      </div>
    );
  }
}

export default Card;
