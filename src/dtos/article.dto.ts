export class articleDto {
    // ici on specifie les informations a inserer dans la base de donnee

    title: string;
    body: string; // "body" au lieu de "corps" car c'est declarer "body" cote nest et "corps" cote db
    // ces infos seront recu au format JSON
}