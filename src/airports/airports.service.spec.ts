import { Test, TestingModule } from '@nestjs/testing';
import { AirportsService } from './airports.service';

describe('AirportsService', () => {
  let service: AirportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AirportsService],
    }).compile();

    service = module.get<AirportsService>(AirportsService);
  });

  it('should return a list of airports', () => {
    const airports = service.findAll();
    expect(airports?.length).toBeGreaterThan(0);
  });

  it('should return an airport object', () => {
    const airport = service.find('1');
    expect(airport).toBeTruthy();
    expect(airport.id).toBe(1);
  });

  it('should return null, instead of an airport object', () => {
    const airport = service.find('2');
    expect(airport).toBeNull();
  });
});
