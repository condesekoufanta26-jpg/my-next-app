import { prisma } from "@/lib/prisma";

export default async function AdminAnalyticsPage() {
  // Fetch data for analytics
  const [orders, products, users] = await Promise.all([
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
    }),
    prisma.product.findMany({
      include: {
        _count: {
          select: { orderItems: true },
        },
      },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    }),
  ]);

  // Calculate metrics
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  
  // Top products by sales
  const productSales = new Map<number, { product: typeof products[0]; quantity: number; revenue: number }>();
  orders.forEach(order => {
    order.items.forEach(item => {
      const existing = productSales.get(item.productId);
      if (existing) {
        existing.quantity += item.quantity;
        existing.revenue += Number(item.unitPrice) * item.quantity; // ✅ CORRIGÉ
      } else {
        const product = products.find(p => p.id === item.productId);
        if (product) {
          productSales.set(item.productId, {
            product,
            quantity: item.quantity,
            revenue: Number(item.unitPrice) * item.quantity, // ✅ CORRIGÉ
          });
        }
      }
    });
  });
  
  const topProducts = Array.from(productSales.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Monthly revenue (last 6 months)
  const monthlyRevenue = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    const monthOrders = orders.filter(o => {
      const orderDate = new Date(o.createdAt);
      return orderDate >= monthStart && orderDate <= monthEnd;
    });
    
    const revenue = monthOrders.reduce((sum, o) => sum + Number(o.totalAmount), 0);
    
    return {
      month: date.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }),
      revenue,
      orders: monthOrders.length,
    };
  });

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));

  // Order status distribution
  const statusDistribution = {
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    completed: orders.filter(o => o.status === "completed").length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Statistiques & Analytics</h1>
        <p className="text-gray-600 mt-1">Vue d'ensemble des performances de votre boutique</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            label: "Revenu total", 
            value: `$${totalRevenue.toFixed(2)}`, 
            change: "+12.5%",
            positive: true,
            color: "blue", 
            icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          },
          { 
            label: "Commandes", 
            value: orders.length, 
            change: "+8.2%",
            positive: true,
            color: "green", 
            icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
          },
          { 
            label: "Valeur moyenne", 
            value: `$${avgOrderValue.toFixed(2)}`, 
            change: "+3.1%",
            positive: true,
            color: "purple", 
            icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" 
          },
          { 
            label: "Utilisateurs", 
            value: users.length, 
            change: "+15.3%",
            positive: true,
            color: "amber", 
            icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat.color}-50 rounded-lg flex items-center justify-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 text-${stat.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <span className={`text-sm font-semibold ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className={`text-3xl font-bold mt-1 text-${stat.color}-600`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">Revenu mensuel</h2>
          <p className="text-sm text-gray-600 mt-1">Évolution sur les 6 derniers mois</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {monthlyRevenue.map((month, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600 w-20">{month.month}</span>
                <div className="flex-1 relative">
                  <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
                      style={{ width: `${maxRevenue > 0 ? (month.revenue / maxRevenue) * 100 : 0}%` }}
                    >
                      {month.revenue > 0 && (
                        <span className="text-xs font-semibold text-white">
                          ${month.revenue.toFixed(0)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-20 text-right">
                  {month.orders} cmd
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Produits les plus vendus</h2>
            <p className="text-sm text-gray-600 mt-1">Top 5 par revenu généré</p>
          </div>
          <div className="p-6">
            {topProducts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Aucune donnée disponible</p>
              </div>
            ) : (
              <div className="space-y-4">
                {topProducts.map((item, index) => (
                  <div key={item.product.id} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.product.imageUrl ? (
                        <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{item.product.name}</p>
                      <p className="text-sm text-gray-600">{item.quantity} vendus</p>
                    </div>
                    <span className="font-bold text-gray-900">${item.revenue.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Répartition des commandes</h2>
            <p className="text-sm text-gray-600 mt-1">Par statut actuel</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { label: "En attente", value: statusDistribution.pending, color: "yellow", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                { label: "En préparation", value: statusDistribution.processing, color: "blue", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
                { label: "Expédiées", value: statusDistribution.shipped, color: "purple", icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" },
                { label: "Livrées", value: statusDistribution.completed, color: "green", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
              ].map((status) => {
                const percentage = orders.length > 0 ? (status.value / orders.length) * 100 : 0;
                return (
                  <div key={status.label}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 bg-${status.color}-50 rounded-lg flex items-center justify-center`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 text-${status.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={status.icon} />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{status.label}</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{status.value}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-${status.color}-500 rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">Activité récente</h2>
          <p className="text-sm text-gray-600 mt-1">Dernières actions sur la plateforme</p>
        </div>
        <div className="divide-y divide-gray-200">
          {orders.slice(0, 5).map((order) => (
            <div key={order.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  Nouvelle commande <span className="font-semibold">{order.orderNumber}</span>
                </p>
                <p className="text-xs text-gray-600">
                  {order.items.length} article(s) · ${Number(order.totalAmount).toFixed(2)}
                </p>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(order.createdAt).toLocaleDateString('fr-FR', { 
                  day: 'numeric', 
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}