import { PageControlInput } from '@app/graphql-utils';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, UserPayload, CreateUserInput, UpdateUserInput } from './models';
import { UserPagination } from './models/user-pagination';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => User, { nullable: true })
  async user(@Args('id') id: number): Promise<User> {
    return await this.userService.findById(id);
  }

  @Query(returns => UserPagination)
  async users(@Args('pageControl') pageControl: PageControlInput): Promise<UserPagination> {
    return await this.userService.list(pageControl);
  }

  @Mutation(returns => UserPayload)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserPayload> {
    return await this.userService.create(input);
  }
  @Mutation(returns => UserPayload)
  async updateUser(@Args('id') id: number, @Args('input') input: UpdateUserInput): Promise<UserPayload> {
    return await this.userService.update(id, input);
  }

  @Mutation(returns => UserPayload)
  async deleteUser(@Args('id') id: number): Promise<UserPayload> {
    return await this.userService.delete(id);
  }
}
