import { HttpStatus } from "@nestjs/common";

import { GenericIDSerializer, ServiceSerializer } from "@common/serializers";
import { ServicesListSerializer } from "@common/serializers/services/services-list.serializer";

export const servicesSuccess = {
  list: {
    message: "Lista de servicios",
    statusCode: HttpStatus.OK,
    serializer: ServicesListSerializer,
  },
  create: {
    message: "Servicio creado",
    statusCode: HttpStatus.CREATED,
    serializer: GenericIDSerializer,
  },
  get: {
    message: "Detalle de servicio",
    statusCode: HttpStatus.OK,
    serializer: ServiceSerializer,
  },
  getByName: {
    message: "Servicio encontrado",
    statusCode: HttpStatus.OK,
    serializer: ServiceSerializer,
  },
  update: {
    message: "Servicio actualizado",
    statusCode: HttpStatus.OK,
    serializer: GenericIDSerializer,
  },
  remove: {
    message: "Servicio eliminado",
    statusCode: HttpStatus.OK,
    serializer: GenericIDSerializer,
  },
};
