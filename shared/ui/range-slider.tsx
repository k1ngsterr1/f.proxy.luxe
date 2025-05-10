"use client";

import type { ChangeEvent } from "react";
import { Plus, Minus } from "lucide-react";
import "../styles/range-slider.css";

interface IPureRangeSlider {
  value: number;
  ref: any;
  max: number;
  min?: number;
  setValue: (value: number) => void;
}

export function PureRangeSlider({
  value,
  ref,
  max,
  min = 1,
  setValue,
}: IPureRangeSlider) {
  // The yellow color from the image
  const yellowColor = "#F2D76B";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseFloat(e.target.value);
    setValue(newValue);
  };

  const handleIncrement = () => {
    if (value < max) {
      setValue(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      setValue(value - 1);
    }
  };

  // Container style
  const containerStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
  };

  // Button styles matching the image
  const buttonStyle = (isDisabled: boolean) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: "64px",
    backgroundColor: yellowColor,
    color: "#000000",
    border: "none",
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.5 : 1,
    padding: 0,
  });

  // Value display style
  const valueDisplayStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: yellowColor,
    color: "#000000",
    fontWeight: 600,
    width: "32px",
    height: "32px",
  };

  // Slider container style
  const sliderContainerStyle = {
    flex: 1,
    margin: "0 8px",
  };

  return (
    <div style={containerStyle}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        style={buttonStyle(value <= min)}
        aria-label="Decrease value"
      >
        <Minus style={{ width: "16px", height: "16px", strokeWidth: 2 }} />
      </button>

      <div style={sliderContainerStyle}>
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={1}
          value={value}
          onChange={handleChange}
          className="pure-range-slider"
          style={{ width: "100%" }}
        />
      </div>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        style={buttonStyle(value >= max)}
        aria-label="Increase value"
      >
        <Plus style={{ width: "16px", height: "16px", strokeWidth: 2 }} />
      </button>
    </div>
  );
}
