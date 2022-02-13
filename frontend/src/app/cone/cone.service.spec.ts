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

describe('ConeService', () => {
  let service: ConeService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConeService],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(ConeService);
    httpController = TestBed.inject(HttpTestingController);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

	it('should properly call getCanvasPositions', () => {
    let defaultCoordinatesArray = {
      _id: '',
      x: 0,
      y: 0,
      z: 0
    };
    let mockResponse = {
      canvas: {
        _id: '',
        x: 0,
        y: 0,
        z: 0
      }
    }

    // shall map mockResponse into defaultCoordintesArray
    service.getCanvasPositions().subscribe(res => {
      expect(res).toEqual(defaultCoordinatesArray);
    });

    const req = httpController.expectOne('http://localhost:3000/api/v1/canvas');
    // a test for method, cancel and response type
    expect(req.request.method).toEqual('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(mockResponse);
    httpController.verify();
  });

	it('should properly call saveCanvasPositions', () => {
    const canvasCoordinates = {
      x: 0,
      y: 0,
      z: 0,
    }

    // shall map canvasCoordinates into canvasCoordinates
    service.saveCanvasPositions(canvasCoordinates).subscribe(res => {
      expect(res).toEqual(canvasCoordinates);
    });

    const req = httpController.expectOne('http://localhost:3000/api/v1/canvas');
    // a test for method, cancel and response type
    expect(req.request.method).toEqual('POST');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(canvasCoordinates);
    httpController.verify();
  });

  afterEach(() => {
    httpController.verify();
  });
});

// describe('HttpClient testing', () => {
//   let httpClient: HttpClient;
//   let httpTestingController: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [ HttpClientTestingModule ]
//     });
//     httpClient = TestBed.inject(HttpClient);
//     httpTestingController = TestBed.inject(HttpTestingController);
//   });

//   it('can test HttpClient.get', () => {
//     const testData = {
//       _id: '',
//       x: 0,
//       y: 0,
//       z: 0
//     }
//     httpClient.get('http://localhost:3000/api/v1/canvas')
//       .subscribe(data => {
//         console.log('data: ', data);
//         expect(data).toEqual(testData)
//         }
//       );
//     const req = httpTestingController.expectOne('http://localhost:3000/api/v1/canvas');
//     expect(req.request.method).toEqual('GET');
//     req.flush(testData);
//     httpTestingController.verify();
//   });

//   afterEach(() => {
//     httpTestingController.verify();
//   });
// });
