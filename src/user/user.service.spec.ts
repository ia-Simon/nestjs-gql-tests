import { PageControlInput } from '@app/graphql-utils';
import { MockDB, UserEntity } from '@app/mock-db';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './models';
import { UserPagination } from './models/user-pagination';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findById', () => {
    it('should retrieve a user matching the provided ID', async () => {
      const userEntity: UserEntity = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
      };
      const expected = new User(userEntity);
      jest.spyOn(MockDB, 'findById').mockImplementationOnce(() => userEntity);

      const actual = await userService.findById(expected.id);

      expect(actual.id).toEqual(expected.id);
    });
  });

  describe('list', () => {
    it('should retrieve a user pagination matching the page control inputs', async () => {
      const pageControl = new PageControlInput();

      const expected = new UserPagination();
      expected.setItems([{ id: 1, email: 'user@example.com' }]);
      expected.setMetrics(pageControl, 1);
      jest.spyOn(MockDB, 'list').mockImplementationOnce(() => expected.items);

      const actual = await userService.list(pageControl);

      expect(actual).toEqual(expected);
    });
  });
});
