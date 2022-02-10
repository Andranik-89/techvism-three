import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

export interface CanvasCoordinates {
  x: number,
  y: number,
  z: number,
}

interface CanvasResponse {
  canvas: {
    _id: string,
    x: number,
    y: number,
    z: number,
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConeService {

  constructor(public http: HttpClient) { }

  public saveCanvasPositions(canvasObj: CanvasCoordinates) {
    return this.http.post(`${environment.api}/canvas`, canvasObj);
  }

  public getCanvasPositions() {
    return this.http.get<CanvasResponse>(`${environment.api}/canvas`)
      .pipe(
        tap(data => console.log(data)),
        map(data => data.canvas)
      );
  }
}
