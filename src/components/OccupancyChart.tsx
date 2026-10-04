import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from 'recharts';
import {
  Activity,
  Users,
  Clock,
  Flame,
  ArrowUpRight,
  TrendingDown,
  Layers,
  Sparkles,
  RefreshCw,
  PlusCircle,
  MinusCircle,
} from 'lucide-react';
import {
  HOURLY_OCCUPANCY_TODAY,
  HOURLY_OCCUPANCY_YESTERDAY,
  HOURLY_OCCUPANCY_WEEKEND,
} from '../data/mockData';
import { HourlyOccupancy } from '../types/gym';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  viewMode: 'total' | 'zones';
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, viewMode }) => {
  if (active && payload && payload.length) {
    const data: HourlyOccupancy = payload[0].payload;
    const isPeak = data.isPeak;
    const capacityPct = Math.round((data.occupancy / data.capacity) * 100);

    return (
      <div className="bg-neutral-950/95 border border-neutral-700/80 p-4 rounded-xl shadow-2xl backdrop-blur-md min-w-[210px] text-xs">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800">
          <div className="flex items-center gap-1.5 font-mono font-bold text-white text-sm">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{label}</span>
          </div>
          {isPeak ? (
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">
              Peak Hours
            </span>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Normal Load
            </span>
          )}
        </div>

        <div className="space-y-1.5 font-mono">
          <div className="flex items-center justify-between text-neutral-200">
            <span className="text-neutral-400">Total Athletes:</span>
            <span className="font-bold text-white text-sm tabular-nums">
              {data.occupancy}{' '}
              <span className="text-[11px] font-normal text-neutral-500">
                / {data.capacity} ({capacityPct}%)
              </span>
            </span>
          </div>

          <div className="pt-2 border-t border-neutral-850 space-y-1 text-[11px]">
            <div className="flex items-center justify-between text-neutral-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Strength & Platforms:
              </span>
              <span className="tabular-nums font-semibold text-white">
                {data.strengthZone}
              </span>
            </div>
            <div className="flex items-center justify-between text-neutral-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Cardio & VO2 Hub:
              </span>
              <span className="tabular-nums font-semibold text-white">
                {data.cardioZone}
              </span>
            </div>
            <div className="flex items-center justify-between text-neutral-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                Recovery & Sauna:
              </span>
              <span className="tabular-nums font-semibold text-white">
                {data.recoveryZone}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const OccupancyChart: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<'today' | 'yesterday' | 'weekend'>('today');
  const [viewMode, setViewMode] = useState<'total' | 'zones'>('total');
  const [chartData, setChartData] = useState<HourlyOccupancy[]>(HOURLY_OCCUPANCY_TODAY);
  const [liveDelta, setLiveDelta] = useState<number>(0);

  // Switch dataset based on selected day
  const handleDaySelect = (day: 'today' | 'yesterday' | 'weekend') => {
    setSelectedDay(day);
    setLiveDelta(0);
    if (day === 'today') setChartData(HOURLY_OCCUPANCY_TODAY);
    else if (day === 'yesterday') setChartData(HOURLY_OCCUPANCY_YESTERDAY);
    else setChartData(HOURLY_OCCUPANCY_WEEKEND);
  };

  // Simulate turnstile check-in / check-out in real-time
  const handleSimulateCheckIn = () => {
    setLiveDelta((prev) => prev + 1);
    setChartData((prev) =>
      prev.map((item) => {
        if (item.hour === '18:00') {
          return {
            ...item,
            occupancy: Math.min(item.capacity, item.occupancy + 1),
            strengthZone: item.strengthZone + 1,
          };
        }
        return item;
      })
    );
  };

  const handleSimulateCheckOut = () => {
    setLiveDelta((prev) => prev - 1);
    setChartData((prev) =>
      prev.map((item) => {
        if (item.hour === '18:00') {
          return {
            ...item,
            occupancy: Math.max(1, item.occupancy - 1),
            strengthZone: Math.max(1, item.strengthZone - 1),
          };
        }
        return item;
      })
    );
  };

  // Extract key metrics from current chart data
  const currentHourData =
    chartData.find((d) => d.hour === '18:00') || chartData[chartData.length - 1];
  const peakData = chartData.reduce(
    (max, d) => (d.occupancy > max.occupancy ? d : max),
    chartData[0]
  );
  const quietestData = chartData.reduce(
    (min, d) => (d.occupancy < min.occupancy ? d : min),
    chartData[0]
  );
  const capacityPercent = Math.round(
    (currentHourData.occupancy / currentHourData.capacity) * 100
  );

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl">
      {/* Top Header & Dynamic Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-neutral-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Live Turnstile Telemetry · Turnstile API Sync
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white font-heading">
            Floor Occupancy & Capacity Curve
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Visualize real-time member density across operating hours (05:00 – 23:00).
          </p>
        </div>

        {/* Filter buttons & View Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Day selection */}
          <div className="inline-flex items-center p-1 bg-neutral-950 border border-neutral-800 rounded-xl">
            <button
              type="button"
              onClick={() => handleDaySelect('today')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedDay === 'today'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Today (Live)
            </button>
            <button
              type="button"
              onClick={() => handleDaySelect('yesterday')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedDay === 'yesterday'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Yesterday
            </button>
            <button
              type="button"
              onClick={() => handleDaySelect('weekend')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedDay === 'weekend'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Weekend Avg
            </button>
          </div>

          {/* View mode toggle (Total vs Zones) */}
          <div className="inline-flex items-center p-1 bg-neutral-950 border border-neutral-800 rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode('total')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'total'
                  ? 'bg-neutral-800 text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Total Curve</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('zones')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                viewMode === 'zones'
                  ? 'bg-neutral-800 text-white font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>By Training Zone</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-time KPI Metric Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-neutral-800">
        {/* Live Load */}
        <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
          <div className="flex items-center justify-between text-neutral-400 mb-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold">
              Live Floor Load
            </span>
            <span className="text-[10px] font-mono text-emerald-400">18:00 Now</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums font-heading">
              {currentHourData.occupancy}
            </span>
            <span className="text-xs font-mono text-neutral-400">
              / {currentHourData.capacity} max
            </span>
          </div>
          <div className="w-full h-1.5 bg-neutral-900 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                capacityPercent > 80
                  ? 'bg-amber-400'
                  : capacityPercent > 60
                  ? 'bg-emerald-400'
                  : 'bg-blue-400'
              }`}
              style={{ width: `${Math.min(100, capacityPercent)}%` }}
            />
          </div>
        </div>

        {/* Peak Projection */}
        <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
          <div className="flex items-center justify-between text-neutral-400 mb-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold">
              Peak Volume
            </span>
            <Flame className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 tabular-nums font-heading">
              {peakData.occupancy}
            </span>
            <span className="text-xs font-mono text-neutral-400">
              @ {peakData.hour}
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-2 font-mono">
            Requires 4 floor marshals
          </p>
        </div>

        {/* Quiet Window */}
        <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
          <div className="flex items-center justify-between text-neutral-400 mb-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold">
              Quietest Window
            </span>
            <TrendingDown className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums font-heading">
              {quietestData.occupancy}
            </span>
            <span className="text-xs font-mono text-neutral-400">
              @ {quietestData.hour}
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 mt-2 font-mono">
            Ideal for rookie orientations
          </p>
        </div>

        {/* Interactive Turnstile Simulator */}
        <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between text-neutral-400 mb-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold">
              Turnstile Simulator
            </span>
            <span className="text-[10px] font-mono text-amber-400">Demo</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <button
              type="button"
              onClick={handleSimulateCheckIn}
              className="flex-1 py-1.5 px-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 rounded-lg text-xs font-bold font-mono flex items-center justify-center gap-1 active:scale-95 transition-all"
              title="Simulate Member Check-In"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Tap In</span>
            </button>
            <button
              type="button"
              onClick={handleSimulateCheckOut}
              className="flex-1 py-1.5 px-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 rounded-lg text-xs font-bold font-mono flex items-center justify-center gap-1 active:scale-95 transition-all"
              title="Simulate Member Check-Out"
            >
              <MinusCircle className="w-3.5 h-3.5" />
              <span>Tap Out</span>
            </button>
          </div>
          <p className="text-[10px] text-neutral-400 font-mono mt-1 text-center">
            {liveDelta !== 0
              ? `Live Adjustment: ${liveDelta > 0 ? `+${liveDelta}` : liveDelta} athletes`
              : 'NFC Turnstiles Active'}
          </p>
        </div>
      </div>

      {/* Main Recharts Area Chart */}
      <div className="pt-6">
        <div className="h-[300px] sm:h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 15, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                {/* Total Area Gradient */}
                <linearGradient id="occupancyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>

                {/* Strength Zone Gradient */}
                <linearGradient id="strengthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                </linearGradient>

                {/* Cardio Zone Gradient */}
                <linearGradient id="cardioGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                </linearGradient>

                {/* Recovery Zone Gradient */}
                <linearGradient id="recoveryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#262626"
                vertical={false}
              />

              <XAxis
                dataKey="hour"
                stroke="#737373"
                tick={{ fill: '#a3a3a3', fontSize: 11, fontFamily: 'monospace' }}
                tickLine={false}
                axisLine={{ stroke: '#262626' }}
              />

              <YAxis
                stroke="#737373"
                tick={{ fill: '#a3a3a3', fontSize: 11, fontFamily: 'monospace' }}
                tickLine={false}
                axisLine={false}
                domain={[0, 95]}
                ticks={[0, 20, 40, 60, 80]}
              />

              <Tooltip
                content={<CustomTooltip viewMode={viewMode} />}
                cursor={{ stroke: '#f59e0b', strokeWidth: 1, strokeDasharray: '4 4' }}
              />

              {/* Safe Floor Capacity Reference Line */}
              <ReferenceLine
                y={85}
                stroke="#ef4444"
                strokeDasharray="4 4"
                label={{
                  value: 'Max Capacity (85)',
                  position: 'top',
                  fill: '#ef4444',
                  fontSize: 10,
                  fontFamily: 'monospace',
                }}
              />

              {/* Optimal Floor Range Reference Line */}
              <ReferenceLine
                y={60}
                stroke="#f59e0b"
                strokeDasharray="2 2"
                strokeOpacity={0.4}
              />

              {/* Current Time Indicator Line */}
              {selectedDay === 'today' && (
                <ReferenceLine
                  x="18:00"
                  stroke="#fbbf24"
                  strokeWidth={2}
                  label={{
                    value: 'Current (18:00)',
                    position: 'insideTopRight',
                    fill: '#fbbf24',
                    fontSize: 10,
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                  }}
                />
              )}

              {viewMode === 'total' ? (
                <Area
                  type="monotone"
                  dataKey="occupancy"
                  name="Athletes On Floor"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#occupancyGradient)"
                  activeDot={{
                    r: 6,
                    fill: '#f59e0b',
                    stroke: '#0a0a0a',
                    strokeWidth: 2,
                  }}
                />
              ) : (
                <>
                  <Area
                    type="monotone"
                    dataKey="strengthZone"
                    name="Strength Zone"
                    stackId="1"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#strengthGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="cardioZone"
                    name="Cardio Zone"
                    stackId="1"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#cardioGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="recoveryZone"
                    name="Recovery Zone"
                    stackId="1"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#recoveryGradient)"
                  />
                </>
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend & Summary Notes */}
        <div className="mt-4 pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {viewMode === 'total' ? (
              <>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-amber-400 rounded-full" />
                  Total Live Occupancy
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 border-t border-dashed border-red-500" />
                  Maximum Floor Capacity (85)
                </span>
                <span className="flex items-center gap-1.5 text-neutral-500">
                  Peak Windows: 07:00–09:00 & 17:00–19:30
                </span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" />
                  Strength & Olympic Racks
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
                  Cardio & VO2 Hub
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-sky-400" />
                  Sauna & Hydro Plunge
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 text-neutral-400 font-mono text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Turnstile sensor confidence: 99.4%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
