export const titles = [
    "id",
    "title",
    "price",
    "option",
    "category",
    "stock",
    "rating",
    "description",
    "created_at",
    "updated_at"
];

export const body = [
    {
        id: 1,
        title: "product1",
        price: 200,
        option: "Option A",
        category: "Electronics",
        stock: 50,
        rating: 4.5,
        description: "High-quality electronic product.",
        created_at: "2025-01-01",
        updated_at: "2025-01-05"
    },
    {
        id: 2,
        title: "product2",
        price: 300,
        option: "Option B",
        category: "Books",
        stock: 30,
        rating: 4.0,
        description: "Bestselling book of the year.",
        created_at: "2024-12-15",
        updated_at: "2025-01-03"
    },
    {
        id: 3,
        title: "product3",
        price: 400,
        option: "Option C",
        category: "Clothing",
        stock: 20,
        rating: 3.5,
        description: "Comfortable and stylish clothing.",
        created_at: "2025-01-02",
        updated_at: "2025-01-06"
    },
    {
        id: 4,
        title: "product4",
        price: 150,
        option: "Option D",
        category: "Accessories",
        stock: 100,
        rating: 4.8,
        description: "Stylish and durable accessories.",
        created_at: "2024-12-25",
        updated_at: "2025-01-10"
    },
    ...Array.from({length: 11}, (_, i) => ({
        id: 5 + i, // ID tăng dần từ 5 trở đi
        title: `product${5 + i}`,
        price: 150 + i * 10, // Giá tăng dần
        option: `Option ${String.fromCharCode(69 + i)}`, // Option từ E trở đi
        category: "Accessories",
        stock: 100 - i * 5, // Số lượng giảm dần
        rating: (4.8 - i * 0.1).toFixed(1), // Rating giảm dần
        description: `Stylish and durable product ${5 + i}.`,
        created_at: `2024-12-${25 + i}`,
        updated_at: `2025-01-${10 + i}`
    }))
];
