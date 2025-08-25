"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart"

interface PieChartComponentProps {
  title: string
  description: string
  data: { browser: string; total: number }[]
}



export function PieChartLabel({ title, description, data }: PieChartComponentProps) {

  const chartConfig: ChartConfig = {};

// Atualiza `data` e preenche `chartConfig`
  data = data.map((item, index) => {
    // Adiciona ao chartConfig
    chartConfig[item.browser] = {
      label: item.browser,
      color: `hsl(var(--chart-${index + 1}))`, // Cor dinâmica baseada no índice
    };

    // Retorna o item atualizado com `fill`
    return {
      ...item,
      fill: `var(--color-${item.browser})`, // Adiciona a chave `fill` com valor dinâmico
    };
  });

  const total = React.useMemo(
      () => data.reduce((acc, curr) => acc + curr['total'], 0),
      [data, 'total']
  )

  return (
    <Card className="flex w-full flex-col">
      <CardHeader className="items-start pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey={'total'}
              nameKey={'browser'}
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Escolas
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* Legenda das cores */}
        <div className="flex flex-wrap gap-4">
          {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
        <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: `hsl(var(--chart-${index + 1}))` }}
        />
                <span className="text-muted-foreground">{chartConfig[item.browser].label}</span>
              </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}