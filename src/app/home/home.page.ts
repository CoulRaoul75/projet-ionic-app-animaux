import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  animals = [
    {
      'title': 'Vache',
      'image': 'img/animals/cow-icon.png',
      'desc': 'Meugle',
      'file': '/sounds/cow.mp3',
      'playing': false
    },
    {
      'title': 'Dauphin',
      'image': 'img/animals/dolphin-icon.png',
      'desc': 'Siffle',
      'file': '/sounds/dolphin.mp3',
      'playing': false
    },
    {
      'title': 'Grenouille',
      'image': 'img/animals/frog-icon.png',
      'desc': 'Coasse',
      'file': '/sounds/frog.mp3',
      'playing': false
    },
    {
      'title': 'Oiseau',
      'image': 'img/animals/bird-icon.png',
      'desc': 'Chante',
      'file': '/sounds/bird.mp3',
      'playing': false
    },
    {
      'title': 'Cochon',
      'image': 'img/animals/pig-icon.png',
      'desc': 'Grogne',
      'file': '/sounds/pig.mp3',
      'playing': false
    },
    {
      'title': 'Chien',
      'image': 'img/animals/puppy-icon.png',
      'desc': 'Aboie',
      'file': '/sounds/dog.mp3',
      'playing': false
    },
    {
      'title': 'Chat',
      'image': 'img/animals/black-cat-icon.png',
      'desc': 'Miaule',
      'file': '/sounds/cat.mp3',
      'playing': false
    },
    {
      'title': 'Cheval',
      'image': 'img/animals/horse-icon.png',
      'desc': 'Hennit',
      'file': '/sounds/horse.wav',
      'playing': false
    },
    {
      'title': 'Ane',
      'image': 'img/animals/donkey-icon.png',
      'desc': 'Brait',
      'file': '/sounds/donkey.wav',
      'playing': false
    }
  ];
  constructor(private toastCtrl: ToastController) { }

  private media = null;
  private currentAnimalIndex: number = null;

  reorderDisabled: boolean = true;


  playSound() {
    // choisir un animal au hasard si aucun n'a été déjà choisi
    if (this.currentAnimalIndex == null) {
      this.currentAnimalIndex = Math.floor(Math.random() * this.animals.length);
    }
    let animal = this.animals[this.currentAnimalIndex];

    // instanciation de l'objet Audio
    this.media = new Audio("/assets" + animal.file);
    // chargement du son
    this.media.load();
    // lecture du son
    this.media.play();
    
  }

  // gestion du click du joueur
  guessAnimal(pos) {
    let message = "";
    if (this.currentAnimalIndex == null) {
      message = "Clique sur play pour deviner l'animal";
    } else if (this.currentAnimalIndex == pos) {
      let animal = this.animals[pos];
      message = `Bien joué ! C'est bien le ${animal.title} qui ${animal.desc}`;

      // réinialisation du jeu
      this.currentAnimalIndex = null;
      this.media = null;

    } else {
      message = "Faux. Essaye encore !";
    }
    //console.log(message);
    this.showToast(message);
  }
  // affichage des messages au format toast
  private showToast(text) {
    this.toastCtrl.create({
      message: text,
      duration: 1000,
      position: "middle"
    }).then((toast) => { toast.present() })

  };

  reorderAnimal(even) {
    // permutation entre les 2 positions - from et to
    let animal = this.animals[even.detail.from];

    // sauvegarde de l'animal à deviner
    let animalToGuess = this.animals[this.currentAnimalIndex];

    // suppression à la position de départ
    this.animals.splice(even.detail.from, 1);
    // insertion à la position d'arrivée
    this.animals.splice(even.detail.to, 0, animal);

    // redéfinir l'index de l'animal à trouver
    this.currentAnimalIndex = this.animals.findIndex(
      (item)=>{ return item.title == animalToGuess.title }
    )

    // finalisation du réagencement 
    even.detail.complete();
  }

}
