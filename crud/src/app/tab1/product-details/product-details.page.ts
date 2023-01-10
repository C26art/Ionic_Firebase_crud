import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Endereco } from 'src/app/models/endereco.model';
import { Produto } from 'src/app/models/produto.model';
import { CorreiosService } from 'src/app/services/correios.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  contactFormGroup!:FormGroup;
  public produto!:Produto;
  editable:boolean = false;
  @ViewChild('contactFormGroupDirective') contactFormGroupDirective!: FormGroupDirective;


  constructor(private firebaseService: FirebaseService,
    private produtoService: ProdutoService,
    private correiosService: CorreiosService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  this.firebaseService.find(id!).subscribe({
    next: (data: Produto) => {
      if(!data) {
        this.router.navigateByUrl('/tabs/tab2')
      }else {
        this.produto = data;

        this.contactFormGroup = new FormGroup({
          'nome': new FormControl('this.produto.nome', Validators.required),
          'quantidade': new FormControl('this.produto.quantidade', Validators.required),
          'valorCompra': new FormControl('this.produto.valorCompra', Validators.required),
          'porcentagem': new FormControl('this.produto.porcentagem', Validators.required),
          'valorVenda': new FormControl('this.produto.valorVenda', Validators.required),
          'fornecedor': new FormControl('this.produto.fornecedor', Validators.required),
          'razaoSocial': new FormControl('this.produto.razaoSocial', Validators.required),
          'cnpj': new FormControl('this.produto.nome', Validators.required),
          'telefone': new FormControl('this.produto.telefone', Validators.required),
          'endereco': new FormControl('this.produto.endereco', Validators.required),
          'cep': new FormControl('this.produto.cep', Validators.required),
          'logradouro': new FormControl('this.produto.logradouro', Validators.required),
          'bairro': new FormControl('this.produto.bairro', Validators.required),
          'localidade': new FormControl('this.produto.localidade', Validators.required),
          });

          //this.contactFormGroup.valueChanges.subscribe( values => {
           // console.log(values)
          //});
      }
    },
    error: (error) => console.error(`Error on get product data. Error: ${error}`)
  });


}
editProduto(values:any) {
  let updateProduto: Produto = { id: this.produto.id, ...values };
  this.firebaseService.update(updateProduto)
  .then(
    () => this.router.navigateByUrl('/tabs/tab2')
  )
  .catch(
    err => console.error(err)
  )

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
    });
  }

  delete(){

  }
}
