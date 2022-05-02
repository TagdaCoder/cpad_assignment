export interface ICommunity {
    readonly communityId: number;
    readonly communityName: string;
    readonly communityAddress: string;
    readonly agentId: number;
    readonly agentDesignation: string;
    //avatar
    //phone
};

export interface IProduct {
    readonly productId: number;
    readonly name: string;
    readonly description: string;
    readonly price: string;
    readonly discountedPrice: string;
    readonly thumbnail: string;
    readonly images: string[];
}
export interface MyProduct {
    readonly item_id: number;
    readonly order_id: number;
    readonly product_id: number;
    readonly attributes: string;
    readonly product_name: string;
    readonly quantity: number;
    readonly images: string[];
    readonly cost: number;
    readonly communityId: number;
    readonly status: string;
}

export interface ICategory {
    readonly categoryId: number;
    readonly name: string;
    readonly description: string;
}

export interface ICustomer {
    readonly id: string;
    readonly email: string;
    readonly phone: string;
    readonly name: string;
    readonly avatar?: string;
    readonly auth_token?: string;
    readonly is_agent?: string;
}

export interface ICommunityList {
    readonly id: number;
}

export interface IPreferences {
    readonly communityId: number,
    readonly communityName: string,
    readonly communityAddess: string,
    readonly languageCode: string
}

export interface IAttributes {

}
export interface ICartItems {
    readonly item_id: number;
    readonly name: string;
    readonly productId: number;
    readonly attributes: {} as IAttributes | null;
    readonly cart_id: string;
    readonly price: string;
    readonly quantity: number;
    readonly subtotal: string;
    readonly thumbnail: string;
}

export interface IAddCart {
    readonly item_id: number;
    readonly name: string;
    readonly productId: number;
    readonly attributes: {} as IAttributes | null;
}

export interface ILocalCartItems {
    readonly name: string;
    readonly productId: number;
    readonly price: string;
    readonly quantity: number;
    readonly thumbnail: string;
}

export interface IOrder {
    readonly cartId: string;
    readonly customerId: string;
    readonly orderId: number;
}

export interface IOrderCompleted {
    readonly item_id: number;
    readonly order_id: number;
    readonly product_id: number;
    readonly attributes: {} as IAttributes | null;
    readonly product_name: string;
    readonly quantity: number;
    readonly unit_cost: string;
    readonly description: string; s
    readonly image: string;
    readonly image_2: string;
    readonly thumbnail: string;
}

export interface ICompletedOrders {
    readonly order_id: number;
    readonly created_on: string;
    readonly product_id: number;
    readonly product_name: string;
    readonly quantity: number;
    readonly unit_cost: string;
    readonly community_id: number;
    readonly status: "ORDER_PLACED" | "PROCESSING" | "SHIPPED" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED";
    readonly thumbnail: string;
    readonly community_name: string;
    readonly agent_id: number;
    readonly agent_name: string;
    readonly agent_phone: string | null;
}