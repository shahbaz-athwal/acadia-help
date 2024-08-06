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

const chartConfig = {
  reviews: {
    label: "Reviews",
  },
  awesome: {
    label: "Awesome",
    color: "rgb(9,134,55)",
  },
  good: {
    label: "Good",
    color: "rgb(38,98,217)",
  },
  ok: {
    label: "OK",
    color: "rgb(232,140,48)",
  },
  bad: {
    label: "Bad",
    color: "rgb(232,100,150)",
  },
  awful: {
    label: "Awful",
    color: "rgb(226,29,72)",
  },
} satisfies ChartConfig;

export function ReviewChart({
  ratingCount,
}: {
  ratingCount: Record<number, number>;
}) {
  const chartData = [
    { level: "Awesome", reviews: ratingCount[5], fill: "var(--color-awesome)" },
    { level: "Good", reviews: ratingCount[4], fill: "var(--color-good)" },
    { level: "OK", reviews: ratingCount[3], fill: "var(--color-ok)" },
    { level: "Bad", reviews: ratingCount[2], fill: "var(--color-bad)" },
    { level: "Awful", reviews: ratingCount[1], fill: "var(--color-awful)" },
  ];

  return (
    <Card className="w-fit max-w-full mt-12 mx-auto">
      <CardHeader>
        <CardTitle>Rating Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-[400px] sm:w-[500px]" config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
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
