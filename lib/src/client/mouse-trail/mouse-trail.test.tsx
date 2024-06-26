import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { MouseTrail } from "./mouse-trail";

describe("mouse-trail", () => {
  afterEach(cleanup);

  test("Test if renders without errors and props work", ({ expect }) => {
    const clx = "my-class";
    render(<MouseTrail className={clx} />);
    expect(screen.getByTestId("mouse-trail").classList).toContain(clx);
  });

  test("mouseMove works", () => {
    render(<MouseTrail />);
    const el = screen.getByTestId("mouse-trail");
    act(() => {
      fireEvent.mouseMove(el, { clientX: 100, clientY: 100 });
    });
  });
});
