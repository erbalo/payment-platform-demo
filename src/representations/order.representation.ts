export interface OrderRepresentation {
    id: number;
    items: OrderItemRepresentation[];
}

export interface OrderItemRepresentation {
    id: number;
    quantity: number;
    price: number;
}
