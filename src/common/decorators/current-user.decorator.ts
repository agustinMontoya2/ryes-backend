import { createParamDecorator, type ExecutionContext } from "@nestjs/common";

const currentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export { currentUser as CurrentUser };
