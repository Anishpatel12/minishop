// src/components/admin/DashboardCard.jsx

import {
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

import {
  Link,
} from "react-router-dom";

export default function DashboardCard({
  title,
  value,
  color = "bg-blue-600",
  icon,
  trend,
  trendType = "up",
  loading = false,
  link,
}) {
  const CardContent = (
    <div
      className={`relative overflow-hidden p-8 rounded-3xl shadow-xl text-white ${color}
      transition duration-300 hover:scale-105 hover:shadow-2xl`}
    >
      {/* Background Circle */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />

      {/* ICON */}
      {icon && (
        <div className="text-5xl mb-5 opacity-90">
          {icon}
        </div>
      )}

      {/* TITLE */}
      <h2 className="text-xl font-semibold opacity-90">
        {title}
      </h2>

      {/* VALUE */}
      {loading ? (
        <div className="mt-5">
          <div className="h-10 w-24 bg-white/20 rounded animate-pulse"></div>
        </div>
      ) : (
        <h1 className="text-5xl font-bold mt-4">
          {value}
        </h1>
      )}

      {/* TREND */}
      {!loading &&
        trend !== undefined && (
          <div className="mt-5 flex items-center gap-2">
            {trendType ===
            "up" ? (
              <FaArrowUp />
            ) : (
              <FaArrowDown />
            )}

            <span className="font-semibold">
              {trend}%
            </span>

            <span className="text-sm opacity-80">
              from last month
            </span>
          </div>
        )}
    </div>
  );

  if (link) {
    return (
      <Link to={link}>
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}