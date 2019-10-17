export class MotherShip {
  constructor (
    id
  ) {
    this.id = `M${id}`;
    this.type = "MotherShip";
    this._hitPoints = 100;
    this.damagePerHit = 9;
  };

  get isActive() {
    return this._hitPoints > 0;
  };

  get hitPoints() {
    return this._hitPoints;
  }

  isHit() {
    if (this._hitPoints < this.damagePerHit) {
      this._hitPoints = 0;
    } else {
      this._hitPoints -= this.damagePerHit;
    }
  };

  render() {
    return `<p id="${this.id}" class="${this.type}">${this._hitPoints}</p>`;
  }
}

export class DefenceShip extends MotherShip {
  constructor (
    id
  ) {
    super();
    this.id = `D${id}`;
    this.type = "DefenceShip";
    this._hitPoints = 80;
    this.damagePerHit = 10;
  };
}

export class AttackShip extends MotherShip {
  constructor (
    id
  ) {
    super();
    this.id = `A${id}`;
    this.type = "AttackShip";
    this._hitPoints = 45;
    this.damagePerHit = 12;
  };
}