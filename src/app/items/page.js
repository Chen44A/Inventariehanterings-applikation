"use client";

import React, { useState, useEffect} from "react";
import ItemCard from "@/components/ItemCard";
import AddItemForm from "@/components/AddItemForm";



export default function itemList() {
    const [items, setItems] = useState([]);


    useEffect(() => {
        const fetchItems = async () => {
            const items = await fetch("http://localhost:3001/api/items")
                .then(response => response.json())
                .catch((error) => {
                    console.log("failed to get items", error);
                });
            setItems(items);  // 设置获取到的 items 数据
        };

        fetchItems();  // 页面加载时获取数据
    }, []);  // 空依赖数组意味着只在初次渲染时执行
    
    // Edit function
    const handleEdit = async (updatedItem) => {
        const _token = localStorage.getItem("@token");

        if (!_token) {
            console.error("No token found.");
            alert("Please log in to edit.")
            return;
        }
        
        try {
            //  console.log('updated item:', updatedItem);  
            const response = await fetch(`http://localhost:3001/api/items/${updatedItem.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });


            if (!response.ok) {
                // 将错误抛出，以便前端捕获
                const errorData = await response.json();
                const errorMessage = errorData.message || `Failed to update item: ${response.status}`;
                // alert("Please log in to edit.")
                throw new Error(errorMessage);
            }

            const updatedItems = await fetch("http://localhost:3001/api/items")
                .then(response => response.json())
                .catch((error) => {
                    console.log("failed to get items", error);
                });

            setItems(updatedItems);
        } catch (error) {
            console.log("Error updating item", error);
            throw error;  // 
        }
    };

    // funktion for delete items
    const handleDelete = async (id) => {
        const _token = localStorage.getItem("@token");

        if(!_token) {
            console.error("No token found.");
            alert("Please log in to delete.")
            return;
        }

        try {
            // 发送带有 JWT 的 DELETE 请求
            const response = await fetch(`http://localhost:3001/api/items/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${_token}`,  // JWT 附加到 Authorization 头中
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                // alert("Please log in to delete.")
                throw new Error(`Failed to delete item: ${response.status}`);
            }

            // 删除成功后，重新获取数据
            const updatedItems = await fetch("http://localhost:3001/api/items")
                .then(response => response.json())
                .catch((error) => {
                    console.log("failed to get items", error);
                });

            setItems(updatedItems);  // 更新状态
        } catch (error) {
            console.log("Error deleting item", error);
        }
    };

    // funktion for add items
    const handleAdd = async (newItem) => {
        const _token = localStorage.getItem("@token");

        if (!_token) {
            console.error("No token found.");
            alert("Please log in to add item!")
            return;
        }

        try {
            // console.log('Adding item:', newItem);  
            const response = await fetch("http://localhost:3001/api/items", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });

            if (!response.ok) {
                // alert("Please log in to add item!")
                throw new Error(`Failed to add item: ${response.status}`);
            }

            const updatedItems = await fetch("http://localhost:3001/api/items")
                .then(response => response.json())
                .catch((error) => {
                    console.log("failed to get items", error);
                });

            setItems(updatedItems);
        } catch (error) {
            console.log("Error adding item", error);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-gray-100">
               <AddItemForm onAdd={handleAdd} />
            <h2 className="text-2xl font-bold mb-6">Item List</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items && items.map(item => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        onDelete={() => handleDelete(item.id)}  // 传递删除函数给 ItemCard 组件
                        onEdit={handleEdit}  
                    />
                ))}
            </div>
        </main>
    );
}
