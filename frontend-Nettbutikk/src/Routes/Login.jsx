

export default function Login() {
    return (
        <div>
            <h1>Login</h1>
            <div>
                <form>
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required></input>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required></input>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}