import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";

export default function Insights() {
  const pieData = [
    { value: 40, color: "#93FCF8", gradientCenterColor: "#3BE9DE" },

    { value: 60, color: "#FFA5BA", gradientCenterColor: "#FF7F97" },
  ];

  const renderDot = (color: any) => {
    return (
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
  };

  const renderLegendComponent = () => {
    return (
      <>
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
            <Text style={{ color: "white" }}>Icome: 40%</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("#FF7F97")}
            <Text style={{ color: "white" }}>Expense: 3%</Text>
          </View>
        </View>
      </>
    );
  };

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
            centerLabelComponent={() => {
              return (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{ fontSize: 22, color: "white", fontWeight: "bold" }}
                  >
                    47%
                  </Text>
                  <Text style={{ fontSize: 14, color: "white" }}>
                    Excellent
                  </Text>
                </View>
              );
            }}
          />
        </View>
        {renderLegendComponent()}
      </View>
    </View>
  );
}
