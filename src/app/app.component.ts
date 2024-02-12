import { Component, ViewChild,Input, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FormularioEstudianteComponent } from './formulario/formulario.component';
import { HttpClientModule  } from '@angular/common/http';
import { CardComponent } from './card/card.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent,CardComponent, FormularioEstudianteComponent,HttpClientModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'pt-smiledu';

  @ViewChild(CardComponent)
  public child!: CardComponent;

  public activar():void{
    this.child.refreshAlumnos();
  }

mostrarModal():void {
  const modal = document.getElementById('modalForm');
  modal?.classList.remove('hidden');

}

}
