import React, { useState } from 'react';

const muscleGroups = [
  'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core'
];

// Simple custom Alert component
const Alert = ({ children, variant = 'info' }) => {
  const bgColor = variant === 'destructive' ? 'bg-red-100 border-red-400 text-red-700' : 'bg-blue-100 border-blue-400 text-blue-700';
  return (
    <div className={`border ${bgColor} px-4 py-3 rounded relative`} role="alert">
      <span className="block sm:inline">{children}</span>
    </div>
  );
};

const AuthForm = ({ isLogin, onSubmit, onToggle }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isLogin ? 'Log In' : 'Register'}
      </button>
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-sm text-indigo-600 hover:text-indigo-500"
      >
        {isLogin ? 'Need an account? Register' : 'Already have an account? Log In'}
      </button>
    </form>
  );
};

const YourFitnessBuddy = () => {
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [authError, setAuthError] = useState('');

  const handleAuth = (username, password) => {
    // This is a mock authentication. In a real app, you'd call an API here.
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
      setAuthError('');
    } else {
      setAuthError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedMuscle(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">MuscleWiki Clone</h1>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        )}
      </header>
      
      <main className="flex flex-1">
        {!isLoggedIn ? (
          <div className="w-full max-w-md mx-auto mt-10">
            <AuthForm
              isLogin={isLogin}
              onSubmit={handleAuth}
              onToggle={() => setIsLogin(!isLogin)}
            />
            {authError && (
              <Alert variant="destructive" className="mt-4">
                {authError}
              </Alert>
            )}
          </div>
        ) : (
          <>
            <aside className="w-1/4 bg-gray-100 p-4">
              <h2 className="text-xl font-semibold mb-4">Select Muscle Group</h2>
              <ul>
                {muscleGroups.map((muscle) => (
                  <li 
                    key={muscle} 
                    className={`cursor-pointer p-2 hover:bg-gray-200 ${selectedMuscle === muscle ? 'bg-gray-300' : ''}`}
                    onClick={() => setSelectedMuscle(muscle)}
                  >
                    {muscle}
                  </li>
                ))}
              </ul>
            </aside>
            
            <section className="w-3/4 p-4">
              {selectedMuscle ? (
                <div>
                  <h2 className="text-2xl font-bold mb-4">{selectedMuscle}</h2>
                  <div className="flex items-center justify-center bg-gray-200 h-64 mb-4">
                    <svg width="100" height="100" viewBox="0 0 100 100" className="text-gray-500">
                      <rect width="100" height="100" fill="currentColor" />
                      <text x="50" y="50" fontFamily="Arial" fontSize="14" fill="white" textAnchor="middle" dominantBaseline="middle">
                        Muscle Diagram
                      </text>
                    </svg>
                    <p className="ml-4">Muscle diagram would go here</p>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Exercises for {selectedMuscle}</h3>
                  <ul className="list-disc list-inside">
                    <li>Exercise 1</li>
                    <li>Exercise 2</li>
                    <li>Exercise 3</li>
                  </ul>
                </div>
              ) : (
                <p className="text-xl text-center mt-8">Select a muscle group to see details</p>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default YourFitnessBuddy;