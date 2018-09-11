import React, { Component } from "react";
import Card from "./Card";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.createDeck(),
      shownCardIndex: 0,
      topRows: [[], [], [], []],
      playRows: [[], [], [], [], [], [], []],
      movingArray: [],
      cardRows: [],
      selectedCard: []
    };
  }
  componentWillMount() {
    this.mus();
    this.setFirstCard();
  }

  setFirstCard = () => {
    this.state.cards[0].flipped = true;
    this.setState({ cards: this.state.cards });
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
    if (this.state.cards.length > 0) {
      let nextIndex = this.state.shownCardIndex + 1;
      if (nextIndex === this.state.cards.length) {
        nextIndex = 0;
      }

      let a;
      a = [...this.state.cards];
      a[nextIndex].flipped = true;
      if (nextIndex > 0) {
        a[nextIndex - 1].flipped = false;
      }
      a[this.state.shownCardIndex].selected = false;

      this.setState({
        shownCardIndex: nextIndex,
        cards: a
      });
    }
  };

  placement = cardRow => {
    let addedCard = false;

    let card = this.state.cards[this.state.shownCardIndex];

    let a = this.state.cards[this.state.shownCardIndex - 1];
    let newIndex;

    if (this.state.shownCardIndex === 0) {
      newIndex = 0;
    } else {
      newIndex = this.state.shownCardIndex - 1;
    }
    if (card.rank === 1 && cardRow.length === 0) {
      cardRow.push(card);
      addedCard = true;
    } else if (
      cardRow.length > 0 &&
      card.rank - 1 === cardRow[cardRow.length - 1].rank
    ) {
      cardRow.push(card);
      addedCard = true;
    }
    if (addedCard && this.state.cards.length > 0) {
      this.state.cards.splice(this.state.shownCardIndex, 1);
      card.selected = false;
      if (this.state.shownCardIndex > 0) {
        a.flipped = true;
      }
      if ((this.state.shownCardIndex = 0)) {
        this.state.cards[0].flipped === true;
      }
      this.setState({
        shownCardIndex: newIndex
      });
    }
  };

  placeCards = () => {
    let card = this.state.cards[this.state.shownCardIndex];
    if (card.suit === "♧") {
      this.placement(this.state.topRows[0]);
    }
    if (card.suit === "♢") {
      this.placement(this.state.topRows[1]);
    }
    if (card.suit === "♤") {
      this.placement(this.state.topRows[2]);
    }
    if (card.suit === "♡") {
      this.placement(this.state.topRows[3]);
    }
  };

  mus = () => {
    for (let i = 0; i < 7; i++) {
      let cardsToAdd = this.state.cards.splice(0, i + 1);
      this.state.playRows[i].push(...cardsToAdd);
      this.state.playRows[i][this.state.playRows[i].length - 1].flipped = true;
    }
  };

  placementRow = (cardTopRow, card, lengthOfPlayRows) => {
    let a = this.state.playRows;
    if (
      a[0].length === 0 &&
      a[1].length === 0 &&
      a[2].length === 0 &&
      a[3].length === 0 &&
      a[4].length === 0 &&
      a[5].length === 0 &&
      a[6].length === 0
    ) {
      alert("Well done!! you have completed this round");
    }

    let addedCard = false;
    if (card.rank === 1 && cardTopRow.length === 0) {
      card.flipped = true;
      cardTopRow.push(card);
      addedCard = true;
      let a = this.state.playRows[lengthOfPlayRows].length - 1;
      let b = this.state.playRows[lengthOfPlayRows];
      b.splice(a, 1);
    } else if (
      cardTopRow.length > 0 &&
      card.rank - 1 === cardTopRow[cardTopRow.length - 1].rank
    ) {
      cardTopRow.push(card);
      addedCard = true;
      let a = this.state.playRows[lengthOfPlayRows].length - 1;
      let b = this.state.playRows[lengthOfPlayRows];
      b.splice(a, 1);
    }

    let flippedCard = this.state.playRows[lengthOfPlayRows][
      this.state.playRows[lengthOfPlayRows].length - 1
    ];

    if (flippedCard) {
      flippedCard.flipped = true;
    }

    this.setState({
      playRows: this.state.playRows
    });
  };

  placePlayRow = (card, lengthOfPlayRows, indexOfCard) => {
    let a = this.state.playRows[lengthOfPlayRows].length - 1;
    if (card.suit === "♧" && indexOfCard === a) {
      this.placementRow(this.state.topRows[0], card, lengthOfPlayRows);
    }
    if (card.suit === "♢" && indexOfCard === a) {
      this.placementRow(this.state.topRows[1], card, lengthOfPlayRows);
    }
    if (card.suit === "♤" && indexOfCard === a) {
      this.placementRow(this.state.topRows[2], card, lengthOfPlayRows);
    }
    if (card.suit === "♡" && indexOfCard === a) {
      this.placementRow(this.state.topRows[3], card, lengthOfPlayRows);
    }
  };

  // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  moveCards = (card, playerRow, cardIndex) => {
    let selectedCardIndex;
    let selectedCardFromDeck;
    let selectedCardRowIndex;

    //this section is to handle an onclick on the player deck second click
    if (
      this.state.cards.length > 0 &&
      this.state.cards[this.state.shownCardIndex].selected
    ) {
      selectedCardFromDeck = true;
    }

    //----------------------this is the first thing that executes when a playerRow card is clicked for the second time
    for (let i = 0; i < this.state.playRows.length; i++) {
      for (let j = 0; j < this.state.playRows[i].length; j++) {
        if (this.state.playRows[i][j].selected) {
          (selectedCardRowIndex = i), (selectedCardIndex = j);
        }
      }
    }

    if (
      selectedCardFromDeck &&
      this.state.cards[this.state.shownCardIndex].rank === 13 &&
      this.state.cards.length > 0
    ) {
      let selectedDeckCard = this.state.cards[this.state.shownCardIndex];
      if (playerRow >= 0) {
        let movingCardLocation = this.state.playRows[playerRow][
          this.state.playRows[playerRow].length
        ];
        let a = this.state.cards.splice(this.state.shownCardIndex, 1);
        this.state.playRows[playerRow].push(selectedDeckCard);

        selectedDeckCard.selected = false;
        this.state.playRows[playerRow][0].flipped = true;
        let newShownCardIndex = this.state.shownCardIndex
          ? this.state.shownCardIndex - 1
          : 0;

        this.setState({
          playRows: this.state.playRows,
          shownCardIndex: newShownCardIndex
        });
        return;
      }

      let movingCardLocation = this.state.playRows[playerRow][
        this.state.playRows[playerRow].length
      ];
      if (
        selectedDeckCard.color !== movingCardLocation.color &&
        selectedDeckCard.rank === movingCardLocation.rank - 1
      ) {
        this.state.cards.splice(this.state.shownCardIndex, 1);
        this.state.playRows[playerRow].push(selectedDeckCard);
        selectedDeckCard.selected = false;
        let playRows = this.state.playRows;
        let cards = this.state.cards;
        let newShownCardIndex = this.state.shownCardIndex
          ? this.state.shownCardIndex - 1
          : 0;

        this.setState({ playRows, cards, shownCardIndex: newShownCardIndex });
        return;
      }

      return;
    }

    //this section is to handle an onclick on the player deck second click
    if (
      selectedCardFromDeck === true &&
      (playerRow === 0 || playerRow) &&
      this.state.cards.length > 0
    ) {
      let selectedDeckCard = this.state.cards[this.state.shownCardIndex];
      if (playerRow >= 0) {
        let movingCardLocation = this.state.playRows[playerRow][
          this.state.playRows[playerRow].length - 1
        ];

        if (
          selectedDeckCard.color !== movingCardLocation.color &&
          selectedDeckCard.rank === movingCardLocation.rank - 1
        ) {
          this.state.cards.splice(this.state.shownCardIndex, 1);
          this.state.playRows[playerRow].push(selectedDeckCard);
          selectedDeckCard.selected = false;
          selectedDeckCard.flipped = true;
          let playRows = this.state.playRows;
          let cards = this.state.cards;
          let newShownCardIndex = this.state.shownCardIndex
            ? this.state.shownCardIndex - 1
            : 0;

          this.setState({
            playRows,
            cards,
            shownCardIndex: newShownCardIndex
          });
          return;
        } else {
          selectedDeckCard.selected = false;
          let playRows = this.state.playRows;
          this.setState({ playRows });
        }

        return;
      }
    }

    //----------------------this is the first thing that executes when a playerRow card is clicked for the second time
    if (selectedCardRowIndex >= 0 && (playerRow === 0 || playerRow)) {
      debugger;
      let selectedCard = this.state.playRows[selectedCardRowIndex][
        selectedCardIndex
      ];
      let movingCardLocation = this.state.playRows[playerRow][
        this.state.playRows[playerRow].length - 1
      ];
      if (
        this.state.playRows[playerRow].length > 0 &&
        selectedCard.color !== movingCardLocation.color &&
        selectedCard.rank === movingCardLocation.rank - 1
      ) {
        let removedCards = this.state.playRows[selectedCardRowIndex].splice(
          selectedCardIndex,
          this.state.playRows[selectedCardRowIndex].length - selectedCardIndex
        );
        this.state.playRows[playerRow].push(...removedCards);

        if (this.state.playRows[selectedCardRowIndex].length > 0) {
          this.state.playRows[selectedCardRowIndex][
            selectedCardIndex - 1
          ].flipped = true;
        }
        selectedCard.selected = false;
        let playRows = this.state.playRows;
        this.setState({ playRows });
        return;
      } else {
        selectedCard.selected = false;
        this.setState({ selectedCard });
      }

      if (
        this.state.playRows[playerRow].length === 0 &&
        selectedCard.rank === 13
      ) {
        let kingRow = this.state.playRows[selectedCardRowIndex].splice(
          selectedCardIndex,
          this.state.playRows[selectedCardRowIndex].length - selectedCardIndex
        );
        this.state.playRows[playerRow].push(...kingRow);
        if (this.state.cards.length > 0) {
          let b = this.state.playRows[selectedCardRowIndex].length - 1;
          selectedCard.selected = false;
          this.setState({ playRows: this.state.playRows });
          if (this.state.playRows[selectedCardRowIndex].length > 0) {
            this.state.playRows[selectedCardRowIndex][b].flipped = true;
          }
          this.setState({ playRows: this.state.playRows });
        }
      }
      return;
    }
    //this section is to handle an onclick on the deck first click

    if (playerRow === false && playerRow !== 0 && this.state.cards.length > 0) {
      if (selectedCardIndex === 0 || selectedCardIndex) {
        let b = this.state.playRows[selectedCardRowIndex][
          this.state.playRows[selectedCardRowIndex].length - 1
        ];
        b.selected = false;
        this.setState({ playRows: this.state.playRows });
        return;
      }
      this.state.cards[this.state.shownCardIndex].selected = true;
      let cards = this.state.cards;
      this.setState({ cards });
      return;
    }
    //----------------------this is the first thing that executes when a playerRow card is clicked
    if (this.state.playRows[playerRow].length > 0 && card.flipped === true) {
      let newPlayRows = [...this.state.playRows];
      newPlayRows[playerRow][cardIndex].selected = true;
      this.setState({ playRows: newPlayRows });
    }
    return card;
  };

  getPlayerRow = () => {
    let emptyArray = [];
    let red = "red";
    let black = "black";

    for (let i = 0; i < this.state.playRows.length; i++) {
      if (this.state.playRows[i].length === 0) {
        emptyArray.push(
          <div className="card-holder">
            <div className="empty-card" onClick={() => this.moveCards(null, i)}>
              {" "}
            </div>
          </div>
        );
      } else {
        emptyArray.push(
          <div className="card-holder">
            {this.state.playRows[i].map((card, index) => {
              return (
                <Card
                  card={card}
                  clickHandlerDouble={() => this.placePlayRow(card, i, index)}
                  clickHandlerSingle={() => this.moveCards(card, i, index)}
                  classes={
                    card.color === "red"
                      ? "pb-standard card red"
                      : "pb-standard card black"
                  }
                  styles={{ top: index * 30 + "px" }}
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
    for (let i = 0; i < 4; i++) {
      emptyArray.push(
        <div className="bb-standard">
          {this.state.topRows[i].map(card => {
            return (
              <div
                className={
                  card.color === "red"
                    ? "bb-standard2 card red"
                    : "bb-standard2 card black"
                }
              >
                {this.state.topRows[i][this.state.topRows[i].length - 1].suit}
                {
                  this.state.topRows[i][this.state.topRows[i].length - 1]
                    .displayRank
                }
              </div>
            );
          })}
        </div>
      );
    }
    return emptyArray;
  };

  reset = () => {
    (this.state.cards = this.createDeck()),
      (this.state.shownCardIndex = 0),
      (this.state.topRows = [[], [], [], []]),
      (this.state.playRows = [[], [], [], [], [], [], []]),
      (this.state.movingArray = []),
      (this.state.cardRows = []),
      (this.state.selectedCard = []);

    this.setState({
      cards: this.state.cards,
      shownCardIndex: this.state.shownCardIndex,
      topRows: this.state.topRows,
      playRows: this.state.playRows,
      movingArray: this.state.movingArray,
      cardRows: this.state.cardRows,
      selectedCard: this.state.selectedCard
    });

    this.mus();
    this.setFirstCard();
    this.getTopSection();
    this.getPlayerRow();
  };

  getTopSection = () => {
    return (
      <div className="top-section">
        <div className="card-deck">
          <div className="blank-card" onClick={this.showNextCard} />
          {this.state.cards[this.state.shownCardIndex] && (
            <div
              className={
                this.state.cards[this.state.shownCardIndex].color === "red"
                  ? "shown-card red"
                  : "shown-card black"
              }
              styles={
                this.state.cards[this.state.shownCardIndex].selected === true
                  ? "selected-card"
                  : ""
              }
              onClick={() => {
                this.moveCards(
                  this.state.cards[this.state.shownCardIndex],
                  false
                );
              }}
              onDoubleClick={() => {
                this.placeCards();
              }}
            >
              {this.showFirstCard}
              {this.state.cards[this.state.shownCardIndex].suit}
              {this.state.cards[this.state.shownCardIndex].displayRank}
            </div>
          )}
        </div>
        <div className="boxes">{this.getPlayerRowTop()}</div>
      </div>
    );
  };

  endGame = () => {
    let a = this.state.playRows;
    if (
      a[0].length === 0 &&
      a[1].length === 0 &&
      a[2].length === 0 &&
      a[3].length === 0 &&
      a[4].length === 0 &&
      a[5].length === 0 &&
      a[6].length === 0
    ) {
      return true;
    }
    return false;
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
            Well Done!! you have completed this round.
          </div>
        )}
      </div>
    );
  }
}

export default Cards;
