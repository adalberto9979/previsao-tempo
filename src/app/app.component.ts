import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { Cidade } from './app.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit {
   cidades: Cidade[] = [];
   constructor(private http: HttpClient) {
   }

   ngOnInit() {
      this.doGet<Cidade[]>('SP').subscribe(response => {
        this.cidades = response;
      });
   }

   doGet<T>(estado: string): Observable<T> {
      let apiToken = "84217b124d9b23d1acf3f0ac75bbe18d";
      
      let params = new HttpParams({fromObject: {
         Headers: 'Access-Control-Allow-Origin, http://localhost:4200'
       }});

      return this.http.get<T>(`http://apiadvisor.climatempo.com.br/api/v1/locale/city?province=${estado}&token=${apiToken}/`, { params })
      .pipe(timeout(5000));
   }   

  // 84217b124d9b23d1acf3f0ac75bbe18d token clima tempo
  /*
    /api/v1/locale/city?name=CityName&state=StateAbbr&country=BR&token=your-app-token
    curl -i "http://apiadvisor.climatempo.com.br/api/v1/locale/city?name=São Paulo&state=SP&token=your-app-token"
    curl -i "http://apiadvisor.climatempo.com.br/api/v1/locale/city?state=SP&name=são&token=your-app-token"
    curl -i "http://apiadvisor.climatempo.com.br/api/v1/locale/city?province=SP&token=your-app-token"
    curl -i "http://apiadvisor.climatempo.com.br/api/v1/locale/city?country=BR&token=your-app-token"    
    [
      {
          id: 3477,
          name: "São Paulo",
          state: "SP",
          country: "BR  "
      },
      ...
    ]

    /api/v1/climate/temperature/locale/:id?token=your-app-token
    curl -v -L "http://apiadvisor.climatempo.com.br/api/v1/climate/temperature/locale/3477?token=your-app-token"
    {
     "id": 3477,
     "name": "São Paulo",
     "state": "SP",
     "country": "BR",
     "data": [
     {
          "date": "2019-09",
          "climate_temperature": {
              "last_year": {
                  "min": 15,
                  "max": 26
               },
               "normal": {
                  "min": 14,
                  "max": 24
               },
               "forecast": {
                  "min": 17,
                  "max": 27
               }
          },
      },
      {
          "date": "2019-10",
          "climate_temperature": {
              "last_year": {
                  "min": 17,
                  "max": 25
               },
               "normal": {
                  "min": 15,
                  "max": 25
               },
               "forecast": {
                  "min": 17,
                  "max": 27
               }
          },
      }
      ...
      ]
    }
  */
}
