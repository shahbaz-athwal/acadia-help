"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartLabels } from "@/lib/constants";

export function ReviewChart({
  ratingCount,
  type,
}: {
  ratingCount: Record<number, number>;
  type: "quality" | "difficulty";
}) {
  const labels = chartLabels(type);
  const chartConfig = {
    reviews: {
      label: "Reviews",
    },
    awesome: {
      label: labels[0],
      color: "rgb(9,134,55)",
    },
    good: {
      label: labels[1],
      color: "rgb(38,98,217)",
    },
    ok: {
      label: labels[2],
      color: "rgb(232,140,48)",
    },
    bad: {
      label: labels[3],
      color: "rgb(232,100,150)",
    },
    awful: {
      label: labels[4],
      color: "rgb(226,29,72)",
    },
  } satisfies ChartConfig;

  const chartData = [
    { level: labels[0], reviews: ratingCount[5], fill: "var(--color-awesome)" },
    { level: labels[1], reviews: ratingCount[4], fill: "var(--color-good)" },
    { level: labels[2], reviews: ratingCount[3], fill: "var(--color-ok)" },
    { level: labels[3], reviews: ratingCount[2], fill: "var(--color-bad)" },
    { level: labels[4], reviews: ratingCount[1], fill: "var(--color-awful)" },
  ];

  return (
    <Card className="w-fit max-w-full mt-12 mx-auto">
      <CardHeader>
        <CardTitle>{type === "difficulty"? "Difficulty" : "Quality"}  Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-[400px] sm:w-[500px]" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} layout="vertical">
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="level"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="reviews" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="reviews"
              layout="vertical"
              fill="var(--color-reviews)"
              radius={4}
            >
              <LabelList
                dataKey="level"
                position="insideLeft"
                offset={8}
                className="fill-white"
                fontSize={14}
              />
              <LabelList
                dataKey="reviews"
                position="insideRight"
                offset={8}
                className="fill-foreground"
                fontSize={14}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
