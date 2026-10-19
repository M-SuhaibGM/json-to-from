"use client";
import { useEffect, useState } from "react";
import type { FormField } from "../types";

export function NumberField({
  field, value, onChange,
}: {
  field: FormField;
  value: any;
  onChange: (v: any) => void;
}) {
  const min = field.min ?? 0;
  const max = field.max ?? 100;
  const step = field.step ?? 1;

  // 1. Keep a local string state so users can type "-", ".", "5." without
  //    the input resetting mid-type
  const [inputText, setInputText] = useState<string>(
    value === "" || value == null ? "" : String(value)
  );

  // 2. Sync when parent changes the value externally (e.g., reset form)
  useEffect(() => {
    setInputText(value === "" || value == null ? "" : String(value));
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputText(raw); // Allow typing freely

    // Only commit to parent when it's a valid number
    if (raw === "") {
      onChange("");
    } else if (!isNaN(Number(raw))) {
      onChange(Number(raw));
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = Number(e.target.value);
    setInputText(String(n));
    onChange(n);
  };

  // Clamp displayed value so the slider is always within range
  const sliderValue =
    typeof value === "number" && !isNaN(value)
      ? Math.min(Math.max(value, min), max)
      : min;

  return (
    <div className="d-flex align-items-center gap-2">
      {field.slider && (
        <input
          type="range"
          className="form-range flex-grow-1"
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          onChange={handleSliderChange}
        />
      )}
      <input
        className="form-control"
        style={{ maxWidth: field.slider ? "100px" : "100%" }}
        type="number"
        min={min}
        max={max}
        step={step}
        value={inputText}
        onChange={handleTextChange}
      />
    </div>
  );
}