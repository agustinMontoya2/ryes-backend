import { HttpStatus } from "@nestjs/common";

import { BranchSerializer } from "@common/serializers";

export const branchesSuccess = {
  list: {
    message: "Lista de sucursales",
    statusCode: HttpStatus.OK,
    serializer: BranchSerializer,
  },
};
