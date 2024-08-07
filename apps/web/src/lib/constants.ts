export const grades = [
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D+",
  "D",
  "D-",
  "F",
  "No Grade",
  "Drop/Withdraw",
  "Incomplete",
  "Pass",
  "Fail",
  "Prefer not to say",
];

export const chartLabels = (type: "quality" | "difficulty") => {
  if (type === "quality") {
    return ["Awesome", "Good", "OK", "Bad", "Awful"];
  } else {
    return ["Very Easy", "Easy", "Moderate", "Hard", "Very Hard"];
  }
};
