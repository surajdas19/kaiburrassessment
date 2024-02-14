export type Products = {
  products?:[{
    id?: number;
    title?: string;
    description?: string;
    price?: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    brand?: string;
    category?: string;
    thumbnail?: string;
    images?: [string];
    isChecked?:boolean
  }],
  limit?:number,
  skip?:number,
  total?:number
};

export type ProductChart = {
    product?:[],
    stock?:[]
};
