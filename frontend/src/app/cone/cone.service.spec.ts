import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ConeService } from './cone.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface CanvasCoordinates {
    _id: string,
    x: number,
    y: number,
    z: number,
}

describe('HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('can test HttpClient.get', () => {
    const testData = {
      _id: '',
      x: 0,
      y: 0,
      z: 0
    }
    httpClient.get('http://localhost:3000/api/v1/canvas')
      .subscribe(data => {
        console.log('data: ', data);
        expect(data).toEqual(testData)
        }
      );
    const req = httpTestingController.expectOne('http://localhost:3000/api/v1/canvas');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});


// describe('ConeService', () => {
//   let service: ConeService;
//   let httpController: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//     });
//     service = TestBed.inject(ConeService);
//     httpController = TestBed.inject(HttpTestingController);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

// 	it('should call getCanvasPositions', () => {
//     let mockCoordinatesArray = {
//       _id: '',
//       x: 0,
//       y: 0,
//       z: 0
//     };

//     service.getCanvasPositions().subscribe(res => {
//       console.log('ressoto: ', res);
//       expect(mockCoordinatesArray).toEqual(res);
//     });

//     const req = httpController.expectOne('http://localhost:3000/api/v1/canvas');
//     expect(req.request.method).toEqual('GET');
//     console.log('req: ', req);

//     req.flush(mockCoordinatesArray);
//     httpController.verify();
//   });

//   afterEach(() => {
//     httpController.verify();
//   });
// });
