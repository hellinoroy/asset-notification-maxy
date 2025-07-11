export default function StatCard({ title, value }: any) {
  return (
    <div className="rounded-3xl shadow-lg p-10 bg-white text-center w-full mx-auto">
      <p className="text-gray-900 text-xl md:text-2xl xl:text-3xl mb-6 sm:mb-8">
        {title}
      </p>
      <p className="text-xl md:text-2xl xl:text-3xl font-bold text-gray-800">
        {value}
      </p>
    </div>
  );
};

