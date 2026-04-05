export const CATEGORIES = [
  "Food","Rent","Transport","Shopping","Health",
  "Entertainment","Education","Travel","Savings",
  "Bills","Salary","Freelance"
];

export const MOCK_TRANSACTIONS = [
  // MAY 2025
  { id: 1, date: "2025-05-01", description: "Salary Credit", amount: 75000, category: "Salary", type: "income" },
  { id: 2, date: "2025-05-03", description: "Rent Payment", amount: 18000, category: "Rent", type: "expense" },
  { id: 3, date: "2025-05-05", description: "Groceries", amount: 3000, category: "Food", type: "expense" },
  { id: 4, date: "2025-05-10", description: "Freelance Work", amount: 15000, category: "Freelance", type: "income" },
  { id: 5, date: "2025-05-12", description: "Shopping", amount: 5000, category: "Shopping", type: "expense" },

  // JUN 2025
  { id: 6, date: "2025-06-01", description: "Salary Credit", amount: 76000, category: "Salary", type: "income" },
  { id: 7, date: "2025-06-04", description: "Cab Ride", amount: 600, category: "Transport", type: "expense" },
  { id: 8, date: "2025-06-06", description: "Dinner", amount: 1200, category: "Food", type: "expense" },
  { id: 9, date: "2025-06-10", description: "Electric Bill", amount: 2500, category: "Bills", type: "expense" },
  { id: 10, date: "2025-06-15", description: "Freelance Work", amount: 18000, category: "Freelance", type: "income" },

  // JUL 2025
  { id: 11, date: "2025-07-01", description: "Salary Credit", amount: 78000, category: "Salary", type: "income" },
  { id: 12, date: "2025-07-02", description: "Rent Payment", amount: 19000, category: "Rent", type: "expense" },
  { id: 13, date: "2025-07-05", description: "Shopping", amount: 4500, category: "Shopping", type: "expense" },
  { id: 14, date: "2025-07-08", description: "Movie", amount: 700, category: "Entertainment", type: "expense" },
  { id: 15, date: "2025-07-12", description: "Doctor Visit", amount: 1200, category: "Health", type: "expense" },

  // AUG 2025
  { id: 16, date: "2025-08-01", description: "Salary Credit", amount: 80000, category: "Salary", type: "income" },
  { id: 17, date: "2025-08-03", description: "Groceries", amount: 3200, category: "Food", type: "expense" },
  { id: 18, date: "2025-08-06", description: "Bus Pass", amount: 1200, category: "Transport", type: "expense" },
  { id: 19, date: "2025-08-10", description: "Online Course", amount: 4000, category: "Education", type: "expense" },
  { id: 20, date: "2025-08-15", description: "Freelance Project", amount: 20000, category: "Freelance", type: "income" },

  // SEP 2025
  { id: 21, date: "2025-09-01", description: "Salary Credit", amount: 82000, category: "Salary", type: "income" },
  { id: 22, date: "2025-09-04", description: "Electric Bill", amount: 2600, category: "Bills", type: "expense" },
  { id: 23, date: "2025-09-06", description: "Restaurant Dinner", amount: 1500, category: "Food", type: "expense" },
  { id: 24, date: "2025-09-10", description: "Flight Ticket", amount: 9000, category: "Travel", type: "expense" },
  { id: 25, date: "2025-09-18", description: "Shopping", amount: 6000, category: "Shopping", type: "expense" },

  // OCT 2025
  { id: 26, date: "2025-10-01", description: "Salary Credit", amount: 83000, category: "Salary", type: "income" },
  { id: 27, date: "2025-10-03", description: "Rent Payment", amount: 20000, category: "Rent", type: "expense" },
  { id: 28, date: "2025-10-05", description: "Food Order", amount: 900, category: "Food", type: "expense" },
  { id: 29, date: "2025-10-08", description: "Netflix Subscription", amount: 500, category: "Entertainment", type: "expense" },
  { id: 30, date: "2025-10-15", description: "Freelance Bonus", amount: 22000, category: "Freelance", type: "income" },

  // NOV 2025
  { id: 31, date: "2025-11-01", description: "Salary Credit", amount: 84000, category: "Salary", type: "income" },
  { id: 32, date: "2025-11-04", description: "Uber Ride", amount: 500, category: "Transport", type: "expense" },
  { id: 33, date: "2025-11-07", description: "Shopping Mall", amount: 5500, category: "Shopping", type: "expense" },
  { id: 34, date: "2025-11-10", description: "Doctor Visit", amount: 1500, category: "Health", type: "expense" },
  { id: 35, date: "2025-11-14", description: "Freelance Project", amount: 21000, category: "Freelance", type: "income" },

  // DEC 2025
  { id: 36, date: "2025-12-01", description: "Salary Credit", amount: 85000, category: "Salary", type: "income" },
  { id: 37, date: "2025-12-03", description: "Electric Bill", amount: 2700, category: "Bills", type: "expense" },
  { id: 38, date: "2025-12-05", description: "Christmas Shopping", amount: 7000, category: "Shopping", type: "expense" },
  { id: 39, date: "2025-12-10", description: "Travel Booking", amount: 12000, category: "Travel", type: "expense" },
  { id: 40, date: "2025-12-18", description: "Dinner", amount: 1800, category: "Food", type: "expense" },

  // JAN 2026
  { id: 41, date: "2026-01-01", description: "Salary Credit", amount: 86000, category: "Salary", type: "income" },
  { id: 42, date: "2026-01-03", description: "Rent Payment", amount: 21000, category: "Rent", type: "expense" },
  { id: 43, date: "2026-01-05", description: "Swiggy Order", amount: 950, category: "Food", type: "expense" },
  { id: 44, date: "2026-01-10", description: "Gym Membership", amount: 2000, category: "Health", type: "expense" },
  { id: 45, date: "2026-01-15", description: "Freelance Work", amount: 23000, category: "Freelance", type: "income" },

  // FEB 2026
  { id: 46, date: "2026-02-01", description: "Salary Credit", amount: 87000, category: "Salary", type: "income" },
  { id: 47, date: "2026-02-04", description: "Cab Ride", amount: 650, category: "Transport", type: "expense" },
  { id: 48, date: "2026-02-07", description: "Shopping", amount: 6000, category: "Shopping", type: "expense" },
  { id: 49, date: "2026-02-10", description: "Doctor Visit", amount: 1600, category: "Health", type: "expense" },
  { id: 50, date: "2026-02-14", description: "Freelance Project", amount: 24000, category: "Freelance", type: "income" },

  // MAR 2026
  { id: 51, date: "2026-03-01", description: "Salary Credit", amount: 88000, category: "Salary", type: "income" },
  { id: 52, date: "2026-03-03", description: "Electric Bill", amount: 2800, category: "Bills", type: "expense" },
  { id: 53, date: "2026-03-05", description: "Restaurant Dinner", amount: 1400, category: "Food", type: "expense" },
  { id: 54, date: "2026-03-10", description: "Flight Ticket", amount: 10000, category: "Travel", type: "expense" },
  { id: 55, date: "2026-03-18", description: "Shopping", amount: 6500, category: "Shopping", type: "expense" },

  // APR 2026
  { id: 56, date: "2026-04-01", description: "Salary Credit", amount: 90000, category: "Salary", type: "income" },
  { id: 57, date: "2026-04-02", description: "Gym Membership", amount: 2200, category: "Health", type: "expense" },
  { id: 58, date: "2026-04-05", description: "Netflix Subscription", amount: 500, category: "Entertainment", type: "expense" },
  { id: 59, date: "2026-04-08", description: "Bus Pass", amount: 1300, category: "Transport", type: "expense" },
  { id: 60, date: "2026-04-12", description: "Freelance Bonus", amount: 26000, category: "Freelance", type: "income" }
];