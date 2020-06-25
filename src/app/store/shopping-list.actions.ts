export class ShoppingItemFound {
    static readonly type = '[Shopping List] Item found';
    constructor(public label: string) {}
}

export class ShoppingItemBackToNeeded {
    static readonly type = '[Shopping List] Item back to needed';
    constructor(public label: string) {}
}

export class AddShoppingItem {
    static readonly type = '[Shopping List] Add item';
    constructor(public label: string) {}
}

export class RemoveShoppingItem {
    static readonly type = '[Shopping List] Remove item';
    constructor(public label: string) {}
}

export class ClearShoppingList {
    static readonly type = '[Shopping List] Clear';
}
