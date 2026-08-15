import { HttpStatus } from "@nestjs/common";

import { GenericIDSerializer, JobReportSerializer } from "@common/serializers";
import { ReportsListSerializer } from "@common/serializers/reports/reports-list.serializer";

export const reportsSuccess = {
  list: {
    message: "Lista de remitos",
    statusCode: HttpStatus.OK,
    serializer: ReportsListSerializer,
  },
  create: {
    message: "Remito generado",
    statusCode: HttpStatus.CREATED,
    serializer: GenericIDSerializer,
  },
  get: {
    message: "Detalle de remito",
    statusCode: HttpStatus.OK,
    serializer: JobReportSerializer,
  },
  remove: {
    message: "Remito eliminado",
    statusCode: HttpStatus.OK,
    serializer: GenericIDSerializer,
  },
};
