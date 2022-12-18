import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Produto } from '../models/produto.model';
import { CorreiosService } from '../services/correios.service';
import { FirebaseService } from '../services/firebase.service';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  produtoList!: Produto[];
  searchFG!: FormGroup;

  @ViewChild('searchFGD') searchFGD!: FormGroupDirective;

  constructor(private toastController: ToastController,
    private firebaseService: FirebaseService,
    private produtoService: ProdutoService,
    private correiosService: CorreiosService,
    private router: Router,
    ) {}

  ngOnInit(): void {
      this.searchFG = new FormGroup({
        'nome': new FormControl('', Validators.required)
      });
  }

  search(produto:any) {
    this.firebaseService.findByName(produto.nome).subscribe({
      next: (result) => {
        if(!result) {
          this.presentToast(`Contact not found: ${produto.nome}`);
        }
        
        this.produtoList = result as Produto[];
      },
      error: (err) => {
        console.log(err);
        this.presentToast(`Service unavailable`);
      }
    });
    this.searchFG.reset();
        
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500,
      position: 'middle'
  });
    await toast.present();
  }
}

