import logo from './logo.svg';
import './App.css';
import InputForm from './components/InputForm';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Patent Infringement Check App</h1>
      </header>
      <main>
        <InputForm />
      </main>
    </div>
  );
}

export default App;
