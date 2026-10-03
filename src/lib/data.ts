export type InvestmentPlan = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  min: number;
  max: number;
  duration: number;
  projectedReturn: number;
  referralBonus: number;
  featured?: boolean;
  features: string[];
};

export type DemoTransaction = {
  id: string;
  type: "deposit" | "withdrawal" | "investment" | "profit" | "referral";
  label: string;
  method: string;
  date: string;
  amount: number;
  status: "successful" | "pending" | "processing";
  direction: "credit" | "debit";
};

export type DemoInvestment = {
  id: string;
  planId: string;
  plan: string;
  amount: number;
  earned: number;
  startedAt: string;
  endsAt: string;
  status: "ongoing" | "completed";
  progress: number;
  color: string;
};

export const plans: InvestmentPlan[] = [
  {
    id: "basic",
    name: "Basic",
    eyebrow: "Investment Plan",
    description: "Start with a smaller amount and earn daily profit.",
    min: 100,
    max: 499,
    duration: 7,
    projectedReturn: 15,
    referralBonus: 0,
    features: ["Daily profit", "7 day duration"],
  },
  {
    id: "premium",
    name: "Premium",
    eyebrow: "Investment Plan",
    description: "Increase your investment and receive referral rewards.",
    min: 500,
    max: 1499,
    duration: 7,
    projectedReturn: 15,
    referralBonus: 2,
    features: ["Daily profit", "2% referral bonus"],
  },
  {
    id: "grand",
    name: "Grand",
    eyebrow: "Investment Plan",
    description: "Our highest returning plan with a 10% referral bonus.",
    min: 1500,
    max: 4999,
    duration: 7,
    projectedReturn: 25,
    referralBonus: 10,
    features: ["Daily profit", "10% referral bonus"],
  },
];

export const testimonials: Array<{
  name: string;
  role: string;
  quote: string;
}> = [];

export const faqs = [
  {
    question: "How do I sign up?",
    answer: "Click the sign-up button on the homepage.",
  },
  {
    question:
      "I have a complaint or feedback; how do I contact you?",
    answer:
      "Please send an email to help@ouremail.com or reach out through our social media platforms.",
  },
  {
    question: "What are your Terms of Use and Privacy Policy?",
    answer:
      "Go to our terms of use and privacy policy pages (links in the footer of the site).",
  },
];

export const chartData = [
  { month: "Jan", value: 18200, profit: 680 },
  { month: "Feb", value: 19150, profit: 910 },
  { month: "Mar", value: 20400, profit: 1210 },
  { month: "Apr", value: 21350, profit: 1480 },
  { month: "May", value: 22780, profit: 1760 },
  { month: "Jun", value: 23900, profit: 2130 },
  { month: "Jul", value: 25400, profit: 2580 },
  { month: "Aug", value: 27150, profit: 3010 },
  { month: "Sep", value: 28890, profit: 3490 },
];

export const initialTransactions: DemoTransaction[] = [
  {
    id: "txn-1001",
    type: "profit",
    label: "Daily Profit",
    method: "Premium Plan",
    date: "2026-09-25T14:20:00.000Z",
    amount: 186.42,
    status: "successful",
    direction: "credit",
  },
  {
    id: "txn-1002",
    type: "investment",
    label: "Investment Topup",
    method: "Basic Plan",
    date: "2026-09-22T10:10:00.000Z",
    amount: 1200,
    status: "successful",
    direction: "debit",
  },
  {
    id: "txn-1003",
    type: "deposit",
    label: "Deposit",
    method: "Bank Transfer",
    date: "2026-09-18T08:30:00.000Z",
    amount: 2500,
    status: "successful",
    direction: "credit",
  },
  {
    id: "txn-1004",
    type: "withdrawal",
    label: "Withdrawal",
    method: "Bank Account",
    date: "2026-09-12T16:45:00.000Z",
    amount: 640,
    status: "processing",
    direction: "debit",
  },
  {
    id: "txn-1005",
    type: "referral",
    label: "Referral Reward",
    method: "Premium Plan",
    date: "2026-09-08T12:00:00.000Z",
    amount: 75,
    status: "successful",
    direction: "credit",
  },
];

export const initialInvestments: DemoInvestment[] = [
  {
    id: "inv-1001",
    planId: "premium",
    plan: "Premium",
    amount: 1500,
    earned: 284.3,
    startedAt: "2026-09-21T09:00:00.000Z",
    endsAt: "2026-09-28T09:00:00.000Z",
    status: "ongoing",
    progress: 67,
    color: "#f8812d",
  },
  {
    id: "inv-1002",
    planId: "basic",
    plan: "Basic",
    amount: 800,
    earned: 142.76,
    startedAt: "2026-09-20T09:00:00.000Z",
    endsAt: "2026-09-27T09:00:00.000Z",
    status: "ongoing",
    progress: 82,
    color: "#fb923c",
  },
  {
    id: "inv-1003",
    planId: "basic",
    plan: "Basic",
    amount: 450,
    earned: 68.4,
    startedAt: "2026-09-11T09:00:00.000Z",
    endsAt: "2026-09-18T09:00:00.000Z",
    status: "completed",
    progress: 100,
    color: "#fdba74",
  },
];
