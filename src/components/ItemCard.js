import React, { useState } from "react";

function ItemCard({ item, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);  // 编辑模式状态
    const [editedItem, setEditedItem] = useState({ ...item });  // 用于存储编辑中的项目

    const handleEditChange = (e) => {
        const { name, value } = e.target;

        // 如果字段名是 quantity，确保将值转换为数字
        const updatedValue = name === 'quantity' ? Number(value) : value;
        setEditedItem({ ...editedItem, [name]: updatedValue });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            // 提交编辑内容
            await onEdit(editedItem);
            // 成功更新后退出编辑模式
            setIsEditing(false);
        } catch (error) {
            // 处理返回的错误信息
            if (error) {
                // 保持在编辑状态，前端不会退出编辑模式
                return;
            }
        }
       
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 transition-all hover:shadow-xl hover:-translate-y-1">
            {isEditing ? (
                <form onSubmit={handleEditSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-500">Name</label>
                        <input
                            className="border border-gray-300 rounded-md p-2 w-full"
                            name="name"
                            value={editedItem.name}
                            onChange={handleEditChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-gray-700">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-500">Quantity</label>
                            <input
                                className="border border-gray-300 rounded-md p-2"
                                name="quantity"
                                value={editedItem.quantity}
                                onChange={handleEditChange}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-500">Category</label>
                            <input
                                className="border border-gray-300 rounded-md p-2"
                                name="category"
                                value={editedItem.category}
                                onChange={handleEditChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-500">Description</label>
                        <textarea
                            className="border border-gray-300 rounded-md p-2 w-full"
                            name="description"
                            value={editedItem.description}
                            onChange={handleEditChange}
                        />
                    </div>
                    <div className="text-right">
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition-all mr-4">
                            Save
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 transition-all"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h2>
                        <div className="grid grid-cols-2 gap-4 text-gray-700">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-500">ID</span>
                                <span>{item.id}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-500">Quantity</span>
                                <span>{item.quantity}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-500">Category</span>
                                <span>{item.category}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <span className="text-sm font-medium text-gray-500">Description</span>
                        <p className="text-gray-700 mt-1">{item.description}</p>
                    </div>
                    <div className="text-right">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-all mr-4"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </button>
                        <button onClick={() => onDelete(item.id)} className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition-all">
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ItemCard;
