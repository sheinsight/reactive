import { describe, it, expect } from "vitest";

import {
  isObject,
  canProxy,
  createObjectFromPrototype,
  SNAPSHOT,
  LISTENERS,
  REACTIVE,
} from "./internal-utils.js";

describe("Object Utils", () => {
  describe("isObject", () => {
    it("should return true for object", () => {
      expect(isObject({})).toBe(true);
    });

    it("should return false for null", () => {
      expect(isObject(null)).toBe(false);
    });

    it("should return false for undefined", () => {
      expect(isObject(undefined)).toBe(false);
    });

    it("should return false for string", () => {
      expect(isObject("a string")).toBe(false);
    });

    it("should return false for number", () => {
      expect(isObject(100)).toBe(false);
    });
  });

  describe("canProxy", () => {
    it("should return true for plain object", () => {
      expect(canProxy({})).toBe(true);
    });

    it("should return true for array", () => {
      expect(canProxy([])).toBe(true);
    });

    it("should return false for symbol", () => {
      expect(canProxy(Symbol.iterator)).toBe(false);
    });

    it("should return false for object with Symbol.iterator defined", () => {
      expect(canProxy({ [Symbol.iterator]: () => {} })).toBe(false);
    });

    it("should return false for instance of WeakMap, WeakSet, Error, Number, Date, String, RegExp, ArrayBuffer", () => {
      expect(canProxy(new WeakMap())).toBe(false);
      expect(canProxy(new WeakSet())).toBe(false);
      expect(canProxy(new Error())).toBe(false);
      expect(canProxy(new Number())).toBe(false);
      expect(canProxy(new Date())).toBe(false);
      expect(canProxy(new String())).toBe(false);
      expect(canProxy(new RegExp(""))).toBe(false);
      expect(canProxy(new ArrayBuffer(2))).toBe(false);
    });
  });

  describe("createObjectFromPrototype", () => {
    it("should create new array for array prototype", () => {
      const newArray = createObjectFromPrototype([1, 2, 3]);
      expect(Array.isArray(newArray)).toBe(true);
    });

    it("should create new object for object prototype", () => {
      const newObject = createObjectFromPrototype({});
      expect(typeof newObject).toBe("object");
    });
  });

  describe("Symbols: SNAPSHOT, LISTENERS, REACTIVE", () => {
    it("should be defined", () => {
      expect(SNAPSHOT).toBeDefined();
      expect(LISTENERS).toBeDefined();
      expect(REACTIVE).toBeDefined();
    });
  });
});
