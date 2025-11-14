export interface coin{
    name: string;
    symbol: string;
    price: number;
    change24h: number;
    marketCap: number;
    volume24h: number;
    image: string;
}

export interface orders{
    user_id: string;
    transaction_id: string;
    from :string;
    to: string;
    amount: number;
    price: number;
    timestamp: number;
    status: string;
}
export interface user{
    id: string;
    name: string;
    email: string;
    balance: number;
}
