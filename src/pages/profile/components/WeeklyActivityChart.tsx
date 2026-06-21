import { weeklyActivity } from '../data';

const CHART_HEIGHT = 220;
const MAX_VALUE = 5;
const BAR_WIDTH = 34;

const WeeklyActivityChart = () => {
  const maxValue = Math.max(
    MAX_VALUE,
    ...weeklyActivity.map((item) => item.value)
  );

  const yTicks = Array.from(
    { length: Math.ceil(maxValue) },
    (_, index) => index + 1
  );

  return (
    <div className="pt-6">
      <div className="flex justify-end mb-2">
        <button className="flex items-center gap-1.5 text-gray-400 text-xs bg-white border border-gray-100 rounded-full px-3 py-1.5 hover:bg-gray-50">
          Last week
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex">
        {/* Y Axis */}
        <div
          className="flex flex-col justify-between items-end pr-3 text-gray-400 text-xs relative"
          style={{ height: CHART_HEIGHT }}
        >
          {[...yTicks].reverse().map((tick) => (
            <span key={tick}>{tick}</span>
          ))}

          <span className="absolute -top-3 -right-1.5 text-gray-700">
            ▲
          </span>
        </div>

        {/* Chart */}
        <div
          className="flex-1 border-l border-b border-gray-700 px-4 relative"
          style={{ height: CHART_HEIGHT }}
        >
          <div className="grid grid-cols-7 gap-4 h-full items-end">
            {weeklyActivity.map(({ day, value }) => {
              const barHeight = (value / maxValue) * CHART_HEIGHT;

              return (
                <div
                  key={day}
                  className="flex flex-col items-center justify-end h-full"
                >
                  <div
                    className="rounded-t-md bg-gradient-to-b from-[#b366d9] to-[#cb7fe0]"
                    style={{
                      width: `${BAR_WIDTH}px`,
                      height: `${barHeight}px`,
                    }}
                  />
                </div>
              );
            })}
          </div>

          <span className="absolute -right-3 -bottom-2.5 text-gray-700">
            ▶
          </span>
        </div>
      </div>

      {/* X Axis Labels */}
      <div className="grid grid-cols-7 gap-4 pl-7 pt-3">
        {weeklyActivity.map(({ day }) => (
          <span
            key={day}
            className="text-center text-gray-500 text-sm"
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WeeklyActivityChart;