import { PageControlInput } from '@app/graphql-utils';
import { MockDB } from '@app/mock-db';
import { Injectable } from '@nestjs/common';
import { User, UserPayload, CreateUserInput, UpdateUserInput } from './models';
import { UserPagination } from './models/user-pagination';


@Injectable()
export class UserService {
  async findById(id: number): Promise<User> {
    const user = MockDB.findById("user", id);
    
    if (user) {
      return new User(user);
    }
  }
  
  async list(pageControl: PageControlInput): Promise<UserPagination> {
    const pagination = new UserPagination();

    const users = MockDB.list("user");
    
    pagination.setMetrics(pageControl, users.length);
    pagination.setItems(users.map(user => new User(user)));

    return pagination;
  }

  async create(input: CreateUserInput): Promise<UserPayload> {
    const payload = new UserPayload();

    const user = MockDB.create('user', input);

    if (user) {
      payload.setResource(new User(user));
    } else {
      payload.addError({ code: 'U0001', message: 'Failed to create user.' })
    }

    return payload;
  }

  async update(id: number, input: UpdateUserInput): Promise<UserPayload> {
    const payload = new UserPayload();

    const user = MockDB.update('user', id, input);

    if (user) {
      payload.setResource(new User(user));
    } else {
      payload.addError({ code: 'U0001', message: 'Failed to update user.' })
    }

    return payload;
  }

  async delete(id: number): Promise<UserPayload> {
    const payload = new UserPayload();

    const user = MockDB.delete('user', id);

    if (user) {
      payload.setResource(new User(user));
    } else {
      payload.addError({ code: 'U0001', message: 'Failed to delete user.' })
    }

    return payload;
  }
}
