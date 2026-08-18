import { HttpStatus } from "@nestjs/common";

import {
  GenericIDSerializer,
  UserSerializer,
  UsersListSerializer,
} from "@common/serializers";

export const usersSuccess = {
  list: {
    message: "Lista de usuarios",
    statusCode: HttpStatus.OK,
    serializer: UsersListSerializer,
  },
  getMe: {
    message: "Usuario autenticado",
    statusCode: HttpStatus.OK,
    serializer: UserSerializer,
  },
  assignBranches: {
    message: "Branches sincronizadas",
    statusCode: HttpStatus.OK,
    serializer: GenericIDSerializer,
  },
};
