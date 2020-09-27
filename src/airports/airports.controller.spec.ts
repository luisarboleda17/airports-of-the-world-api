import { Test, TestingModule } from '@nestjs/testing';
import { AirportsController } from './airports.controller';
import { AirportsService } from './airports.service';
import { NotFoundException } from '@nestjs/common';

describe('AirportsController', () => {
  let controller: AirportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirportsController],
      providers: [AirportsService],
    }).compile();

    controller = module.get<AirportsController>(AirportsController);
  });

  it('should return a list of airports', () => {
    const airports = controller.findAll();
    expect(airports?.data).toBeTruthy();
    expect(airports?.data?.length).toBeGreaterThan(0);
  });

  it('should return an airport object', () => {
    const airport = controller.find('1');
    expect(airport?.data).toBeTruthy();
    expect(airport?.data?.id).toBe(1);
  });

  it('should not found the airport, then throw a not found exceptrion', () => {
    expect(() => controller.find('2')).toThrow(NotFoundException);
  });
});
