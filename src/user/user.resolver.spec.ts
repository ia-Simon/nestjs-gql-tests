import { PageControlInput } from '@app/graphql-utils';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserInput, UpdateUserInput, User, UserPayload } from './models';
import { UserPagination } from './models/user-pagination';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, UserService],
    }).compile();

    userResolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userResolver).toBeDefined();
  });

  describe('user', () => {
    it('should return a User or null', async () => {
      const expected = new User({
        id: 1,
        email: 'john@doe.com',
        name: 'John Doe',
      });
      jest.spyOn(userService, 'findById')
        .mockImplementationOnce(async () => expected)
        .mockImplementationOnce(async () => null);

      expect(await userResolver.user(expected.id)).toBeInstanceOf(User);
      expect(await userResolver.user(999)).toBe(null);
    });
  });

  describe('users', () => {
    it('should return a UserPagination', async () => {
      const pageControl = new PageControlInput();
      const expected = new UserPagination();
      expected.setItems([
        { id: 1, name: 'John Doe', email: 'john@doe.com' }
      ]);
      expected.setMetrics(pageControl, 1);
      jest.spyOn(userService, 'list').mockImplementationOnce(async () => expected);

      expect(await userResolver.users(pageControl)).toBeInstanceOf(UserPagination);
    });
  });

  describe('createUser', () => {
    it('should return a UserPayload', async () => {
      const input: CreateUserInput = {
        name: 'John Doe',
        email: 'john@doe.com',
      };
      const expected = new UserPayload();
      expected.setResource({ id: 1, email: input.email, name: input.name });
      jest.spyOn(userService, 'create').mockImplementationOnce(async () => expected);

      expect(await userResolver.createUser(input)).toBeInstanceOf(UserPayload);
    });
  });

  describe('updateUser', () => {
    it('should return a UserPayload', async () => {
      const input: UpdateUserInput = {
        name: 'John Doe',
        email: 'john@doe.com',
      };
      const expected = new UserPayload();
      expected.setResource({ id: 1, email: input.email, name: input.name });
      jest.spyOn(userService, 'update').mockImplementationOnce(async () => expected);

      expect(await userResolver.updateUser(1, input)).toBeInstanceOf(UserPayload);
    });
  });

  describe('deleteUser', () => {
    it('should return a UserPayload', async () => {
      const expected = new UserPayload();
      expected.setResource({ id: 1, email: 'John Doe', name: 'john@doe.com' });
      jest.spyOn(userService, 'delete').mockImplementationOnce(async () => expected);

      expect(await userResolver.deleteUser(1)).toBeInstanceOf(UserPayload);
    });
  });
});
