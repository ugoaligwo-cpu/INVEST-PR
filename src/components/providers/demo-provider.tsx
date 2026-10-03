"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  initialInvestments,
  initialTransactions,
  plans,
  type DemoInvestment,
  type DemoTransaction,
} from "@/lib/data";

type DemoState = {
  isAuthenticated: boolean;
  balance: number;
  investedBalance: number;
  profitBalance: number;
  todayProfit: number;
  transactions: DemoTransaction[];
  investments: DemoInvestment[];
};

type DemoActions = {
  login: () => void;
  logout: () => void;
  deposit: (amount: number, method: string) => void;
  withdraw: (amount: number, method: string) => void;
  createInvestment: (planId: string, amount: number) => void;
  reset: () => void;
};

type DemoContextValue = DemoState & DemoActions;

const DemoContext = createContext<DemoContextValue | null>(null);

const STORAGE_KEY = "investinnova-demo-state-v1";

const initialState: DemoState = {
  isAuthenticated: false,
  balance: 12580.5,
  investedBalance: 2300,
  profitBalance: 1980.32,
  todayProfit: 186.42,
  transactions: initialTransactions,
  investments: initialInvestments,
};

let storeState = initialState;
let hydrated = false;
const listeners = new Set<() => void>();

function getSnapshot() {
  return storeState;
}

function getServerSnapshot() {
  return initialState;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function commit(nextState: DemoState) {
  storeState = nextState;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }
  listeners.forEach((listener) => listener());
}

function hydrateStore() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const parsed = JSON.parse(saved) as DemoState;
    if (
      parsed &&
      Array.isArray(parsed.transactions) &&
      Array.isArray(parsed.investments)
    ) {
      storeState = parsed;
      listeners.forEach((listener) => listener());
    }
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

function transactionId() {
  return `txn-${Date.now()}`;
}

export function DemoProvider({ children }: { children: ReactNode }) {
  useEffect(hydrateStore, []);

  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const actions = useMemo<DemoActions>(
    () => ({
      login: () => commit({ ...storeState, isAuthenticated: true }),
      logout: () => commit({ ...storeState, isAuthenticated: false }),
      deposit: (amount, method) => {
        const safeAmount = Math.max(0, amount);
        commit({
          ...storeState,
          balance: storeState.balance + safeAmount,
          transactions: [
            {
              id: transactionId(),
              type: "deposit",
              label: "Deposit",
              method,
              date: new Date().toISOString(),
              amount: safeAmount,
              status: "successful",
              direction: "credit",
            },
            ...storeState.transactions,
          ],
        });
      },
      withdraw: (amount, method) => {
        const safeAmount = Math.min(Math.max(0, amount), storeState.balance);
        commit({
          ...storeState,
          balance: storeState.balance - safeAmount,
          transactions: [
            {
              id: transactionId(),
              type: "withdrawal",
              label: "Withdrawal",
              method,
              date: new Date().toISOString(),
              amount: safeAmount,
              status: "processing",
              direction: "debit",
            },
            ...storeState.transactions,
          ],
        });
      },
      createInvestment: (planId, amount) => {
        const selectedPlan = plans.find((plan) => plan.id === planId);
        if (!selectedPlan) return;

        const safeAmount = Math.min(
          Math.max(0, amount),
          storeState.balance,
          selectedPlan.max,
        );
        const startedAt = new Date();
        const endsAt = new Date(
          startedAt.getTime() + selectedPlan.duration * 86400000,
        );

        const investment: DemoInvestment = {
          id: `inv-${Date.now()}`,
          planId: selectedPlan.id,
          plan: selectedPlan.name,
          amount: safeAmount,
          earned: 0,
          startedAt: startedAt.toISOString(),
          endsAt: endsAt.toISOString(),
          status: "ongoing",
          progress: 4,
          color: selectedPlan.featured ? "#f8812d" : "#fb923c",
        };

        commit({
          ...storeState,
          balance: storeState.balance - safeAmount,
          investedBalance: storeState.investedBalance + safeAmount,
          investments: [investment, ...storeState.investments],
          transactions: [
            {
              id: transactionId(),
              type: "investment",
              label: "Investment",
              method: `${selectedPlan.name} plan`,
              date: startedAt.toISOString(),
              amount: safeAmount,
              status: "successful",
              direction: "debit",
            },
            ...storeState.transactions,
          ],
        });
      },
      reset: () => commit(initialState),
    }),
    [],
  );

  const value = useMemo(
    () => ({ ...state, ...actions }),
    [actions, state],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within DemoProvider");
  }
  return context;
}
