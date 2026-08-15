import { randomUUID } from "node:crypto";

import { OrderStatusEnum } from "@common/enums/order-status.enum";

import type {
  DentistSerializer,
  JobReportSerializer,
  OrderSerializer,
  PatientSerializer,
  ServiceSerializer,
} from "@common/serializers";

export const EXAMPLE_BRANCH_ID = "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d";

export function placeholderId(): string {
  return randomUUID();
}

export function placeholderPatient(
  overrides: Partial<PatientSerializer> = {},
): PatientSerializer {
  return {
    id: randomUUID(),
    branchId: EXAMPLE_BRANCH_ID,
    fullname: "María González",
    dni: 35123456,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

export function placeholderDentist(overrides: Partial<DentistSerializer> = {}) {
  return {
    id: randomUUID(),
    branchId: EXAMPLE_BRANCH_ID,
    name: "Roberto",
    lastname: "Sánchez",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

export function placeholderService(
  overrides: Partial<ServiceSerializer> = {},
): ServiceSerializer {
  return {
    id: randomUUID(),
    branchId: EXAMPLE_BRANCH_ID,
    name: "Corona de porcelana",
    price: 25000,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

export function placeholderOrder(
  overrides: Partial<OrderSerializer> = {},
): OrderSerializer {
  return {
    id: randomUUID(),
    branchId: EXAMPLE_BRANCH_ID,
    patient: placeholderPatient(),
    dentist: placeholderDentist(),
    services: [placeholderService()],
    dispatchDate: new Date(),
    dueDate: new Date(),
    lab: null,
    status: OrderStatusEnum.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

export function placeholderJobReport(
  overrides: Partial<JobReportSerializer> = {},
): JobReportSerializer {
  const report: JobReportSerializer = {
    id: randomUUID(),
    branchId: EXAMPLE_BRANCH_ID,
    deliveryDate: new Date(),
    totalPrice: 0,
    orders: [placeholderOrder()],
    createdAt: new Date(),
    ...overrides,
  };
  report.totalPrice = report.orders.reduce(
    (total, order) =>
      total +
      order.services.reduce(
        (servicesTotal, service) => servicesTotal + service.price,
        0,
      ),
    0,
  );
  return report;
}
