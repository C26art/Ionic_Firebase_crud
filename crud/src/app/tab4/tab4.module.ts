import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
import { HttpClientModule } from '@angular/common/http';
import { CorreiosService } from '../services/correios.service';
import { FirebaseService } from '../services/firebase.service';
import { ProdutoService } from '../services/produto.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    Tab4PageRoutingModule
  ],
  declarations: [Tab4Page],
  providers: [ProdutoService, FirebaseService, CorreiosService]           
})
export class Tab4PageModule {}
