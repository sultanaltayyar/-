
import { PaymentStatus, YearRecord } from './types';

export const DASHBOARD_STATS = {
  totalDebt: 46500,
  paidAmount: 30000,
  remainingAmount: 16500,
  closingDate: 'يونيو 2027',
};

export const PAYMENT_RECORDS: YearRecord[] = [
  {
    year: 2023,
    title: 'سنة البداية',
    subtitle: 'البداية الفعلية: أغسطس 2023',
    months: [
      { monthName: 'أبريل - يوليو', amount: 0, remainingBalance: 46500, status: PaymentStatus.GAP, isGap: true },
      { monthName: 'أغسطس', amount: 1500, remainingBalance: 45000, status: PaymentStatus.PAID },
      { monthName: 'سبتمبر', amount: 1000, remainingBalance: 44000, status: PaymentStatus.PAID },
      { monthName: 'أكتوبر', amount: 1000, remainingBalance: 43000, status: PaymentStatus.PAID },
      { monthName: 'نوفمبر', amount: 1000, remainingBalance: 42000, status: PaymentStatus.PAID },
      { monthName: 'ديسمبر', amount: 1000, remainingBalance: 41000, status: PaymentStatus.PAID },
    ]
  },
  {
    year: 2024,
    title: 'سنة 2024',
    subtitle: 'تفصيل المدفوعات والهبات',
    months: [
      { monthName: 'يناير', amount: 1000, details: '(750 + 250 هدية)', remainingBalance: 40000, status: PaymentStatus.PAID },
      { monthName: 'فبراير', amount: 1000, details: '(750 + 250 هدية)', remainingBalance: 39000, status: PaymentStatus.PAID },
      { monthName: 'مارس', amount: 1000, details: '(750 + 250 هدية)', remainingBalance: 38000, status: PaymentStatus.PAID },
      { monthName: 'أبريل', amount: 1000, details: '(750 + 250 هدية)', remainingBalance: 37000, status: PaymentStatus.PAID },
      { monthName: 'مايو', amount: 1000, details: '(750 + 250 هدية)', remainingBalance: 36000, status: PaymentStatus.PAID },
      { monthName: 'يونيو', amount: 1000, details: '(750 + 250 هدية)', remainingBalance: 35000, status: PaymentStatus.PAID },
      { monthName: 'يوليو', amount: 750, details: '(نقص في السداد)', remainingBalance: 34250, status: PaymentStatus.DEFICIT },
      { monthName: 'أغسطس', amount: 1000, details: '(750 + 250 هدية)', remainingBalance: 33250, status: PaymentStatus.PAID },
      { monthName: 'سبتمبر', amount: 1000, details: '(750 + 250 هدية)', remainingBalance: 32250, status: PaymentStatus.PAID },
      { monthName: 'أكتوبر', amount: 1000, details: '(750 + 250 هدية)', remainingBalance: 31250, status: PaymentStatus.PAID },
      { monthName: 'نوفمبر', amount: 750, details: '(نقص في السداد)', remainingBalance: 30500, status: PaymentStatus.DEFICIT },
      { monthName: 'ديسمبر', amount: 1000, details: '(750 + 250 هدية)', remainingBalance: 29500, status: PaymentStatus.PAID },
    ]
  },
  {
    year: 2025,
    title: 'سنة 2025',
    subtitle: 'تفصيل دقيق (نقدي + هبة)',
    months: [
      { monthName: 'يناير', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 28500, status: PaymentStatus.PAID },
      { monthName: 'فبراير', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 27500, status: PaymentStatus.PAID },
      { monthName: 'مارس', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 26500, status: PaymentStatus.PAID },
      { monthName: 'أبريل', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 25500, status: PaymentStatus.PAID },
      { monthName: 'مايو', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 24500, status: PaymentStatus.PAID },
      { monthName: 'يونيو', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 23500, status: PaymentStatus.PAID },
      { monthName: 'يوليو', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 22500, status: PaymentStatus.PAID },
      { monthName: 'أغسطس', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 21500, status: PaymentStatus.PAID },
      { monthName: 'سبتمبر', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 20500, status: PaymentStatus.PAID },
      { monthName: 'أكتوبر', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 19500, status: PaymentStatus.PAID },
      { monthName: 'نوفمبر', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 18500, status: PaymentStatus.PAID },
      { monthName: 'ديسمبر', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 17500, status: PaymentStatus.PAID },
    ]
  },
  {
    year: 2026,
    title: 'العام الحالي',
    subtitle: 'الرصيد الحالي: 16,500 ريال',
    accentColor: 'indigo',
    months: [
      { monthName: 'يناير', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 16500, status: PaymentStatus.PAID },
      { monthName: 'فبراير', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 15500, status: PaymentStatus.SCHEDULED },
      { monthName: 'مارس', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 14500, status: PaymentStatus.SCHEDULED },
      { monthName: 'أبريل', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 13500, status: PaymentStatus.SCHEDULED },
      { monthName: 'مايو', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 12500, status: PaymentStatus.SCHEDULED },
      { monthName: 'يونيو', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 11500, status: PaymentStatus.SCHEDULED },
      { monthName: 'يوليو', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 10500, status: PaymentStatus.SCHEDULED },
      { monthName: 'أغسطس', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 9500, status: PaymentStatus.SCHEDULED },
      { monthName: 'سبتمبر', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 8500, status: PaymentStatus.SCHEDULED },
      { monthName: 'أكتوبر', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 7500, status: PaymentStatus.SCHEDULED },
      { monthName: 'نوفمبر', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 6500, status: PaymentStatus.SCHEDULED },
      { monthName: 'ديسمبر', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 5500, status: PaymentStatus.SCHEDULED },
    ]
  },
  {
    year: 2027,
    title: 'سنة الإغلاق',
    subtitle: 'موعد النهاية: يونيو 2027',
    months: [
      { monthName: 'يناير', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 4500, status: PaymentStatus.SCHEDULED },
      { monthName: 'فبراير', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 3500, status: PaymentStatus.SCHEDULED },
      { monthName: 'مارس', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 2500, status: PaymentStatus.SCHEDULED },
      { monthName: 'أبريل', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 1500, status: PaymentStatus.SCHEDULED },
      { monthName: 'مايو', amount: 1000, details: '750 نقداً + 250 هدية', remainingBalance: 500, status: PaymentStatus.SCHEDULED },
      { monthName: 'يونيو', amount: 500, details: '(القسط الأخير)', remainingBalance: 0, status: PaymentStatus.CLOSED },
    ]
  },
];
