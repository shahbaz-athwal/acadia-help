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
const chartData = [
  { level: "Awesome", reviews: 243, fill: "var(--color-awesome)" },
  { level: "Good", reviews: 186, fill: "var(--color-good)" },
  { level: "OK", reviews: 237, fill: "var(--color-ok)" },
  { level: "Bad", reviews: 73, fill: "var(--color-bad)" },
  { level: "Awful", reviews: 209, fill: "var(--color-awful)" },
];

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

export function ReviewChart() {
  return (
    <Card className="w-fit mt-12 mx-auto">
      <CardHeader>
        <CardTitle>Rating Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-[500px]" config={chartConfig}>
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
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="reviews"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
