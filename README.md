# MAUREL_NODEJS
Projet de NodeJS réalisé dans le cadre de la LP DWBD

<h1> Besoins pour lancer l'application </h1>

<p>Afin de lancer l'application vous avez besoin : </p>
<ul>
  <li> D'une base de donnée POSTGRES ou de DOCKER </li>
  <li> D'un accès au port 3000 sur localhost </li>
</ul>

<h1> Configuration des variables d'environnement </h1>
<p>Pour pouvoir faire tourner le projet, certains paramètres doivent être initialisés afin de s'adapter à votre environnement.
Pour cela, editez le fichier .env à la racine du projet : configurez :</p>
<ul>
  <li> L'adresse gmail pour le service d'envoi de mail (MAIL_USER)</li>
  <li> Le mot de passe de cette adresse mail (PASSWORD_MAIL_USER) </li>
  <li> Le nom d'hôte de la base de donnée (POSTGRES_HOST) : Par défaut, il s'agit de 192.168.99.100 : l'adresse ip de la docker-machine que l'on utilise pour faire tourner notre POSTGRES avec docker </li>
  <li> Le port de la BD (POSTGRES_PORT) : par défaut, 5432 en utilisant docker </li>
  <li> Le nom d'utilisateur pour se connecter à la BD (POSTGRES_USER) : par défaut : hapi en utilisant docker </li>
  <li> Le mot de passe pour la connexion à la BD (POSTGRES_PASSWORD) : par défaut, hapi pour docker </li>
  <li> Le nom de la base de donnée (POSTGRES_DATABASE) : par défaut unilim pour docker </li>
</ul>

<h1> Lancement du projet </h1>
<p> Afin de lancer l'application, veuillez suivre les instructions suivantes : </p>
<ul>
  <li> Commencez par récupérer les node_modules en lancant la commande : npm install </li>
  <li> Si vous souhaitez utilisé une base de donnée déja configurez, lancez votre docker et exécutez la commande suivante : 
    docker-compose -f stack.yml up . Cela va vous lancez une base de donnée accessible au port 5432 par l'utilisateur hapi (mdp : hapi) avec une base de donnée unilim, sur l'hôte correspondant à l'adresse IP de votre docker-machine </li>
  <li> Enfin, pour lancez le projet, passez votre terminal en mode administrateur et lancez la commande : npm start à la racine du projet. </li>
</ul>
