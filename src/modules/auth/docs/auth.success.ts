import { HttpStatus } from "@nestjs/common";

import { GenericIDSerializer, GenericSuccessSerializer } from "@common/serializers";

import { AuthLoginSerializer } from "../serializers";

export const authSuccess = {
  register: {
    message: "Usuario registrado",
    statusCode: HttpStatus.CREATED,
    serializer: GenericIDSerializer,
  },
  login: {
    message: "Login exitoso",
    statusCode: HttpStatus.OK,
    serializer: AuthLoginSerializer,
  },
  forgotPassword: {
    message: "Solicitud procesada",
    statusCode: HttpStatus.OK,
    serializer: GenericSuccessSerializer,
  },
  resetPassword: {
    message: "Contraseña reseteada",
    statusCode: HttpStatus.OK,
    serializer: GenericIDSerializer,
  },
  refresh: {
    message: "Token refrescado",
    statusCode: HttpStatus.OK,
    serializer: AuthLoginSerializer,
  },
};
