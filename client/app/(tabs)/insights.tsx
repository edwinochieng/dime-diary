import React, { useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function Insights() {
  const [filter, setFilter] = useState("Today");

  // Example data, replace with actual data
  const incomeExpenseData = [
    { name: "Income", amount: 5000, color: "#6FCF97" },
    { name: "Expenses", amount: 3000, color: "#EB5757" },
  ];

  const expenseCategoriesData = [
    { name: "Food", amount: 1200, color: "#FFB6C1" },
    { name: "Rent", amount: 800, color: "#FF7F50" },
    { name: "Entertainment", amount: 400, color: "#FF6347" },
  ];

  const incomeCategoriesData = [
    { name: "Salary", amount: 4000, color: "#87CEFA" },
    { name: "Freelance", amount: 1000, color: "#4682B4" },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {/* Filter */}
      <View className="flex-row justify-center mb-4">
        {["Today", "This Week", "This Month", "This Year"].map((period) => (
          <Button
            key={period}
            title={period}
            onPress={() => setFilter(period)}
            color={filter === period ? "#007AFF" : "#D3D3D3"}
          />
        ))}
      </View>

      {/* Income vs Expenses Pie Chart */}
      <View className="mb-6">
        <Text className="text-xl font-bold text-center mb-2">
          Income vs Expenses
        </Text>
        <PieChart
          data={incomeExpenseData.map((item) => ({
            name: item.name,
            population: item.amount,
            color: item.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          }))}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            color: () => `#FFFFFF`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Expense Categories Bar Chart */}
      <View className="mb-6">
        <Text className="text-xl font-bold text-center mb-2">
          Expense Categories
        </Text>
        <BarChart
          data={{
            labels: expenseCategoriesData.map((item) => item.name),
            datasets: [
              {
                data: expenseCategoriesData.map((item) => item.amount),
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundGradientFrom: "#FFF",
            backgroundGradientTo: "#FFF",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(233, 30, 99, ${opacity})`,
          }}
          verticalLabelRotation={30}
        />
      </View>

      {/* Income Categories Bar Chart */}
      <View className="mb-6">
        <Text className="text-xl font-bold text-center mb-2">
          Income Categories
        </Text>
        <BarChart
          data={{
            labels: incomeCategoriesData.map((item) => item.name),
            datasets: [
              {
                data: incomeCategoriesData.map((item) => item.amount),
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundGradientFrom: "#FFF",
            backgroundGradientTo: "#FFF",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          }}
          verticalLabelRotation={30}
        />
      </View>
    </ScrollView>
  );
}
