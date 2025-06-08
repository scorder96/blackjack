import { Link } from "@remix-run/react";

export default function Tutorial() {
  return (
    <>
      <nav className="p-4 px-8 flex items-end justify-between">
        <Link to={"/"}>
          <div className="flex items-center">
            <img src="/favicon.ico" alt="" className="h-8" />
            <h1 className="text-2xl font-bold ms-2">Blackjack</h1>
          </div>
        </Link>
        <Link to={"/tutorial"}>How to Play</Link>
      </nav>
      <article className="m-16">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          How to Play Blackjack
        </h1>
        <br />
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Objective:</h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          The goal of Blackjack is to get a hand total as close to 21 as possible without
          going over. You play against the dealer—whoever has the higher hand without
          exceeding 21 wins!
        </p>
        <br />
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Card Values:
        </h3>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Number cards (2-10) are worth their face value.</li>
          <li>Face cards (J, Q, K) are worth 10 points.</li>
          <li>
            Aces (A) can be worth 1 or 11 points, depending on what benefits your hand.
          </li>
        </ul>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Game Flow:</h3>
        <ul className="my-6 ml-6 list-decimal [&>li]:mt-2">
          <li>
            <b>Start the Game</b> - Click "New Game" to receive two cards. The dealer also
            gets one card.
          </li>
          <li>
            <b>Hit</b> - Click "Hit" to draw another card if you want to get closer to 21.
          </li>
          <li>
            <b>Stand</b> - Click "Stand" if you're satisfied with your hand. The dealer
            will then play.
          </li>
        </ul>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Winning the Game:
        </h3>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>If your total exceeds 21, you bust and lose.</li>
          <li>If the dealer’s total exceeds 21, they bust, and you win.</li>
          <li>If your total is higher than the dealer’s without busting, you win!</li>
          <li>If both you and the dealer have the same total, it’s a tie.</li>
        </ul>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Try your luck and see if you can beat the dealer! 🎰♠️
        </p>
      </article>
    </>
  );
}
