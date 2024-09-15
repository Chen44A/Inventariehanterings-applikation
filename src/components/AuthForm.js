"use client";//这个指令告诉 Next.js 这是一个客户端组件（Client Component）。它需要在浏览器中运行，因为它使用了客户端特定的功能（例如，useState 和 useEffect 等 React hooks）。

import { useState } from "react";//useState 是一个 React hook，用于在函数组件中管理组件的状态。useState 返回一个状态变量和一个更新这个状态的函数。

import { useRouter } from "next/navigation";//useRouter 是 Next.js 的一个 hook，用于在客户端获取路由对象。通过它，你可以访问路由的相关方法，例如 push 和 replace，用于在用户认证后导航到不同的页面。
import { useAuth } from "@/context/auth";


function AuthForm() {
    const router = useRouter();
    const auth = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [isLogin, setIsLogin] = useState(true)

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const url = isLogin ? "/api/auth/login" : "/api/auth/register"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                name
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("data: ",data);

            localStorage.setItem("@token", data.token);
            auth.setToken(data.token);
            router.push("/items") //将页面导航到http://localhost:3001/items
            return;
        }
        const errorData = await response.json();
        setError(errorData.message || "An unknown error occurred");
    }
    // console.log("auth: ",auth);

    return (
        <div className="auth-form">
            <div className="auth-form__container">
                <h2 className="auth-form__title">
                {isLogin ? "Login" : "Register"}
                </h2>
                <form className="auth-form__form" onSubmit={handleSubmit}>
                <div className="auth-form__group">
                    <label className="auth-form__label">Email</label>
                    <input
                    className="auth-form__input"
                    type="email" placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="auth-form__group">
                    <label className="auth-form__label">Password</label>
                    <input
                    className="auth-form__input"
                    type="password" placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {!isLogin && (
                    <div className="auth-form__group">
                    <label className="auth-form__label">Name</label>
                    <input
                        className="auth-form__input"
                        type="text" placeholder="User name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </div>
                )}
                {error && <p className="auth-form__error">{error}</p>}
                <button
                    className="auth-form__button auth-form__button--primary"
                    type="submit"
                >
                    {isLogin ? "Login" : "Register"}
                </button>
                <div className="auth-form__text">...or</div>
                <button
                    className="auth-form__button auth-form__button--secondary"
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? "Register" : "Login"}
                </button>
                </form>
            </div>
        </div>

    )
}

export default AuthForm;