import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Modal, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "@/constants/style";

interface DatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
  placeholder?: string;
}

export default function DatePicker({
  date,
  setDate,
  placeholder = "Select Date",
}: DatePickerProps) {
  const [show, setShow] = useState(false);

  const handleConfirm = useCallback(
    (event: any, selectedDate?: Date) => {
      setShow(false);
      if (selectedDate) {
        setDate(selectedDate);
      }
    },
    [setDate]
  );

  const handleShowPicker = useCallback(() => setShow(true), []);

  return (
    <View>
      <TouchableOpacity
        onPress={handleShowPicker}
        className={styles.inputContainer}
      >
        {date ? (
          <Text className=" text-[#828282] dark:text-white">
            {date.toLocaleDateString()}
          </Text>
        ) : (
          <Text className="text-[#828282]">{placeholder}</Text>
        )}
      </TouchableOpacity>

      {show && (
        <Modal transparent animationType="fade" visible={Platform.OS === "ios"}>
          <View className="flex-1 justify-center bg-black bg-opacity-50">
            <View className="bg-white rounded-lg p-4">
              <DateTimePicker
                value={date || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={handleConfirm}
              />
              {Platform.OS === "ios" && (
                <TouchableOpacity
                  onPress={() => setShow(false)}
                  className={styles.button}
                >
                  <Text className={styles.buttonText}>Done</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      )}

      {Platform.OS === "android" && show && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={handleConfirm}
        />
      )}
    </View>
  );
}
