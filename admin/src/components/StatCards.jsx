const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-[24px]! rounded-2xl shadow-sm border border-gray-100 flex items-center gap-[20px]!">
    <div className={`${color} p-[15px]! rounded-xl text-white`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm font-bold uppercase">{title}</p>
      <h3 className="text-2xl font-black text-gray-800">{value}</h3>
    </div>
  </div>
);