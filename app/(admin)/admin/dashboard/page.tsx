import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [users, products, orders, revenue] = await Promise.all([
    prisma.user.count(),
    prisma.product.count({ where: { isActive: true } }),
    prisma.order.count(),
    prisma.order.aggregate({ _sum: { totalAmount: true } }),
  ]);

  const stats = [
    { label: "Total users", value: users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active products", value: products, color: "text-green-600", bg: "bg-green-50" },
    { label: "Total orders", value: orders, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Revenue", value: `$${Number(revenue._sum.totalAmount || 0).toFixed(2)}`, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your store</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-100 rounded-xl p-5">
            <div className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
              <span className={`text-lg font-medium ${stat.color}`}>
                {typeof stat.value === "number" ? stat.value : ""}
              </span>
            </div>
            <p className={`text-2xl font-medium ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}