export interface Horaire {
    id: number,
    nomJour: string,
    ferme: 1 | null,
    ouverture: string,
    fermeture: string
}