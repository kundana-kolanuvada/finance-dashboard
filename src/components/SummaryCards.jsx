import { useApp } from "../context/AppContext";
import { motion } from "framer-motion";

export default function SummaryCards() {
  const { income, expense, balance } = useApp();

  const Card = ({title,value}) => (
    <motion.div
      className="summary-card"
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      whileHover={{scale:1.05}}
    >
      <p>{title}</p>
      <h2>₹{value.toLocaleString()}</h2>
    </motion.div>
  );

  return (
    <div className="summary-grid">
      <Card title="Balance" value={balance}/>
      <Card title="Income" value={income}/>
      <Card title="Expenses" value={expense}/>
    </div>
  );
}