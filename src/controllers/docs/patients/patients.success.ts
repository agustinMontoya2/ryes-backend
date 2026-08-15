import { HttpStatus } from "@nestjs/common";

import { GenericIDSerializer, PatientSerializer } from "@common/serializers";
import { PatientsListSerializer } from "@common/serializers/patients/patients-list.serializer";

export const patientsSuccess = {
  list: {
    message: "Lista de pacientes",
    statusCode: HttpStatus.OK,
    serializer: PatientsListSerializer,
  },
  lookup: {
    message: "Paciente encontrado",
    statusCode: HttpStatus.OK,
    serializer: PatientSerializer,
  },
  create: {
    message: "Paciente creado",
    statusCode: HttpStatus.CREATED,
    serializer: GenericIDSerializer,
  },
  get: {
    message: "Detalle de paciente",
    statusCode: HttpStatus.OK,
    serializer: PatientSerializer,
  },
  update: {
    message: "Paciente actualizado",
    statusCode: HttpStatus.OK,
    serializer: GenericIDSerializer,
  },
  remove: {
    message: "Paciente eliminado",
    statusCode: HttpStatus.OK,
    serializer: GenericIDSerializer,
  },
};
