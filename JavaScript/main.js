import { MotherShip, DefenceShip, AttackShip } from "./Ship.js";

export const generateShips = (defenceShips, attackShips) => {
  let ships = [new MotherShip (0)];
  for (let index = 0; index < defenceShips; index++) {
    ships.push(new DefenceShip (index))
  };
  for (let index = 0; index < attackShips; index++) {
    ships.push(new AttackShip (index))
  }
  return ships;
}

export const generateShipHtml = ships => {
  let html = '';
  ships.forEach(ship => {
    html += ship.render()
  });
  document.getElementById('game-container').innerHTML = html;
}

export const attackShip = ships => {
  let hitShip = ships[Math.floor(Math.random()*ships.length)];
  hitShip.isHit();
  if (!hitShip.isActive) {
    if (hitShip.id === "M0") ships = [];
    ships = ships.filter(ship => ship !== hitShip)
  }
  return ships;
}

const defenceShips = 5;
const attackShips = 8;
let ships = generateShips(defenceShips,attackShips);
let fireButton = document.getElementById('btn-game');

generateShipHtml(ships);

document.getElementById('btn-game').addEventListener('click', () => {
  ships = attackShip(ships);
  fireButton.disabled = ships.length === 0;
  generateShipHtml(ships);
  if (fireButton.disabled) {
    alert('You won!');
  }
});

document.getElementById('btn-reset').addEventListener('click', () => {
  ships = generateShips(defenceShips,attackShips);
  generateShipHtml(ships);
  fireButton.disabled = false;
});