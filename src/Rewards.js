import "./Rewards.css";
import { useEffect, useState } from "react";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const calculateRewards = (orderList) => {
  const customerRewards = {};
  orderList.forEach((order) => {
    customerRewards[order.customerId] = customerRewards[order.customerId] || {
      name: order.customerName,
    };
    let month = new Date(order.createdOn).getMonth();
    customerRewards[order.customerId][month] =
      customerRewards[order.customerId][month] || 0;
    if (order.amount > 100) {
      customerRewards[order.customerId][month] += (order.amount - 100) * 2 + 50;
    } else if (order.amount > 50) {
      customerRewards[order.customerId][month] += order.amount - 50;
    }
  });
  return customerRewards;
};

const Rewards = ({ months }) => {
  const [customerRewards, setCustomerRewards] = useState({});
  useEffect(() => {
    const fetchOrderList = async () => {
      const resp = await fetch("/mockdata/ordersMock.json"); // Assuming showing rewards for last 3 months
      const orderList = await resp.json();
      const rewards = calculateRewards(orderList);
      setCustomerRewards(rewards);
    };
    fetchOrderList();
  }, []);

  return (
    <table className="rewards">
      <thead>
        <tr>
          <th>Customer Name</th>
          {months.map((month) => {
            return <th key={month}>{month}</th>;
          })}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(customerRewards).map((key) => {
          let total = 0;
          return (
            <tr key={key}>
              <td>{customerRewards[key].name}</td>
              {months.map((month) => {
                const rewardsByMonth =
                  customerRewards[key][MONTHS.indexOf(month)] || 0;
                total += rewardsByMonth;
                return <td key={month}>{`${rewardsByMonth}`}</td>;
              })}
              <td>{total}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Rewards;
