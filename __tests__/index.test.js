import React from "react";
import { render, screen } from "@testing-library/react";
import Hero from "../components/Hero";
import Brands from "../components/Brands";

describe("Hero Component", () => {
  test("renders title and button", () => {
    render(<Hero />);

    const title = screen.getByText(/Welcome to next\.js!/i);
    const button = screen.getByText(/Get all there/i);

    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("renders additional fee message", () => {
    render(<Hero />);

    const feeMessage = screen.getByText(
      /Get Premier Access to Raya and the Last Dragon for an additional fee/i
    );

    expect(feeMessage).toBeInTheDocument();
  });
});

describe("Brands Component", () => {
  test("renders all brand images", () => {
    render(<Brands />);

    const brandImages = screen.getAllByRole("img", {
      name: /disney|pixar|marvel|starwars|national/i,
    });

    expect(brandImages).toHaveLength(5);
  });
});
