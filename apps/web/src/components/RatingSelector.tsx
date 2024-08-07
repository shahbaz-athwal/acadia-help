import clsx from "clsx";
import React, { useState } from "react";
import { useController, Control } from "react-hook-form";

interface QualitySelectorProps {
  name: "difficulty" | "quality";
  control: Control<any>;
}

const Colors = [
  "bg-green-500",
  "bg-green-300",
  "bg-yellow-300",
  "bg-orange-400",
  "bg-red-500",
];

const difficultyLabels = ["Very Easy", "Easy", "Medium", "Hard", "Very Hard"];
const qualityLabels = ["Awful", "Bad", "OK", "Good", "Awesome"];

const reverseColors = [...Colors].reverse();

const RatingSelector: React.FC<QualitySelectorProps> = ({ name, control }) => {
  const { field } = useController({ name, control });
  const [selectedValue, setSelectedValue] = useState<number>(field.value || 0);
  const [hoveredValue, setHoveredValue] = useState<number>(0);

  const handleClick = (value: number) => {
    setSelectedValue(value);
    field.onChange(value);
  };

  const displayValue = hoveredValue || selectedValue;

  const labels = name === "difficulty" ? difficultyLabels : qualityLabels;
  const colors = name === "difficulty" ? Colors : reverseColors;

  const getColorClass = (value: number) =>
    value <= displayValue
      ? `${colors[value - 1]} bg-opacity-60`
      : "bg-zinc-800";

  return (
    <div className="flex flex-col p-6 items-center w-full">
      <div className="relative flex max-w-[400px] w-full">
        {[1, 2, 3, 4, 5].map((value) => (
          <div
            key={value}
            className={clsx(
              "flex-1 h-12 cursor-pointer transition-colors duration-200",
              getColorClass(value),
              {
                "rounded-l-full": value === 1,
                "rounded-r-full": value === 5,
                "opacity-100": value <= displayValue,
              }
            )}
            onClick={() => handleClick(value)}
            onMouseEnter={() => setHoveredValue(value)}
            onMouseLeave={() => setHoveredValue(0)}
          />
        ))}
        {displayValue > 0 && (
          <div className="absolute -top-4 -translate-y-1/2 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-gray-500">
              {displayValue} - {labels[displayValue - 1]}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingSelector;
