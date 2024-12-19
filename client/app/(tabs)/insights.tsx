import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useTransactions } from "@/hooks/useTransactions";
import LoadingScreen from "@/components/LoadingScreen";

export default function Insights() {
  const { data: transactions, isLoading } = useTransactions();

  if (isLoading) {
    return <LoadingScreen />;
  }

  const incomeTotal =
    transactions
      ?.filter((tx) => tx.type === "Income")
      .reduce((sum, tx) => sum + tx.amount, 0) ?? 0;

  const expenseTotal =
    transactions
      ?.filter((tx) => tx.type === "Expense")
      .reduce((sum, tx) => sum + tx.amount, 0) ?? 0;

  const total = incomeTotal + expenseTotal;

  const incomePercentage = total ? (incomeTotal / total) * 100 : 0;
  const expensePercentage = total ? (expenseTotal / total) * 100 : 0;

  const maxCategory =
    incomePercentage >= expensePercentage ? "Income" : "Expense";

  const pieData = [
    {
      value: incomePercentage,
      color: "#93FCF8",
      gradientCenterColor: "#3BE9DE",
    },
    {
      value: expensePercentage,
      color: "#FFA5BA",
      gradientCenterColor: "#FF7F97",
    },
  ];

  const renderDot = (color: string) => (
    <View
      style={{
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: color,
        marginRight: 10,
      }}
    />
  );

  const renderLegendComponent = () => (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: 120,
          marginRight: 20,
        }}
      >
        {renderDot("#3BE9DE")}
        <Text style={{ color: "white" }}>
          Income: {incomePercentage.toFixed(1)}%
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", width: 120 }}>
        {renderDot("#FF7F97")}
        <Text style={{ color: "white" }}>
          Expense: {expensePercentage.toFixed(1)}%
        </Text>
      </View>
    </View>
  );

  return (
    <View
      style={{
        paddingVertical: 100,
        flex: 1,
      }}
    >
      <View
        style={{
          margin: 20,
          padding: 16,
          borderRadius: 20,
          backgroundColor: "#232B5D",
        }}
      >
        <View style={{ padding: 20, alignItems: "center" }}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={"#232B5D"}
            centerLabelComponent={() => (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 22, color: "white", fontWeight: "bold" }}
                >
                  {incomePercentage >= expensePercentage
                    ? `${incomePercentage.toFixed(0)}%`
                    : `${expensePercentage.toFixed(0)}%`}
                </Text>
                <Text style={{ fontSize: 14, color: "white" }}>
                  {maxCategory}
                </Text>
              </View>
            )}
          />
        </View>
        {renderLegendComponent()}
      </View>
    </View>
  );
}
