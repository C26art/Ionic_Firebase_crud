import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docSnapshots, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(private firestore: Firestore) { }

  save(produto: Produto): Promise<void> {
    const document = doc (collection(this.firestore, 'produtos'));
    return setDoc(document, produto);
  }

  list(): Observable<Produto[]> {
    const produtosCollection = collection(this.firestore, 'produtos');
    return collectionData(produtosCollection, {idField: 'id'}).pipe(
      map(result => result as Produto[])
    );
  }

  find(id: string): Observable<Produto> {
    const document = doc(this.firestore, `produtos/${id}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Produto;
      })
    );
  }

  findByName(nome: string): Observable<Produto[]> {
    const produtoList = this.list();
    return produtoList.pipe(
      map(
        produtos => produtos.filter(produto => {
          const fullName = produto.nome.concat("", produto.fornecedor);
          return fullName.toLowerCase().match(nome.toLowerCase());
        })
    ));
  }

  update(produto: Produto): Promise<void> {
    const document = doc(this.firestore, 'produtos', produto?.id);
    const {id, ...data } = produto;
    return setDoc(document, data);
  }

  delete(id:string): Promise<void> {
    const document = doc(this.firestore, 'produtos', id);
    return deleteDoc(document);
  }
}

