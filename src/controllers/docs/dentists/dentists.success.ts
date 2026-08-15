import { HttpStatus } from "@nestjs/common";

import { DentistSerializer, GenericIDSerializer } from "@common/serializers";
import { DentistsListSerializer } from "@common/serializers/dentists/dentists-list.serializer";

export const dentistsSuccess = {
  list: {
    message: "Lista de odontólogos",
    statusCode: HttpStatus.OK,
    serializer: DentistsListSerializer,
  },
  create: {
    message: "Odontólogo creado",
    statusCode: HttpStatus.CREATED,
    serializer: GenericIDSerializer,
  },
  get: {
    message: "Detalle de odontólogo",
    statusCode: HttpStatus.OK,
    serializer: DentistSerializer,
  },
  update: {
    message: "Odontólogo actualizado",
    statusCode: HttpStatus.OK,
    serializer: GenericIDSerializer,
  },
  remove: {
    message: "Odontólogo eliminado",
    statusCode: HttpStatus.OK,
    serializer: GenericIDSerializer,
  },
};
