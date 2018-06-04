import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController} from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Observable } from 'rxjs'
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  itemsRef: AngularFireList<any>
  items: Observable<any[]>
  
  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    db: AngularFireDatabase) {
    this.itemsRef = db.list('/items')
    this.items = this.itemsRef.valueChanges()
  }

  addItem() {
    let prompt = this.alertCtrl.create({
      title: 'Todo',
      message: 'What do you need to do?',
      inputs: [
        {
          name: 'Todo',
          placeholder: 'Todo'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked')
          }
        },
        {
          text: 'Save',
          handler: data => {
            const newItemRef = this.itemsRef.push({})

            newItemRef.set({
              id: newItemRef.key,
              name: data.Todo
            })
          }
        }
      ]
    })
    prompt.present()
  }

  showOptions(itemId, itemName) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Delete or Update?',
      buttons: [
        {
          text: 'Delete Item',
          handler: () => {
            this.removeItem(itemId)
          }
        },
        {
          text: 'Update Item',
          handler: () => {
            this.updateItem(itemId, itemName)
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked')
          }
        }
      ]
    })
    actionSheet.present()
  }

  removeItem(itemId: string) {
    this.itemsRef.remove(itemId)
  }

  updateItem(itemId, itemName){
    let prompt = this.alertCtrl.create({
      title: 'Item Name',
      message: 'Update item',
      inputs: [
        {
          name: 'todo',
          placeholder: 'todo',
          value: itemName
        },
      ],
      buttons: [
        {
          text: 'Cancel', 
          handler: data => {
            console.log('Cancel clicked')
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.itemsRef.update(itemId, {
              name: data.name
            })
          }
        }
      ]
    })
    prompt.present()
  }

}
