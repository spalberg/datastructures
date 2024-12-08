export class Vec {
  #x: number;
  #y: number;

  constructor(x: number, y: number) {
    this.#x = x;
    this.#y = y;
  }

  static of([x, y]: [number, number]): Vec {
    return new Vec(x, y);
  }

  get x(): number {
    return this.#x;
  }

  get y(): number {
    return this.#y;
  }

  add(other: Vec): Vec {
    return new Vec(this.#x + other.#x, this.#y + other.#y);
  }

  sub(other: Vec): Vec {
    return new Vec(this.#x - other.#x, this.#y - other.#y);
  }

  mul(scalar: number): Vec {
    return new Vec(this.#x * scalar, this.#y * scalar);
  }

  div(scalar: number): Vec {
    return new Vec(this.#x / scalar, this.#y / scalar);
  }

  equals(other: Vec): boolean {
    return this.#x === other.#x && this.#y === other.#y;
  }

  toString(): string {
    return `(${this.#x}, ${this.#y})`;
  }
}
