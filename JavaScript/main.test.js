import {MotherShip, DefenceShip, AttackShip} from "./Ship.js"
import {generateShips, generateShipHtml, attackShip} from "./main.js"
import ships from "./shipData.js"

describe("Test Mother Ship class", () => {
  let ship = new MotherShip (
    ships[0].id
  );
  test("check Id", () => {
    expect(ship.id).toBe('M0');
  });
  test("check is active", () => {
    expect(ship.isActive).toBe(true);
  });
  test("ship hit points", () => {
    expect(ship._hitPoints).toBe(100);
  });
  test("ship hit points after hit", () => {
    ship.isHit();
    expect(ship._hitPoints).toBe(91);
  });
  test("ship html", () => {
    expect(ship.render()).toBe(`<p id="${ship.id}" class="${ship.type}">${ship.hitPoints}</p>`);
  });
})

describe("Test Defence Ship class", () => {
  let ship = new DefenceShip (
    ships[1].id
  );
  test("check Id", () => {
    expect(ship.id).toBe('D0');
  });
  test("check is active", () => {
    expect(ship.isActive).toBe(true);
  });
  test("ship hit points", () => {
    expect(ship._hitPoints).toBe(80);
  });
  test("ship hit points after hit", () => {
    ship.isHit();
    expect(ship._hitPoints).toBe(70);
  });
  test("ship html", () => {
    expect(ship.render()).toBe(`<p id="${ship.id}" class="${ship.type}">${ship.hitPoints}</p>`);
  });
})

describe("Test Attack Ship class", () => {
  let ship = new AttackShip (
    ships[2].id
  );
  test("check Id", () => {
    expect(ship.id).toBe('A0');
  });
  test("check is active", () => {
    expect(ship.isActive).toBe(true);
  });
  test("ship hit points", () => {
    expect(ship._hitPoints).toBe(45);
  });
  test("ship hit points after hit", () => {
    ship.isHit();
    expect(ship._hitPoints).toBe(33);
  });
  test("ship html", () => {
    expect(ship.render()).toBe(`<p id="${ship.id}" class="${ship.type}">${ship.hitPoints}</p>`);
  });
})

describe("Test game set up", () => {
  test("check js array", () => {
    expect(generateShips(2,2)[0].id).toBe("M0");
    expect(generateShips(2,2)[2].id).toBe("D1");
    expect(generateShips(2,2)[4].id).toBe("A1");
  });
})

describe("Test html generator", () => {
  test("Create HTML", () => {
    document.body.innerHTML = '<main id = "game-container"></main>';
    generateShipHtml(generateShips(2,2));

    expect(document.getElementById('M0').innerHTML).toBe("100");
    expect(document.getElementById('D1').innerHTML).toBe("80");
    expect(document.getElementById('A0').innerHTML).toBe("45");
  })

  // To be worked on
  /* test("Create Divs", () => {
    document.body.innerHTML = '<main id = "game-container"></main>';
    generateShipHtml(generateShips(2,2));

    expect(document.getElementById('mother-ship')).toContain("M0");
    expect(document.getElementById('defence-ship')).toContain("D0");
    expect(document.getElementById('attack-ship')).toContain("A0");
  }) */
})

describe("Test attack ship", () => {
  test("select ship", () => {
    let mockMath = Object.create(global.Math);
    mockMath.random = function() {
      return 0.8;
    };
    global.Math = mockMath;
    expect(attackShip(generateShips(2,2))[4].id).toBe("A1");
  });

  test("attack ship", () => {
    let mockMath = Object.create(global.Math);
    mockMath.random = function() {
      return 0.4;
    };
    global.Math = mockMath;
    expect(attackShip(generateShips(2,2))[2].id).toBe("D1");
    expect(attackShip(generateShips(2,2))[2].hitPoints).toBe(70);
  });

  test("destroy ship", () => {
    let mockMath = Object.create(global.Math);
    mockMath.random = function() {
      return 0.9;
    };
    global.Math = mockMath;

    let ships = generateShips(2,2);
    ships[4]._hitPoints = 8;
    let shipsLeft = attackShip(ships)
    expect(shipsLeft.length).toBe(4);
  });

  test("destroy mother ship", () => {
    let mockMath = Object.create(global.Math);
    mockMath.random = function() {
      return 0.1;
    };
    global.Math = mockMath;
  
    let ships = generateShips(2,2);
    ships[0]._hitPoints = 2;
    let shipsLeft = attackShip(ships);
    expect(shipsLeft.length).toBe(0);
  });
})