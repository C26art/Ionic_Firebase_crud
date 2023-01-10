import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model';
import { CorreiosService } from '../services/correios.service';
import { FirebaseService } from '../services/firebase.service';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  produtos!: Observable<Produto[]>;

  @Input() produto!: Produto;

  constructor(private firebaseService: FirebaseService,
    private router: Router, private produtoService: ProdutoService,
    private correiosService: CorreiosService,) {
    this.produtos = this.firebaseService.list();
  }

  newProduto() {
    this.router.navigateByUrl('/tabs/tab1')
  }

  editProduto(id:string) {
    this.router.navigateByUrl(`/tabs/details/${id}`);
  }

  

}
