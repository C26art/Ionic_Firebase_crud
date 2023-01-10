import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailsPageRoutingModule } from './product-details-routing.module';

import { ProductDetailsPage } from './product-details.page';
import { HttpClientModule } from '@angular/common/http';
import { CorreiosService } from 'src/app/services/correios.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ProdutoService } from 'src/app/services/produto.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule,
    ProductDetailsPageRoutingModule
  ],
  declarations: [ProductDetailsPage],
  providers: [ProdutoService, FirebaseService, CorreiosService]
})
export class ProductDetailsPageModule {}
