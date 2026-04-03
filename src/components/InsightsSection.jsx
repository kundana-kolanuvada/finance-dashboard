import { useApp } from "../context/AppContext";

export default function InsightsSection() {
  const { transactions } = useApp();

  const expenses = transactions.filter(t=>t.type==="expense");

  const byCat = {};
  expenses.forEach(t=>{
    byCat[t.category]=(byCat[t.category]||0)+t.amount;
  });

  const top = Object.entries(byCat).sort((a,b)=>b[1]-a[1])[0];

  const income = transactions.filter(t=>t.type==="income")
    .reduce((a,b)=>a+b.amount,0);

  const exp = transactions.filter(t=>t.type==="expense")
    .reduce((a,b)=>a+b.amount,0);

  const savings = ((income-exp)/income*100).toFixed(1);

  return (
    <div className="card">
      <h2>Insights</h2>
      <p>Top Category: {top?.[0]}</p>
      <p>Savings Rate: {savings}%</p>
    </div>
  );
}