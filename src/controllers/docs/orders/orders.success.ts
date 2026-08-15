import { HttpStatus } from "@nestjs/common";

import { GenericIDSerializer, OrderSerializer } from "@common/serializers";
import { OrdersListSerializer } from "@common/serializers/orders/orders-list.serializer";

export const ordersSuccess = {
  list: {
    message: "Lista de órdenes",
    statusCode: HttpStatus.OK,
    serializer: OrdersListSerializer,
  },
  create: {
    message: "Orden creada",
    statusCode: HttpStatus.CREATED,
    serializer: GenericIDSerializer,
  },
  get: {
    message: "Detalle de orden",
    statusCode: HttpStatus.OK,
    serializer: OrderSerializer,
  },
  update: {
    message: "Orden actualizada",
    statusCode: HttpStatus.OK,
    serializer: GenericIDSerializer,
  },
  remove: {
    message: "Orden eliminada",
    statusCode: HttpStatus.OK,
    serializer: GenericIDSerializer,
  },
  complete: {
    message: "Orden completada",
    statusCode: HttpStatus.OK,
    serializer: GenericIDSerializer,
  },
};
