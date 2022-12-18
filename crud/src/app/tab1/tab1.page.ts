import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Produto } from '../models/produto.model';
import { FirebaseService } from '../services/firebase.service';
import { ProdutoService } from '../services/produto.service';
import { CorreiosService } from '../services/correios.service';
import { Endereco } from '../models/endereco.model';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  contactFormGroup!:FormGroup;
  produto!:Produto;
  editable:boolean = false;
  @ViewChild('contactFormGroupDirective') contactFormGroupDirective!: FormGroupDirective;
  

  constructor(private firebaseService: FirebaseService,
    private produtoService: ProdutoService,
    private correiosService: CorreiosService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
  this.contactFormGroup = new FormGroup({
  'nome': new FormControl('', Validators.required),
  'quantidade': new FormControl('', Validators.required),
  'valorCompra': new FormControl('', Validators.required),
  'porcentagem': new FormControl('', Validators.required),
  'valorVenda': new FormControl('', Validators.required),
  'fornecedor': new FormControl('', Validators.required),  
  'razaoSocial': new FormControl('', Validators.required),
  'cnpj': new FormControl('', Validators.required),
  'telefone': new FormControl('', Validators.required),
  'endereco': new FormControl('', Validators.required),
  'cep': new FormControl('', Validators.required),
  'logradouro': new FormControl('', Validators.required),   
  'bairro': new FormControl('', Validators.required),
  'localidade': new FormControl('', Validators.required),
  });

  this.route.paramMap.subscribe(params => {
    const productId = +params.get('id')!;

    if(productId) {
      this.produtoService.findProduto(productId).subscribe({
        next: (produtoDB: Produto) => {
          this.produto = produtoDB;
          this.editable = true;
          this.loadForm();
        },
        error: (err) => console.log(err)
      });
    }
  });
}
 

createProduto(values:any) {
  let newProduto: Produto = {...values};
  this.firebaseService.save(newProduto);      
  this.contactFormGroupDirective.reset();
}

loadForm() {
  this.contactFormGroup.patchValue({
    nome: this.produto.nome,
    quantidade: this.produto.quantidade,
    calorCompra: this.produto.valorCompra,
    porcentagem: this.produto.porcentagem,
    valorVenda: this.produto.valorVenda,
    fornecedor: this.produto.fornecedor,
    razaoSocial: this.produto.razaoSocial,
    cnpj: this.produto.cnpj,
    telefone: this.produto.telefone,    
    cep: this.produto.cep,
    logradouro: this.produto.logradouro,
    bairro: this.produto.bairro,
    localidade: this.produto.localidade,    
  });
}

loadEndereco() {
  const cep:string = this.contactFormGroup.get('cep')?.value;
  this.correiosService.getEndereco(cep).subscribe({
    next: (result:Endereco) => {
      this.contactFormGroup.patchValue({
        cep: result.cep,
        logradouro: result.logradouro,
        bairro: result.bairro,
        localidade: result.localidade,        
      });
    },
    error: (err) => {
      console.error(err)
    }
  });
}

calc(): void {
  let valorCompra = this.contactFormGroup.get('valorCompra')?.value;
  let porcentagem = this.contactFormGroup.get('porcentagem')?.value;

  let calcVenda = valorCompra + (valorCompra * (porcentagem / 100));

  this.contactFormGroup.patchValue({
    valorVenda: calcVenda
    })
  }
}
