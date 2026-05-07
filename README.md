# MExpence — Offline Expense Tracker

## 📱 Screens

### 1. Home Screen
- Dashboard card with total balance, income, and expenses
- Recent transactions list (latest 6)
- Floating action button to add transactions
- Empty state illustration when no data

### 2. Add Transaction Screen
- Segmented tabs: Expense / Income
- Form fields: Title, Amount, Category, Description
- Horizontal scrollable category picker
- Custom category creation with color picker
- Input validation with toast notifications

### 3. All Transactions Screen
- Full transaction list sorted by date
- Real-time search by title or description
- Type filter: All / Expenses / Income
- Category filter chips
- Delete with confirmation dialog
- Results count display

On app launch:
```
AsyncStorage → Zustand Store → UI renders with saved data
```
