import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User, UserRole } from './users.entity';

const mockUserRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  count: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useFactory: mockUserRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should find all dealers', async () => {
    const dealers = [{ id: '1', role: UserRole.DEALER }];
    jest.spyOn(repo, 'find').mockResolvedValue(dealers as any);
    expect(await service.findAllDealers()).toEqual(dealers);
  });

  it('should find user by email', async () => {
    const user = { id: '1', email: 'test@test.com' } as User;
    jest.spyOn(repo, 'findOne').mockResolvedValue(user);
    expect(await service.findByEmail('test@test.com')).toEqual(user);
  });

  it('should set dealer status', async () => {
    const user = { id: '1', role: UserRole.DEALER, isActive: true } as User;
    jest.spyOn(repo, 'findOne').mockResolvedValue(user);
    jest.spyOn(repo, 'save').mockImplementation((u) => Promise.resolve(u));

    const updated = await service.setDealerStatus('1', false);
    expect(updated.isActive).toBe(false);
  });

  it('should throw if dealer not found in setDealerStatus', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValue(null);
    await expect(service.setDealerStatus('nonexistent', false)).rejects.toThrow();
  });
});
