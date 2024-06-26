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

  test("resize", ({ expect }) => {
    render(<MouseTrail />);
    window.innerWidth = 100;
    window.innerHeight = 100;
    act(() => fireEvent(window, new Event("resize")));
    expect(screen.getByTestId("mouse-trail")).not.toBeNull();
  });
});
