import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';


import { Tab1PageRoutingModule } from './tab1-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { FirebaseService } from '../services/firebase.service';
import { ProdutoService } from '../services/produto.service';
import { CorreiosService } from '../services/correios.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,    
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page],
  providers: [ProdutoService, FirebaseService, CorreiosService]
})
export class Tab1PageModule {}
