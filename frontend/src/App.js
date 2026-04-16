import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setMessage('Impossible de charger les utilisateurs.'));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    if (!name || !email) {
      setMessage('Merci de remplir tous les champs.');
      return;
    }

    const newUser = { name, email };
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      setMessage('Erreur lors de la création de l’utilisateur.');
      return;
    }

    const savedUser = await response.json();
    setUsers((current) => [...current, savedUser]);
    setName('');
    setEmail('');
    setMessage('Utilisateur ajouté avec succès.');
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Application MERN</h1>
        <p>Interface simple pour tester l’API Node/Express.</p>

        <section className="card">
          <h2>Ajouter un utilisateur</h2>
          <form onSubmit={handleSubmit} className="form">
            <label>
              Nom
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jean Dupont" />
            </label>
            <label>
              Email
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jean@example.com" />
            </label>
            <button type="submit">Envoyer</button>
          </form>
          {message && <div className="message">{message}</div>}
        </section>

        <section className="card">
          <h2>Utilisateurs</h2>
          {users.length === 0 ? (
            <p>Aucun utilisateur trouvé.</p>
          ) : (
            <ul>
              {users.map((user) => (
                <li key={user._id || user.email}>
                  {user.name} — {user.email}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
