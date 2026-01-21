import useCounter from "./custom_hooks/useCounter";
import useRole from "./custom_hooks/useRole";

function App() {
  const { count, increment, decrement, reset } = useCounter(0);
  const { login, role, loading, error } = useRole();

  const handleLogin = () => {
    login("manager@fyers.in", "123456");
  };

  return (
    <>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>reset</button>

      <button onClick={handleLogin}>Login</button>

      {loading && <p>Logging in...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Role: {role}</h2>
    </>
  );
}

export default App;
