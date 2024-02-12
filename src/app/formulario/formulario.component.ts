import { Component,EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormGroup,FormControl,ReactiveFormsModule   } from '@angular/forms';
import { HttpClient  } from '@angular/common/http';
import { CardComponent } from '../card/card.component';



@Component({
  selector: 'app-formulario-estudiante',
  templateUrl: './formulario.component.html',
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,ReactiveFormsModule ,CardComponent],
  standalone:true,
  styleUrls: ['./formulario.component.css']
})
export class FormularioEstudianteComponent {



  constructor(private http: HttpClient) { }

 public getAge:string = '';
 public getMonth:string = '';
 public fullAge:string = '';

@Output()
public onNewStudent: EventEmitter <any> = new EventEmitter();


 formulario = new FormGroup({
  nombre: new FormControl(''),
  apellidoPaterno: new FormControl(''),
  apellidoMaterno: new FormControl(''),
  grados: new FormControl(''),
  fechaNacimiento: new FormControl(''),
  foto: new FormControl(''),
 })




 getDatosFormulario():void {
  const nom_persona = this.formulario.get('nombre')?.value;
  const ape_pate_pers  = this.formulario.get('apellidoPaterno')?.value;
  const ape_mate_pers = this.formulario.get('apellidoMaterno')?.value;
  const nid_grado = Number(this.formulario.get('grados')?.value);
  const fecha_naci = this.formulario.get('fechaNacimiento')?.value;
  const foto_ruta = this.formulario.get('foto')?.value || 'https://randomuser.me/api/portraits/men/31.jpg';

  const persona = {
     nom_persona,
     ape_pate_pers,
     ape_mate_pers,
    nid_grado,
     fecha_naci,
     foto_ruta
  }

  console.log(persona);

  this.http.post('https://smileedu-backend-production.up.railway.app/api/alumnos', persona)
  .subscribe((respuesta:any) => {
    console.log(respuesta);
  });

  this.formulario.reset();
  this.onNewStudent.emit();
  const modal = document.getElementById('modalForm');
  modal?.classList.add('hidden');
}


  addAge(valor: any){
    const dateStudent = valor.target.value;
    const today = new Date();
    const birthDate = new Date(dateStudent);
    let age = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      month += 12;
      age--;
    }
    this.getAge = age.toString();
    this.getMonth =   month.toString();
    this.fullAge = this.getAge + ' año(s)  y ' + this.getMonth + ' mes(es)';

    const input = document.getElementById('Age');

    input?.setAttribute('value', this.fullAge);

  }


  filterDates = (d: Date | null): boolean => {
    const today = new Date();
    if (d === null) {
      return false;
    }
    return d <= today;
  }

}
