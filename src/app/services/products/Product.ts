

export interface Product {

  category:string;
  id: string;
  name:string
  description:string
  imageUrl: string;
  price:number
  quantity:number
  averageRating: number
}

export interface ProductResponse {
  error: boolean;
  timestamp: string;
  items: Product[];
}
