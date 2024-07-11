// import React, { useState } from "react";
// import { SafeAreaView, Button } from "react-native";
// import ScheduleMatrix from "./ScheduleMatrix"; // Đảm bảo đường dẫn đúng đến file ScheduleMatrix

// const ScheduleMatrix = () => {
//   // Ví dụ dữ liệu ban đầu
//   const initialArray = [
//     [1, 0, 0, 1, 0, 1, 0], // Morning
//     [0, 1, 1, 0, 0, 0, 0], // Afternoon
//     [1, 0, 1, 0, 1, 1, 0], // Evening
//     [0, 1, 0, 1, 0, 0, 1], // Night
//   ].map((row) => row.map((cell) => cell === 1));

//   const [schedule, setSchedule] = useState(initialArray);

//   const handleBook = (selectedTimes) => {
//   };

//   const updateSchedule = () => {
//     // Cập nhật lại lịch làm việc
//     const newSchedule = [
//       [0, 0, 1, 1, 0, 0, 1], // Morning
//       [1, 1, 0, 0, 1, 1, 0], // Afternoon
//       [0, 0, 0, 1, 1, 1, 1], // Evening
//       [1, 1, 1, 0, 0, 0, 0], // Night
//     ].map((row) => row.map((cell) => cell === 1));
//     setSchedule(newSchedule);
//   };

//   // return (
//   //   <SafeAreaView style={{ flex: 1 }}>
//   //     <ScheduleMatrix initialSchedule={schedule} onBook={handleBook} />
//   //     <Button title="Update Schedule" onPress={updateSchedule} />
//   //   </SafeAreaView>
//   // );
// };

export const initialArray = [
  [0, 0, 0, 0, 0, 0, 0], // Morning
  [0, 0, 0, 0, 0, 0, 0], // Afternoon
  [0, 0, 0, 0, 0, 0, 0], // Evening
  [0, 0, 0, 0, 0, 0, 0], // Night
].map(row => row.map(cell => cell === 1));
