import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let adminToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();

    // Login as admin and get JWT token
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'adminpass' });
    adminToken = loginResponse.body.access_token;
  });

  it('/admin/users/dealers (GET) - should return dealers', async () => {
    const response = await request(app.getHttpServer())
      .get('/admin/users/dealers')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/admin/users/dealers/:id/status (PATCH) - should update dealer status', async () => {
    // Assume you have at least one dealer ID from previous GET or seeded data
    const dealersResponse = await request(app.getHttpServer())
      .get('/admin/users/dealers')
      .set('Authorization', `Bearer ${adminToken}`);
    const dealerId = dealersResponse.body[0]?.id;

    if (dealerId) {
      await request(app.getHttpServer())
        .patch(`/admin/users/dealers/${dealerId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ isActive: false })
        .expect(200);
    }
  });

  afterAll(async () => {
    await app.close();
  });
});
