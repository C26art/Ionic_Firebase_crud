import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';


import { Tab3PageRoutingModule } from './tab3-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CorreiosService } from '../services/correios.service';
import { FirebaseService } from '../services/firebase.service';
import { ProdutoService } from '../services/produto.service';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,    
    Tab3PageRoutingModule
  ],
  declarations: [Tab3Page],
  providers:[FirebaseService, ProdutoService, CorreiosService]
  
})
export class Tab3PageModule {}
