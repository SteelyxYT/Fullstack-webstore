

export default function Register() {
    return (
        <div>
            <h1>Register</h1>
            <div>
                <form>
                    <label for="navn">navn:</label>
                    <input type="text" id="navn" name="navn" required></input>
                    <label for="adresse">adresse:</label>
                    <input type="text" id="adresse" name="adresse" required></input>
                    <label for="email">email:</label>
                    <input type="email" id="email" name="email" required></input>
                    <label for="password">passord:</label>
                    <input type="password" id="password" name="password" required></input>
                    <label for="password2">repeter passord:</label>
                    <input type="password" id="password2" name="password2" required></input>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}