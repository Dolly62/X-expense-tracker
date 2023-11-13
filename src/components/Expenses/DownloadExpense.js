import React from "react";
import { useSelector } from "react-redux";

const DownloadExpense = () => {
  const expenses = useSelector((state) => state.expenses.items);

  const downloadCSV = () => {
    const headers = ["Description", "Category", "Amount", "Date", "Time"];
    const csvData = [headers];

    expenses.forEach((expense) => {
      const row = [
        expense.enteredDescription,
        expense.category,
        expense.spentPrice,
        expense.selectedDate,
        expense.selectedTime,
      ];
      csvData.push(row);
    });

    const csvContent = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Expensedata.csv");
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={downloadCSV}
      className="ml-auto bg-purple-400 rounded-3xl p-2 mr-1 text-xs"
    >
      Download
    </button>
  );
};

export default DownloadExpense;
