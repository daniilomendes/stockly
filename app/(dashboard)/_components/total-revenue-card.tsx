import { getTotalRevenue } from "@/app/_data-access/dashboard/get-total-revenue";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";
import { DollarSign } from "lucide-react";
import { formatCurrency } from "@/app/_helpers/currency";

const TotalRevenuCard = async () => {
  const totalRevenue = await getTotalRevenue();
  return (
    <SummaryCard>
      <SummaryCardIcon>
        <DollarSign />
      </SummaryCardIcon>
      <SummaryCardTitle>Receita total</SummaryCardTitle>
      <SummaryCardValue>{formatCurrency(totalRevenue)}</SummaryCardValue>
    </SummaryCard>
  );
};

export default TotalRevenuCard;
