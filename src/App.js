import { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    /* ======================================
        FETCH DATA
    ======================================= */
    const getTodos = async () => {
        // this function should only run once.
        // becasue of the new react 18 feature (Batch Updating)
        setLoading(true)
        try {
            const { data } = await axios.get(
                "https://jsonplaceholder.typicode.com/users"
            )
            setTodos(data)
            setLoading(false)
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    /* ======================================
        EFFECTS
    ======================================= */
    useEffect(() => {
        getTodos()
    }, [])

    return (
        <div style={{ padding: "20px" }}>
            <h1>Welcome to React 18</h1>

            {loading && <h3>Loading..</h3>}
            {error && <h3 style={{ color: "red" }}>{error}</h3>}

            {todos.length &&
                todos.map((item) => (
                    <div key={item.id}>
                        <h3>{item.name}</h3>
                    </div>
                ))}
        </div>
    )
}

export default App
