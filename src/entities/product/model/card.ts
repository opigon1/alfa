export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    liked?: boolean;
    favorite?: boolean;
}

export interface IProductResponse {
    products: IProduct[];
}

export interface IProductState {
    products: IProduct[];
    isLoading: boolean;
    error: string;
}

export interface ICardActions {
    onCardClick?: (id: number) => void;
    onLike?: (id: number) => void;
    onDelete?: (id: number) => void;
    onFavorite?: (id: number) => void;
}

export interface ICardState {
    isLiked: boolean;
    isFavorite: boolean;
}

export interface ICardProps extends Pick<IProduct, 'id' | 'title' | 'thumbnail' | 'rating'>, ICardActions, ICardState {}

export const transformProductToCard = (product: IProduct): Omit<ICardProps, 'onCardClick' | 'onLike' | 'onDelete'> => ({
    id: product.id,
    title: product.title,
    thumbnail: product.thumbnail,
    isLiked: product.liked || false,
    isFavorite: product.favorite || false,
    rating: product.rating
});