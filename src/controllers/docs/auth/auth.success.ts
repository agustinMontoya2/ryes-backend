import { HttpStatus } from "@nestjs/common";

import {
  AuthForgotPasswordSerializer,
  AuthLoginSerializer,
  AuthRefreshSerializer,
  AuthRegisterSerializer,
  AuthResetPasswordSerializer,
} from "@common/serializers";

export const authSuccess = {
  register: {
    message: "Usuario registrado",
    statusCode: HttpStatus.CREATED,
    serializer: AuthRegisterSerializer,
  },
  login: {
    message: "Login exitoso",
    statusCode: HttpStatus.OK,
    serializer: AuthLoginSerializer,
  },
  forgotPassword: {
    message: "Token de reseteo generado",
    statusCode: HttpStatus.OK,
    serializer: AuthForgotPasswordSerializer,
  },
  resetPassword: {
    message: "Contraseña reseteada",
    statusCode: HttpStatus.OK,
    serializer: AuthResetPasswordSerializer,
  },
  refresh: {
    message: "Token refrescado",
    statusCode: HttpStatus.OK,
    serializer: AuthRefreshSerializer,
  },
};
