import React, { Component } from "react";
import Card from "./Card";
import DiamondIcon from "./icons/diamond-icon";
import ClubsIcon from "./icons/clubs-icon";
import HeartsIcon from "./icons/hearts-icon";
import SpadesIcon from "./icons/spades-icon";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.createDeck(),
      shownCardIndex: 0,
      topRows: [[], [], [], []],
      playRows: [[], [], [], [], [], [], []],
      movingArray: [],
      cardRows: []
    };
  }
  componentWillMount() {
    this.addToPlayRow();
    this.setFirstCard();
  }

  setFirstCard = () => {
    let cards = this.createDeck();
    cards[0].flipped = true;
    this.setState({ cards });
  };

  createDeck = () => {
    let suits = ["♧", "♡", "♢", "♤"];
    let deck = [];
    let color;
    suits.map(suit => {
      for (let i = 1; i <= 13; i++) {
        suit === "♧" || suit === "♤" ? (color = "black") : (color = "red");
        deck.push({
          rank: i,
          displayRank: i,
          suit: suit,
          color: color,
          flipped: false,
          selected: false
        });
      }
      return deck;
    });

    for (let j = 0; j < deck.length; j++) {
      if (deck[j].displayRank === 1) {
        deck[j].displayRank = "A";
      }
      if (deck[j].displayRank === 11) {
        deck[j].displayRank = "J";
      }
      if (deck[j].displayRank === 12) {
        deck[j].displayRank = "Q";
      }
      if (deck[j].displayRank === 13) {
        deck[j].displayRank = "K";
      }
    }

    let shuffleDeck = [];
    while (shuffleDeck.length < 52) {
      let index = Math.floor(Math.random() * deck.length);
      shuffleDeck.push(deck[index]);
      deck.splice(index, 1);
    }
    return shuffleDeck;
  };

  displayCards = () => {
    return this.state.cards.map(card => {
      return (
        <div>
          {card.displayRank}
          {card.suit}
        </div>
      );
    });
  };

  showNextCard = () => {
    let cards = this.state.cards;
    let shownCardIndex = this.state.shownCardIndex;
    if (cards.length > 0) {
      let nextIndex = shownCardIndex + 1;
      if (nextIndex === cards.length) {
        nextIndex = 0;
      }
      cards[nextIndex].flipped = true;
      if (nextIndex > 0) {
        cards[nextIndex - 1].flipped = false;
      }
      cards[shownCardIndex].selected = false;
      this.setState({
        shownCardIndex: nextIndex,
        cards
      });
    }
  };

  placement = cardRow => {
    let addedCard = false;
    let shownCardIndex = this.state.shownCardIndex;
    let cards = this.state.cards;
    let Selectedcard = this.state.cards[shownCardIndex];
    let newIndex;

    if (shownCardIndex === 0) {
      newIndex = 0;
    } else {
      newIndex = shownCardIndex - 1;
    }
    if (Selectedcard.rank === 1 && cardRow.length === 0) {
      cardRow.push(Selectedcard);
      addedCard = true;
    } else if (
      cardRow.length > 0 &&
      Selectedcard.rank - 1 === cardRow[cardRow.length - 1].rank
    ) {
      cardRow.push(Selectedcard);
      addedCard = true;
    }
    if (addedCard && cards.length > 0) {
      cards.splice(shownCardIndex, 1);
      Selectedcard.selected = false;
      if (shownCardIndex > 0) {
        cards[shownCardIndex - 1].flipped = true;
      }
      if (cards.length > 0 && shownCardIndex === 0) {
        cards[0].flipped = true;
      }
      this.setState({
        shownCardIndex: newIndex,
        cards
      });
    }
  };

  placeCards = () => {
    let card = this.state.cards[this.state.shownCardIndex];
    let topRows = this.state.topRows;

    if (card.suit === "♧") {
      this.placement(topRows[0]);
    }
    if (card.suit === "♢") {
      this.placement(topRows[1]);
    }
    if (card.suit === "♤") {
      this.placement(topRows[2]);
    }
    if (card.suit === "♡") {
      this.placement(topRows[3]);
    }
  };

  addToPlayRow = reset => {
    if (!reset) {
      if (this.state.playRows[0].length === 0) {
        for (let i = 0; i < 7; i++) {
          let playRows = this.state.playRows;
          let cardsToAdd = this.state.cards.splice(0, i + 1);
          playRows[i].push(...cardsToAdd);
          playRows[i][playRows[i].length - 1].flipped = true;
          this.setState({ playRows });
        }
      }
    }

    if (reset) {
      this.setState({
        cards: this.createDeck(),
        shownCardIndex: 0,
        topRows: [[], [], [], []],
        playRows: [[], [], [], [], [], [], []],
        movingArray: [],
        cardRows: []
      });

      let playRows = [[], [], [], [], [], [], []];
      let cards = this.createDeck();

      for (let i = 0; i < 7; i++) {
        let cardsToAdd = cards.splice(0, i + 1);

        playRows[i].push(...cardsToAdd);
        playRows[i][playRows[i].length - 1].flipped = true;
      }
      this.setState({
        playRows,
        cards,
        reset: false
      });
    }
  };

  placementRow = (cardTopRow, card, lengthOfPlayRows) => {
    let playRows = this.state.playRows;

    if (card.rank === 1 && cardTopRow.length === 0) {
      card.flipped = true;
      cardTopRow.push(card);
      let selectedCardRowLength = playRows[lengthOfPlayRows].length - 1;
      let selectedCardRow = playRows[lengthOfPlayRows];
      selectedCardRow.splice(selectedCardRowLength, 1);
    } else if (
      cardTopRow.length > 0 &&
      card.rank - 1 === cardTopRow[cardTopRow.length - 1].rank
    ) {
      cardTopRow.push(card);
      let selectedCardRowLength = playRows[lengthOfPlayRows].length - 1;
      let selectedCardRow = playRows[lengthOfPlayRows];
      selectedCardRow.splice(selectedCardRowLength, 1);
    }
    let flippedCard =
      playRows[lengthOfPlayRows][playRows[lengthOfPlayRows].length - 1];
    if (flippedCard) {
      flippedCard.flipped = true;
    }
    this.setState({
      playRows
    });
  };

  placePlayRow = (card, lengthOfPlayRows, indexOfCard) => {
    let a = this.state.playRows[lengthOfPlayRows].length - 1;
    let topRows = this.state.topRows;

    if (card.suit === "♧" && indexOfCard === a) {
      this.placementRow(topRows[0], card, lengthOfPlayRows);
    }
    if (card.suit === "♢" && indexOfCard === a) {
      this.placementRow(topRows[1], card, lengthOfPlayRows);
    }
    if (card.suit === "♤" && indexOfCard === a) {
      this.placementRow(topRows[2], card, lengthOfPlayRows);
    }
    if (card.suit === "♡" && indexOfCard === a) {
      this.placementRow(topRows[3], card, lengthOfPlayRows);
    }
  };

  // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  moveCards = (card, playerRow, cardIndex) => {
    let selectedCardIndex;
    let selectedCardFromDeck;
    let selectedCardRowIndex;
    let cards = this.state.cards;
    let shownCardIndex = this.state.shownCardIndex;
    let playRows = this.state.playRows;
    let selectedDeckCard = this.state.cards[shownCardIndex];

    //this section is to handle an onclick on the player deck second click
    if (cards.length > 0 && cards[shownCardIndex].selected) {
      selectedCardFromDeck = true;
    }

    //----------------------this executes when a playerRow card is clicked for the second time
    for (let i = 0; i < playRows.length; i++) {
      for (let j = 0; j < playRows[i].length; j++) {
        if (playRows[i][j].selected) {
          selectedCardRowIndex = i;
          selectedCardIndex = j;
        }
      }
    }

    if (
      selectedCardFromDeck &&
      cards[shownCardIndex].rank === 13 &&
      cards.length > 0
    ) {
      let selectedDeckCard = cards[shownCardIndex];
      if (playerRow >= 0) {
        let movingCardLocation = playRows[playerRow];
        if (
          (playerRow === 0 || playerRow > 0) &&
          movingCardLocation.length === 0
        ) {
          cards.splice(shownCardIndex, 1);
          movingCardLocation.push(selectedDeckCard);
          selectedDeckCard.selected = false;
          movingCardLocation[0].flipped = true;
          let newShownCardIndex = shownCardIndex ? shownCardIndex - 1 : 0;
          cards[newShownCardIndex].flipped = true;
          this.setState({
            playRows,
            shownCardIndex: newShownCardIndex,
            cards
          });
        }
        selectedDeckCard.selected = false;
        this.setState({ cards });
        return;
      }

      let movingCardLocation =
        playRows[playerRow][playRows[playerRow].length - 1];
      if (
        selectedDeckCard.color !== movingCardLocation.color &&
        selectedDeckCard.rank === movingCardLocation.rank - 1
      ) {
        cards.splice(shownCardIndex, 1);
        playRows[playerRow].push(selectedDeckCard);
        selectedDeckCard.selected = false;
        let newShownCardIndex = shownCardIndex ? shownCardIndex - 1 : 0;

        this.setState({ playRows, cards, shownCardIndex: newShownCardIndex });
        return;
      }

      return;
    }
    //this section is to handle an onclick on the player deck second click
    if (
      selectedCardFromDeck === true &&
      (playerRow === 0 || playerRow) &&
      cards.length > 0
    ) {
      if (playerRow === 0 || playerRow) {
        let movingCardLocation =
          playRows[playerRow][playRows[playerRow].length - 1];
        if (
          selectedDeckCard.color !== movingCardLocation.color &&
          selectedDeckCard.rank === movingCardLocation.rank - 1
        ) {
          cards.splice(shownCardIndex, 1);
          playRows[playerRow].push(selectedDeckCard);
          selectedDeckCard.selected = false;
          selectedDeckCard.flipped = true;
          if (cards.length > 0) {
            let newShownCardIndex = shownCardIndex > 0 ? shownCardIndex - 1 : 0;
            cards[newShownCardIndex].flipped = true;
            this.setState({
              playRows,
              cards,
              shownCardIndex: newShownCardIndex
            });
          }
          return;
        } else {
          selectedDeckCard.selected = false;
          this.setState({ playRows });
        }
        return;
      }
    }

    //----------------------this executes when a playerRow card is clicked for the second time
    if (selectedCardRowIndex >= 0 && (playerRow === 0 || playerRow)) {
      let selectedCard = playRows[selectedCardRowIndex][selectedCardIndex];
      let movingCardLocation =
        playRows[playerRow][playRows[playerRow].length - 1];

      if (
        playRows[playerRow].length > 0 &&
        selectedCard.color !== movingCardLocation.color &&
        selectedCard.rank === movingCardLocation.rank - 1
      ) {
        let removedCards = playRows[selectedCardRowIndex].splice(
          selectedCardIndex,
          playRows[selectedCardRowIndex].length - selectedCardIndex
        );
        playRows[playerRow].push(...removedCards);

        if (playRows[selectedCardRowIndex].length > 0) {
          playRows[selectedCardRowIndex][selectedCardIndex - 1].flipped = true;
        }
        selectedCard.selected = false;
        this.setState({ playRows });
        return;
      } else {
        selectedCard.selected = false;
        this.setState({ playRows: playRows });
      }

      if (playRows[playerRow].length === 0 && selectedCard.rank === 13) {
        let kingRow = playRows[selectedCardRowIndex].splice(
          selectedCardIndex,
          playRows[selectedCardRowIndex].length - selectedCardIndex
        );
        playRows[playerRow].push(...kingRow);
        if (cards.length > 0) {
          let b = playRows[selectedCardRowIndex].length - 1;
          selectedCard.selected = false;
          this.setState({ playRows: playRows });
          if (playRows[selectedCardRowIndex].length > 0) {
            playRows[selectedCardRowIndex][b].flipped = true;
          }
          this.setState({ playRows: playRows });
        }
      }
      return;
    }
    //this section is to handle an onclick on the deck first click

    if (playerRow === false && playerRow !== 0 && cards.length > 0) {
      if (selectedCardIndex === 0 || selectedCardIndex) {
        let b =
          playRows[selectedCardRowIndex][
            playRows[selectedCardRowIndex].length - 1
          ];
        b.selected = false;
        this.setState({ playRows: playRows });
        return;
      }
      if (cards[shownCardIndex].selected === false) {
        cards[shownCardIndex].selected = true;
        this.setState({ cards });
      } else {
        cards[shownCardIndex].selected = false;
        this.setState({ cards });
      }
      return;
    }
    //----------------------this is the first thing that executes when a playerRow card is clicked
    if (playRows[playerRow].length > 0 && card.flipped === true) {
      let newPlayRows = [...playRows];
      newPlayRows[playerRow][cardIndex].selected = true;
      this.setState({ playRows: newPlayRows });
    }
    return card;
  };

  getPlayerRow = () => {
    let emptyArray = [];
    let playRows = this.state.playRows;

    for (let i = 0; i < playRows.length; i++) {
      if (playRows[i].length === 0) {
        emptyArray.push(
          <div className="card-holder">
            <div className="empty-card" onClick={() => this.moveCards(null, i)}>
              {" "}
            </div>
          </div>
        );
      } else {
        emptyArray.push(
          <div key={i} className="card-holder">
            {playRows[i].map((card, index) => {
              return (
                <Card
                  key={index}
                  card={card}
                  clickHandlerDouble={() => this.placePlayRow(card, i, index)}
                  clickHandlerSingle={() => this.moveCards(card, i, index)}
                  styles={{ top: index * 30 + "px" }}
                  isPlayRowCard={true}
                />
              );
            })}
          </div>
        );
      }
    }

    return emptyArray;
  };

  getPlayerRowTop = () => {
    let emptyArray = [];
    let topRows = this.state.topRows;

    for (let i = 0; i < 4; i++) {
      if (topRows[i].length > 0) {
        let card = topRows[i][topRows[i].length - 1];
        emptyArray.push(<Card card={card} />);
      } else {
        emptyArray.push(<div key={i} className="pb-standard" />);
      }
    }
    return emptyArray;
  };

  reset = () => {
    let reset = true;
    this.addToPlayRow(reset);
    this.setFirstCard();
  };

  getTopSection = () => {
    let cards = this.state.cards;
    let shownCardIndex = this.state.shownCardIndex;
    return (
      <div className="top-section">
        <div className="card-deck">
          <div className="blank-card" onClick={this.showNextCard} />

          {cards[shownCardIndex] && (
            <Card
              card={cards[shownCardIndex]}
              clickHandlerDouble={() => {
                this.placeCards();
              }}
              clickHandlerSingle={() => {
                this.moveCards(cards[shownCardIndex], false);
              }}
            />
          )}
        </div>
        <div className="boxes">{this.getPlayerRowTop()}</div>
      </div>
    );
  };

  endGame = () => {
    let playRows = this.state.playRows;
    if (
      playRows[0].length === 0 &&
      playRows[1].length === 0 &&
      playRows[2].length === 0 &&
      playRows[3].length === 0 &&
      playRows[4].length === 0 &&
      playRows[5].length === 0 &&
      playRows[6].length === 0
    ) {
      return true;
    }
    return false;
  };

  getIconDeck = () => {
    let cards = this.state.cards;
    let shownCardIndex = this.state.shownCardIndex;

    if (cards.length > 0) {
      switch (cards[shownCardIndex].suit) {
        case "♢":
          return <DiamondIcon />;
        case "♧":
          return <ClubsIcon />;
        case "♡":
          return <HeartsIcon />;
        case "♤":
          return <SpadesIcon />;
        default:
          return;
      }
    }
  };

  getIconTop = card => {
    let topRows = this.state.topRows;

    for (let i = 0; i < 4; i++) {
      if (topRows[i].length > 0) {
        if (card.flipped) {
          switch (card.suit) {
            case "♢":
              return <DiamondIcon />;
            case "♧":
              return <ClubsIcon />;
            case "♡":
              return <HeartsIcon />;
            case "♤":
              return <SpadesIcon />;
            default:
              return;
          }
        }
      }
    }
  };

  render() {
    return (
      <div className="main-page">
        <div
          className="reset-button"
          onClick={() => {
            this.reset();
          }}
        >
          New Game
        </div>
        <div>{this.getTopSection()}</div>
        <div className="the-cards">{this.getPlayerRow()}</div>
        {this.endGame() && (
          <div className="end-message">
            Well Done!! You have completed this round.
          </div>
        )}
      </div>
    );
  }
}

export default Cards;
