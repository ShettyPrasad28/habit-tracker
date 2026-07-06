import React, { useState, useMemo } from 'react';

export default function UltimateHabitTrackerApp() {

  const today = new Date();

  const defaultHabits = [
    'Wake Up 5 AM',
    'Exercise',
    'German',
    'Read',
    'Grind',
    'Skill Building',
    'Sleep before 10 PM'
  ];

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const [habits, setHabits] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      name: defaultHabits[i] || '',
      checks: {}
    }))
  );

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const HARD_CODED_USERNAME = 'admin';
  const HARD_CODED_PASSWORD = 'habit123';

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const currentDate = new Date();

  const isCurrentMonth =
    currentDate.getFullYear() === year &&
    currentDate.getMonth() === month;

  const todayDate = currentDate.getDate();

  const weekdays = useMemo(() => {
    return Array.from({ length: 31 }, (_, i) => {
      const day = i + 1;

      if (day > daysInMonth) return '';

      return new Date(year, month, day)
        .toLocaleDateString('en-US', { weekday: 'short' })
        .charAt(0);
    });
  }, [year, month, daysInMonth]);

  const toggleCheck = (habitIndex, day) => {
    setHabits(prev => {
      const updated = [...prev];

      updated[habitIndex].checks[day] =
        !updated[habitIndex].checks[day];

      return updated;
    });
  };

  const updateHabit = (index, value) => {
    setHabits(prev => {
      const updated = [...prev];
      updated[index].name = value;
      return updated;
    });
  };

  const getCompletion = (habit) => {
    const completed = Object.values(habit.checks)
      .filter(Boolean)
      .length;

    return completed / daysInMonth;
  };

  const overallCompletion = () => {
    const validHabits = habits.filter(h => h.name.trim() !== '');

    if (!validHabits.length) return 0;

    return (
      validHabits.reduce((acc, habit) => {
        return acc + getCompletion(habit);
      }, 0) / validHabits.length
    );
  };

  const bestHabit = () => {
    const validHabits = habits.filter(h => h.name.trim() !== '');

    if (!validHabits.length) return '-';

    return validHabits.reduce((best, current) => {
      return getCompletion(current) > getCompletion(best)
        ? current
        : best;
    }).name;
  };

  const weakestHabit = () => {
    const validHabits = habits.filter(h => h.name.trim() !== '');

    if (!validHabits.length) return '-';

    return validHabits.reduce((worst, current) => {
      return getCompletion(current) < getCompletion(worst)
        ? current
        : worst;
    }).name;
  };

  const months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      username === HARD_CODED_USERNAME &&
      password === HARD_CODED_PASSWORD
    ) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8">

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-3">
              Habit Tracker
            </h1>
            <p className="text-slate-400">
              Secure Login Access
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-3 rounded-xl bg-black border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl bg-black border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {loginError && (
              <div className="text-red-400 text-sm font-medium">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-bold py-3 rounded-xl"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-3 sm:p-6">
      <div className="max-w-[1800px] mx-auto">

        <div className="bg-slate-900 rounded-3xl shadow-2xl p-4 sm:p-6 mb-6 border border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <button
              onClick={() => setIsLoggedIn(false)}
              className="absolute top-6 right-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            >
              Logout
            </button>

            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-white">
                Ultimate Habit Tracker Dashboard
              </h1>
              <p className="text-slate-400 mt-2 text-sm sm:text-base">
                Professional monthly habit analytics system
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">
                  YEAR
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-white w-32"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">
                  MONTH
                </label>
                <select
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className="px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-white"
                >
                  {months.map((m, i) => (
                    <option key={m} value={i}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6">

          {[{
            title: 'OVERALL COMPLETION',
            value: `${(overallCompletion() * 100).toFixed(1)}%`,
            color: 'text-blue-400'
          }, {
            title: 'BEST HABIT',
            value: bestHabit(),
            color: 'text-emerald-400'
          }, {
            title: 'NEEDS IMPROVEMENT',
            value: weakestHabit(),
            color: 'text-red-400'
          }, {
            title: 'ACTIVE HABITS',
            value: habits.filter(h => h.name.trim() !== '').length,
            color: 'text-white'
          }].map((card, i) => (
            <div
              key={i}
              className="bg-slate-900 rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-800"
            >
              <div className="text-sm font-semibold text-slate-400 mb-2">
                {card.title}
              </div>
              <div className={`text-2xl sm:text-4xl font-bold ${card.color}`}>
                {card.value}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-auto">
          <table className="w-full border-collapse min-w-[1500px] text-sm sm:text-base">
            <thead>
              <tr className="bg-slate-950 text-white sticky top-0 z-20">
                <th className="p-3 border border-slate-800">#</th>
                <th className="p-3 border border-slate-800 min-w-[250px] text-left">
                  HABIT ROUTINES
                </th>

                {Array.from({ length: 31 }, (_, i) => (
                  <th
                    key={i}
                    className="p-2 border border-slate-800 text-center w-12"
                  >
                    {weekdays[i]}
                  </th>
                ))}

                <th className="p-3 border border-slate-800 min-w-[140px]">
                  Consistency %
                </th>

                <th className="p-3 border border-slate-800 min-w-[180px]">
                  Visual Trend
                </th>
              </tr>

              <tr className="bg-slate-900 text-white sticky top-[52px] z-10">
                <th className="p-2 border border-slate-800"></th>
                <th className="p-2 border border-slate-800"></th>

                {Array.from({ length: 31 }, (_, i) => (
                  <th
                    key={i}
                    className="p-2 border border-slate-800"
                  >
                    {i + 1 <= daysInMonth ? i + 1 : ''}
                  </th>
                ))}

                <th className="p-2 border border-slate-800"></th>
                <th className="p-2 border border-slate-800"></th>
              </tr>
            </thead>

            <tbody>
              {habits.map((habit, habitIndex) => {

                const completion = getCompletion(habit);

                let rowBg = 'bg-slate-900';

                if (habit.name.trim() !== '') {
                  if (completion >= 0.8) {
                    rowBg = 'bg-emerald-950/30';
                  } else if (completion >= 0.5) {
                    rowBg = 'bg-yellow-950/20';
                  } else {
                    rowBg = 'bg-red-950/20';
                  }
                }

                return (
                  <tr
                    key={habitIndex}
                    className={`${rowBg} hover:bg-slate-800 transition-colors`}
                  >
                    <td className="border border-slate-800 p-3 text-center font-semibold text-slate-400">
                      {habit.name ? habitIndex + 1 : ''}
                    </td>

                    <td className="border border-slate-800 p-2">
                      <input
                        value={habit.name}
                        onChange={(e) => updateHabit(habitIndex, e.target.value)}
                        placeholder="Enter habit..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>

                    {Array.from({ length: 31 }, (_, dayIndex) => {

                      const day = dayIndex + 1;

                      const disabled =
                        day > daysInMonth ||
                        (isCurrentMonth && day < todayDate);

                      return (
                        <td
                          key={dayIndex}
                          className={`border border-slate-800 p-2 text-center ${disabled ? 'bg-slate-800 opacity-50' : ''}`}
                        >
                          {!disabled && (
                            <input
                              type="checkbox"
                              checked={habit.checks[day] || false}
                              onChange={() => toggleCheck(habitIndex, day)}
                              className="w-5 h-5 accent-blue-500 cursor-pointer"
                            />
                          )}
                        </td>
                      );
                    })}

                    <td className="border border-slate-800 p-3 text-center font-bold text-white">
                      {habit.name
                        ? `${(completion * 100).toFixed(1)}%`
                        : ''}
                    </td>

                    <td className="border border-slate-800 p-3">
                      {habit.name && (
                        <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-300"
                            style={{
                              width: `${completion * 100}%`
                            }}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-900 rounded-3xl shadow-2xl p-4 sm:p-6 mt-6 border border-slate-800">

          <h2 className="text-2xl font-bold text-white mb-6">
            Habit Consistency Dashboard
          </h2>

          <div className="space-y-4">
            {habits
              .filter(h => h.name.trim() !== '')
              .map((habit, i) => {

                const completion = getCompletion(habit);

                return (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-white">
                        {habit.name}
                      </span>

                      <span className="font-bold text-white">
                        {(completion * 100).toFixed(1)}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-5 overflow-hidden">
                      <div
                        className="bg-blue-500 h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${completion * 100}%`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

