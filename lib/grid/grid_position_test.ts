import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import type { Direction } from "./direction.ts";
import { Grid } from "./grid.ts";
import { DirectedGridPosition, GridPosition } from "./grid_position.ts";

const grid = Grid.fromStrings([
  "#####",
  "#...#",
  "#...#",
  "#####",
]);

function pos(x: number, y: number) {
  return new GridPosition(grid, x, y);
}

function dirPos(x: number, y: number, direction: Direction) {
  return new DirectedGridPosition(grid, x, y, direction);
}

describe("GridPosition", () => {
  it("method constructor", () => {
    expect(pos(1, 1).value).toBe(".");
    expect(() => pos(8, 8)).toThrow();
  });

  it("method move", () => {
    expect(pos(1, 1).move("up")?.position).toEqual([1, 0]);
    expect(pos(1, 1).move("down")?.position).toEqual([1, 2]);
    expect(pos(1, 1).move("left")?.position).toEqual([0, 1]);
    expect(pos(1, 1).move("right")?.position).toEqual([2, 1]);
    expect(pos(1, 1).move("up-left")?.position).toEqual([0, 0]);
    expect(pos(1, 1).move("up-right")?.position).toEqual([2, 0]);
    expect(pos(1, 1).move("down-left")?.position).toEqual([0, 2]);
    expect(pos(1, 1).move("down-right")?.position).toEqual([2, 2]);
    expect(pos(1, 1).move("up", 2)).toBeNull();
  });

  it("method moveUntil", () => {
    const path = [...pos(0, 1).moveUntil("right", (p) => p.value === "#")];
    expect(path).toHaveLength(3);
    expect(path[0].position).toEqual([1, 1]);
    expect(path[2].position).toEqual([3, 1]);
  });
});

describe("DirectedGridPosition", () => {
  it("method constructor", () => {
    expect(dirPos(1, 1, "right").value).toBe(".");
    expect(() => dirPos(8, 8, "up")).toThrow();
  });

  it("method moveInDirection", () => {
    expect(dirPos(1, 1, "up").moveInDirection()?.position).toEqual([1, 0]);
    expect(dirPos(1, 1, "down").moveInDirection()?.position).toEqual([1, 2]);
    expect(dirPos(1, 1, "left").moveInDirection()?.position).toEqual([0, 1]);
    expect(dirPos(1, 1, "right").moveInDirection()?.position).toEqual([2, 1]);
  });

  it("method moveInDirectionUntil", () => {
    const path = [
      ...dirPos(0, 0, "down-right").moveInDirectionUntil((p) =>
        p.value === "#"
      ),
    ];
    expect(path).toHaveLength(2);
    expect(path[0].position).toEqual([1, 1]);
    expect(path[1].position).toEqual([2, 2]);
  });

  it("method turn", () => {
    expect(dirPos(1, 1, "up").turn(45).direction).toBe("up-right");
  });

  it("method turnLeft", () => {
    expect(dirPos(1, 1, "up-left").turnLeft().direction).toBe("down-left");
  });

  it("method turnRight", () => {
    expect(dirPos(1, 1, "up-left").turnRight().direction).toBe("up-right");
  });
});
