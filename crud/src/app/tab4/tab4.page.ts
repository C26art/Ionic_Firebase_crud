import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Produto } from '../models/produto.model';
import { CorreiosService } from '../services/correios.service';
import { FirebaseService } from '../services/firebase.service';
import { ProdutoService } from '../services/produto.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  editcontactFormGroup!:FormGroup;
  produto!:Produto;
  editable:boolean = false;
  produtoID!: string;
  @ViewChild('editcontactFormGroupDirective') editcontactFormGroupDirective!: FormGroupDirective;


  constructor(private firebaseService: FirebaseService,
    private produtoService: ProdutoService,
    private correiosService: CorreiosService,
    private router: Router,
    private route: ActivatedRoute,
    private toastCtrl: ToastController
    ) {}

  ngOnInit(): void {
  this.editcontactFormGroup = new FormGroup({
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
}
  ionViewWillEnter() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.produtoID = id;
      this.firebaseService.find(id).subscribe(
        (produtoDB: Produto) => {
          //this.loadForm(produtoDB);
        }
      );
    }
  }

editProduto() {
  const produtoEditado = this.editcontactFormGroup.getRawValue() as Produto;
  produtoEditado.id = this.produtoID;

  this.firebaseService.update(produtoEditado).then(() => {
    this.router.navigateByUrl('/');
    this.showToast('Product updated');
  }, err => {
    this.showToast('There was a problem updating your product :(');
    });
  }
  showToast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
}




