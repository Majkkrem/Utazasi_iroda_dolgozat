
export interface Travels{
    destination: string;
    description: string;
    imgURL: string;
    price: number;
    discount: number;
}


export interface TravelID extends Travels {
    id: number;
  }



