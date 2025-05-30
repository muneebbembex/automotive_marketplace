import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('VehicleListingsController (e2e)', () => {
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

  it('/admin/listings/pending (GET) - should return pending listings', async () => {
    const response = await request(app.getHttpServer())
      .get('/admin/listings/pending')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/admin/listings/:id/status (PATCH) - should update listing status', async () => {
    // Get some pending listing ID from previous response or seeded data
    const listingsResponse = await request(app.getHttpServer())
      .get('/admin/listings/pending')
      .set('Authorization', `Bearer ${adminToken}`);
    const listingId = listingsResponse.body[0]?.id;

    if (listingId) {
      await request(app.getHttpServer())
        .patch(`/admin/listings/${listingId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ status: 'approved' })
        .expect(200);
    }
  });

  afterAll(async () => {
    await app.close();
  });
});
