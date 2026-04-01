"use client";

export default function Widgets() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Widget 1: Adventure Pulse */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body bg-base-300">
          <h3 className="font-header text-lg flex items-center gap-2">
            <span className="text-success">●</span> Adventure Pulse
          </h3>
          <div className="stats stats-vertical shadow-inner bg-base-100 rounded-2xl p-4">
            <div className="stat">
              <div className="stat-title text-xs">Last Session</div>
              <div className="stat-value text-3xl">3 days ago</div>
            </div>
            <div className="stat">
              <div className="stat-title text-xs">Pending Invites</div>
              <div className="stat-value text-3xl text-secondary">2</div>
            </div>
          </div>
        </div>
      </div>

      {/* Widget 2: Wild Die Quick Roll */}
      <div className="card bg-base-100 shadow-xl overflow-hidden">
        <div className="card-body bg-base-300">
          <h3 className="font-header text-lg">Wild Die Quick Roll</h3>
          <button
            onClick={(e) => {
              const die = e.currentTarget.querySelector(
                ".wild-die",
              ) as HTMLDivElement;
              die.style.animation = "none";
              void die.offsetWidth;
              die.style.animation = "spin 800ms ease-out";
              const roll = Math.floor(Math.random() * 6) + 1;
              die.textContent = roll.toString();
            }}
            className="mx-auto w-28 h-28 rounded-3xl bg-linear-to-br from-primary to-secondary text-white text-6xl font-bold shadow-inner flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
          >
            <div className="wild-die text-7xl font-black transition-all">6</div>
          </button>
          <p className="text-center text-xs mt-4 text-base-content/60">
            Click for a quick roll
          </p>
        </div>
      </div>

      {/* Widget 3: Spotlight Teaser */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body bg-base-300">
          <h3 className="font-header text-lg">Content Spotlight</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            <div className="snap-center shrink-0 w-40 bg-base-100 rounded-2xl p-4 text-center">
              <div className="text-4xl mb-2">🗡️</div>
              <p className="font-medium text-sm">Edge of the Week</p>
              <p className="text-xs text-primary">Alertness</p>
            </div>
            <div className="snap-center shrink-0 w-40 bg-base-100 rounded-2xl p-4 text-center">
              <div className="text-4xl mb-2">🔥</div>
              <p className="font-medium text-sm">Power Spotlight</p>
              <p className="text-xs text-secondary">Blast</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
