import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Blackjack" },
    { name: "description", content: "The simple, free, open source Blackjack game." },
  ];
};

import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";
import { Hand, RefreshCcw, SquarePlus } from "lucide-react";
import { Link } from "@remix-run/react";
import Realistic from "react-canvas-confetti/dist/presets/realistic";

const suits = ["♠", "♣", "♥", "♦"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

const getDeck = () => {
  return suits.flatMap((suit) => values.map((value) => ({ suit, value })));
};

const getCardValue = (card: { value: string }) => {
  if (["J", "Q", "K"].includes(card.value)) return 10;
  if (card.value === "A") return 11;
  return parseInt(card.value);
};

const calculateHand = (hand: { value: string }[]) => {
  let sum = 0;
  let aces = 0;

  hand.forEach((card) => {
    sum += getCardValue(card);
    if (card.value === "A") aces++;
  });

  while (sum > 21 && aces > 0) {
    sum -= 10;
    aces--;
  }

  return sum;
};

const Card = ({ value, suit }: { value: string; suit: string }) => (
  <motion.div
    className="w-12 h-16 border border-gray-800 bg-white flex flex-col justify-center items-center rounded-lg shadow-md"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <span className="text-xl font-bold">{value}</span>
    <span className="text-lg">{suit}</span>
  </motion.div>
);

export default function Blackjack() {
  useEffect(() => {
    startGame();
  }, []);
  const [deck, setDeck] = useState(getDeck());
  const [playerHand, setPlayerHand] = useState<{ suit: string; value: string }[]>([]);
  const [dealerHand, setDealerHand] = useState<{ suit: string; value: string }[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [Trigger, setTrigger] = useState(false);

  const drawCard = (currentDeck: typeof deck) => {
    const newDeck = [...currentDeck];
    const randomIndex = Math.floor(Math.random() * newDeck.length);
    const card = newDeck.splice(randomIndex, 1)[0];
    setDeck(newDeck);
    return card;
  };

  const startGame = () => {
    setTrigger(false);
    const newDeck = getDeck();
    setDeck(newDeck);
    setPlayerHand([drawCard(newDeck), drawCard(newDeck)]);
    setDealerHand([drawCard(newDeck)]);
    setGameOver(false);
    setMessage("");
  };

  const hit = () => {
    if (gameOver) return;
    const card = drawCard(deck);
    const newHand = [...playerHand, card];
    setPlayerHand(newHand);
    if (calculateHand(newHand) > 21) {
      setGameOver(true);
      setMessage("Bust! You lose.");
    }
  };

  const stand = () => {
    if (gameOver) return;
    let newDealerHand = [...dealerHand];
    while (calculateHand(newDealerHand) < 17) {
      newDealerHand.push(drawCard(deck));
    }
    setDealerHand(newDealerHand);

    const playerScore = calculateHand(playerHand);
    const dealerScore = calculateHand(newDealerHand);
    if (dealerScore > 21 || playerScore > dealerScore) {
      setMessage("You win!");
      setTrigger(true);
    } else if (playerScore < dealerScore) {
      setMessage("Dealer wins.");
    } else {
      setMessage("It's a tie!");
    }
    setGameOver(true);
  };
  return (
    <div className="flex flex-col h-dvh">
      <nav className="p-4 px-8 flex items-end justify-between">
        <Link to={"/"}>
          <div className="flex items-center">
            <img src="/favicon.ico" alt="" className="h-8" />
            <h1 className="text-2xl font-bold ms-2">Blackjack</h1>
          </div>
        </Link>
        <Link to={"/tutorial"}>How to Play</Link>
      </nav>
      {Trigger && <Realistic autorun={{ speed: 1, duration: 1, delay: 0 }} />}
      <div className="p-4 flex flex-col items-center justify-center grow">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Dealer's Hand</h2>
          <div className="flex gap-2">
            {dealerHand.map((card, index) => (
              <Card key={index} value={card.value} suit={card.suit} />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Your Hand</h2>
          <div className="flex gap-2">
            {playerHand.map((card, index) => (
              <Card key={index} value={card.value} suit={card.suit} />
            ))}
          </div>
        </div>
        <p className="text-lg font-bold">{message}</p>
        <div className="flex gap-2 mt-4">
          <Button variant={"secondary"} onClick={startGame}>
            <RefreshCcw /> New Game
          </Button>
          <Button onClick={hit} disabled={gameOver}>
            <SquarePlus /> Hit
          </Button>
          <Button onClick={stand} disabled={gameOver}>
            <Hand /> Stand
          </Button>
        </div>
      </div>
    </div>
  );
}
