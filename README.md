# Simplon-Netflix

# Setup

```
1. git clone git@github.com:OrhanMA/Simplon-Netflix.git
2. cd Simplon-Netflix
2. npm install // pour installer les dépendences
4. npx parcel src/index.html
```

<br><br/>

## `Deux solutions pour ajouter votre clé API:`

### 1. `MÉTHODE 1 (rapide): Attention! Clé non cachée en cas de push`:

Dans le script.ts:

- supprimer les lignes 1 et 2.
- dans la déclaration de la fonction loglist et remplace le '${process.env.API_KEY}' par ta clé.

  <br><br/>

### 2. `MÉTHODE 2: Safe pour le push en remote`:

- Créer un fichier .env

```
touch .env
```

- Puis dans le fichier .env:

```
API_KEY=<votre clé API>
```

exemple: API_KEY=2345235332f3129413

### `Ne pas oublier de sauvegarder le fichier .env et le script.ts et puis relancer le server localhost!`

<br><br/>

# Note personelle:

Pour ce projet, j'ai utilisé le framework css Tailwind pour me faire la main dessuss.

<br><br/>

# Contexte

Votre agence participe à un appel d’offre pour réaliser une platform de streaming, pour cela elle souhaite réaliser un MVP (produit minimum viable) à présenter aux futurs clients. Au vu de vos dernières réalisations le responsable technique du projet souhaité vous confier cette tâche.

<br><br/>

# Contraintres techniques

Ce projet servira de support de démonstration, vous êtes libres dans le design du site mais le plus important reste les fonctionnalités ! Libre à vous de vous inspirer de Netflix (maquettes en ressources) et des autres sites de streaming.

Néanmoins vous devrez satisfaire les contraintes techniques et fonctionnelles fournies par l’agence dans le cahier des charges.

Le responsable technique à défini la stack technique du projet : HTML - SCSS - JS / TS. Vous êtes libre d’utiliser Bootstrap ou un autre framework css pour vous faciliter la tâche.
​

Pour la réalisation du projet vous utiliserez l’API de The Movie DB, les instructions à suivre pour vous créer un compte et obtenir une clé d’authentification se trouvent dans le cahier des charges.
<br><br/>

# Déroulé :

- Temps #1 collectivement - découverte du cahier des charges
- Temps #2 collectivement - remédiation, récapitulatif du brief et stratégie de développement
- Temps #3 individuel - réalisation
- Vous avez 9 jours pour réaliser le projet
  <br><br/>

# Livrables :

- Maquettes du projet
- Trello à jour (si utilisé)
- Un dépôt Git contenant le projet au complet
- Un rendu Simplonline avec un lien vers le dépôt Git + maquettes + Trello
  <br><br/>

# Critères de performance:

- Le site respecte le cahier des charges
- Les fonctionnalités attendues ne produisent pas d’erreurs
- Le site est responsive est s’adapte à un maximum d’écran
- Les fichiers sont découpés de manière pertinentes et les assets sont organisés
- Les / les page(s) est/sont fonctionnelle(s)
- Respect des bonnes pratiques de nommages / indentation / sémantique
