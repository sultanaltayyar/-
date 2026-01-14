
export enum PaymentStatus {
  PAID = 'PAID',
  GAP = 'GAP',
  DEFICIT = 'DEFICIT',
  SCHEDULED = 'SCHEDULED',
  CLOSED = 'CLOSED'
}

export interface PaymentMonth {
  monthName: string;
  amount: number | string;
  details?: string;
  remainingBalance: number;
  status: PaymentStatus;
  isGap?: boolean;
}

export interface YearRecord {
  year: number;
  title: string;
  subtitle: string;
  months: PaymentMonth[];
  accentColor?: string;
}

export interface DashboardStats {
  totalDebt: number;
  paidAmount: number;
  remainingAmount: number;
  closingDate: string;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'thought';
  text: string;
}
