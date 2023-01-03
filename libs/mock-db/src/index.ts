
export type UserEntity = {
  id: number;
  email: string;
  name?: string;
}

export type CarEntity = {
  id: number;
  color: string;
}

const DataStore = {
  tables: {
    user: new Map<number, UserEntity>(
      [
        [1, {
          id: 1,
          email: 'roberto@example.com',
          name: 'Roberto',
        }],
      ]
    ),
    car: new Map<number, CarEntity>(
      [
        [1, {
          id: 1,
          color: 'Verde',
        }],
      ]
    ),
  },
  counters: {
    user: 1,
    car: 1,
  }
};

export class MockDB {
  static findById<
    T extends keyof typeof DataStore.tables,
    R extends typeof DataStore.tables[T] extends Map<any, infer I> ? I : never,
  >(table: T, id: number): R {
    //@ts-ignore
    return DataStore.tables[table].get(id);
  }

  static list<
    T extends keyof typeof DataStore.tables,
    R extends typeof DataStore.tables[T] extends Map<any, infer I> ? I[]: never,
  >(table: T): R {
    //@ts-ignore
    return Array.from(DataStore.tables[table].values());
  }

  static create<
    T extends keyof typeof DataStore.tables,
    U extends Omit<typeof DataStore.tables[T] extends Map<any, infer I> ? I : never, 'id'>,
    R extends typeof DataStore.tables[T] extends Map<any, infer I> ? I : never,
  >(table: T, data: U): R {
    const record = { ...data, id: ++DataStore.counters[table] };

    //@ts-ignore
    DataStore.tables[table].set(record.id, record);
    //@ts-ignore
    return record;
  }

  static update<
    T extends keyof typeof DataStore.tables,
    U extends Partial<Omit<typeof DataStore.tables[T] extends Map<any, infer I> ? I : never, 'id'>>,
    R extends typeof DataStore.tables[T] extends Map<any, infer I> ? I : never,
  >(table: T, id: number, data: U): R {
    const record = DataStore.tables[table].get(id);
    
    if (record) {
      for (let k of Object.keys(data)) {
        record[k] = data[k] ?? record[k];
      }
      record.id = id;

      //@ts-ignore
      DataStore.tables[table].set(id, record);
    }
    
    //@ts-ignore
    return record;
  }

  static delete<
    T extends keyof typeof DataStore.tables,
    R extends typeof DataStore.tables[T] extends Map<any, infer I> ? I : never,
  >(table: T, id: number): R {
    //@ts-ignore
    const record = DataStore.tables[table].get(id);

    DataStore.tables[table].delete(id);
    //@ts-ignore
    return record;
  }
}

// let a = MockDB.findById('user', 1);
// let b = MockDB.create('user', { email: 'as' });
// let c = MockDB.list('car');
// let d = MockDB.update('user', 3, {name: 'Marta', id: 4});