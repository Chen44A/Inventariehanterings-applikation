import React, { useState } from 'react';

const AddItemForm = ({ onAdd }) => {
    const [newItem, setNewItem] = useState({
        name: '',
        description: '',
        quantity: '',
        category: ''
    });

    // 更新输入框的状态
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prev => ({
            ...prev,
            [name]: name === 'quantity' ? Number(value) : value 
        }));
    };

    // 添加新项目的处理函数
    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(newItem);  // 触发添加项目的回调
        setNewItem({ name: '', description: '', quantity: '', category: '' });  // 清空表单
    };

    return (
        <div className="mb-12 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Add New Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name" placeholder="Enter item name"
                        value={newItem.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description" placeholder="Provide details about the item"
                        value={newItem.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                        type="number" min="0"
                        name="quantity" placeholder="Quantity in stock"
                        value={newItem.quantity}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category" placeholder="Product category"
                        value={newItem.category}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition-all">
                    Add Item
                </button>
            </form>
        </div>
    );
};

export default AddItemForm;
