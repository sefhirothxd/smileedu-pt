import { Component } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { NgFor } from '@angular/common';

interface Alumno {
  nom_persona: string;
  ape_pate_pers: string;
  ape_mate_pers: string;
  fechaNacimiento: string;
  foto_ruta: string;
  fecha_naci: string;
  fecha_full: string;
  nid_grado: number;
  nid_persona: number;
}

@Component({
  selector: 'app-card-estudiante',
  standalone: true,
  imports: [NgFor],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  public alumnos:Alumno[] = [];



  constructor(private readonly http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://smileedu-backend-production.up.railway.app/api/alumnos')
      .subscribe((response: any) => {

        //restructure array object
        this.alumnos = response;
        this.addAge(this.alumnos);
        // console.log(response);
      });
  }

  deleteAlumno(id: number):void {
    this.http.delete(`https://smileedu-backend-production.up.railway.app/api/alumnos/${id}`)
    .subscribe((respuesta:any) => {
      console.log(respuesta);
      this.refreshAlumnos();
    });
  }


  refreshAlumnos(): void {
    this.http.get('https://smileedu-backend-production.up.railway.app/api/alumnos')
      .subscribe((response: any) => {
        this.alumnos = response;
        this.addAge(this.alumnos);
      });
  }

  addAge(valor: any){
    for (let i = 0; i < valor.length; i++) {
      let dateStudent = valor[i].fecha_naci;
      const today = new Date();
      const birthDate = new Date(dateStudent);
      let age = today.getFullYear() - birthDate.getFullYear();
      let month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        month += 12;
        age--;
      }
      const yearAlumno = age.toString();
      const alumnoMonth = month.toString();
      const alumnoFullAge = yearAlumno + ' año(s)  y ' + alumnoMonth + ' mes(es)';
      valor[i].fecha_full = alumnoFullAge;

    }
  }

}
